var ETF = require('./data-r40/500ETF.json');

var baseAccount = 100000; //初始账户钱:10W
var baseShou = 10; //每次交易购买10手

var sumAccount = 100000; // 账户钱:10W
var sumStoke = 0; // 账户总手数，一手100股，初始为0（有多少股）
var sumValue = 0; // 账户总价值（账户股票对应价值）
var sumGainLossRate = 0; // 账户总盈亏
var sumFee = 0; // 总交易费用
var tradeType = 0; //交易类型： 1，2，3，4

var chicangRate = 0; //持仓盈亏比
var chicangStokeAvgCost = 0; //股票成本价

var lastPrice = 0; //股票最后交易日价格

var dingtouBase = 2000; // 定投金额(元)，每次购股花费
var dingtouCycle = 20; // 定投周期(日)，五个交易日为一周，20个交易日为一月
var sellCount = 0; //清仓次数
var isSell = false;

// var startTime = '2013-03-30';
// var startTime = '2014-03-30';
var startTime = '2015-03-30';
// var startTime = '2016-03-30';
// var startTime = '2017-03-30';
// var startTime = '2018-03-30';

// var endTime = "2019-03-30";
var endTime = "2018-03-30";

/**
 * 每月（20个交易日），定投
 */
var qtAvg = function () {
  for (let index = 0; index < ETF.length; index++) {
    const element = ETF[index];
    lastPrice = element.close;
    isSell = false;

    let stoke = 0;//当前交易日购股数量
    let oneUnitStoke = Math.round(dingtouBase / (lastPrice * 100)); //一个单位的交易数量

    let startChicangStokeAvgCost = chicangStokeAvgCost; // 交易前持仓成本价
    let startChicangRate = null;
    if (chicangStokeAvgCost == 0) {
      startChicangRate = 0;
    } else {
      startChicangRate = ((lastPrice - chicangStokeAvgCost) / chicangStokeAvgCost).toFixed(3) - 0; // 交易钱持仓盈亏比
    }

    // 日期优先
    if (element.time_key < startTime) {
      continue;
    }
    if (element.time_key > endTime) {
      break;
    }

    if (sumStoke == 0) {
      tradeType = "空仓状态，加购1个单位"
      stoke = oneUnitStoke;

      chicangRate = 0;
      chicangStokeAvgCost = lastPrice;
    } else {

      if (chicangRate > 0.1 && sumStoke > 0) {
        // stoke = -1 * oneUnitStoke;
        // stoke = -1 * sumStoke;

        // 持仓盈利：
        isSell = true;
        let cash = (sumStoke * 100 * lastPrice) * chicangRate;
        stoke = - Math.round(cash / (lastPrice * 100));

        sellCount++;
        tradeType = "盈利 > 10%，止盈";
      }
      else if (chicangRate < -0.2 && sumAccount > 0) {
        stoke = 2 * oneUnitStoke;
        tradeType = "亏损 > 20%，加购2个单位";
      }
      else if (chicangRate < -0.15 && sumAccount > 0) {
        stoke = 1 * oneUnitStoke;
        tradeType = "亏损 > 15%，加购1个单位";
      }
      else if (chicangRate < -0.1 && sumAccount > 0) {
        stoke = oneUnitStoke;
        tradeType = "亏损 > 10%，加购1个单位";
      }
      else if (index % dingtouCycle == 0 && sumAccount > 0) {
        stoke = oneUnitStoke;
        tradeType = "周期到了，加购1个单位";
      }

      // 不能卖的比持有的多
      if (stoke < 0 && Math.abs(stoke) > sumStoke) {
        stoke = -sumStoke;
      }

      // 清仓操作
      if (sumStoke + stoke == 0) {
        chicangStokeAvgCost = 0;
        chicangRate = 0;
      } else {
        // 止盈操作
        if (isSell) {
          chicangStokeAvgCost = lastPrice;
          chicangRate = 0;
          sellCount++;
        }
        // 一般操作
        else {
          chicangStokeAvgCost = (sumStoke * chicangStokeAvgCost + stoke * lastPrice) / (sumStoke + stoke);
          chicangStokeAvgCost = chicangStokeAvgCost.toFixed(4) - 0;

          chicangRate = (lastPrice - chicangStokeAvgCost) / chicangStokeAvgCost;
          chicangRate = chicangRate.toFixed(4) - 0;
        }
      }
    }

    // 未做交易
    if (stoke == 0 || sumAccount < 5500) {
      continue
    }

    // 如果卖出操作手续费提升
    if (isSell) {
      sumFee = sumFee + 5;
    }

    sumStoke = sumStoke + stoke;
    sumFee = sumFee + 5;
    sumAccount = sumAccount - (stoke * 100 * lastPrice) - 5;
    sumValue = sumAccount + sumStoke * 100 * lastPrice;
    sumGainLossRate = (((sumValue - baseAccount) / baseAccount) * 100).toFixed(3) + '%';

    var res = `
----${element.time_key} (${index})--${tradeType}--${oneUnitStoke} (手)----
  ***交易前概览***
      交易前成本价：${ startChicangStokeAvgCost}
      当日价格：${ lastPrice}
      交易前持仓总盈亏比: ${(startChicangRate * 100).toFixed(3) + '%'}
  ***当日交易***
      今日交易数：${stoke > 0 ? '+' + stoke : stoke}
      交易后成本价：${ chicangStokeAvgCost}
      交易后持仓总盈亏比:${(chicangRate * 100).toFixed(3) + '%'}
  ***当日结算***
      账户总持仓：${ sumStoke} 手(${sumStoke * 100 * chicangStokeAvgCost}元)
      账户总现金：${ sumAccount} 元
      账户总价值：${ sumValue} 元
      账户总盈亏：${ sumValue - baseAccount} 元
      账户总盈亏比例：${ sumGainLossRate}
      交易手续费: ${sumFee}
`
    console.log(res)
  }
}

qtAvg();

console.log(`-------${startTime}~${endTime}--定投+止盈 ${ETF[0].code}-------`)
console.log(`当日价格：${lastPrice}`)
console.log(`交易后成本价：${chicangStokeAvgCost}`);
console.log(`账户总持仓：${sumStoke}手 (${sumStoke * 100 * chicangStokeAvgCost}元)`);
console.log(`账户总现金：${sumAccount} 元`)
console.log(`账户总价值：${sumValue} 元`)
console.log(`账户总盈亏：${sumValue - baseAccount} 元`)
console.log(`账户总盈亏比例：${sumGainLossRate}`)
console.log('交易手续费：', sumFee)
console.log('清仓次数: ', sellCount)

console.log(``)