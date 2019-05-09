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

var dingtouBase = 5000; // 定投金额(元)，每次购股花费
var dingtouCycle = 20; // 定投周期(日)，五个交易日为一周，20个交易日为一月

var startTime = '2013-05-01';
// var startTime = '2016-12-01';
// var startTime = '2018-12-01';
var endTime = "2019-03-30";

/**
 * 每月（20个交易日），定投
 */
var qtAvg = function () {
  for (let index = 0; index < ETF.length; index++) {
    const element = ETF[index];
    lastPrice = element.close;

    let stoke = 0;//当前交易日购股数量
    let oneUnitStoke = Math.round(dingtouBase / (lastPrice * 100)); //一个单位的交易数量

    let startChicangStokeAvgCost = chicangStokeAvgCost; // 交易前持仓成本价
    let startChicangRate = chicangRate; // 交易钱持仓盈亏比

    // 日期优先
    if (element.time_key < startTime) {
      continue;
    }

    if (sumStoke == 0) {
      tradeType = "空仓状态，加购1个单位"
      stoke = oneUnitStoke;

      chicangRate = 0;
      chicangStokeAvgCost = lastPrice;
    } else {
      // 盈利 > 20%，清仓
      if (chicangRate > 0.2 && sumStoke > 0) {
        // stoke = -sumStoke;
        // tradeType = "盈利 > 20%，清仓";

        stoke = -2 * oneUnitStoke;
        tradeType = "盈利 > 20%，卖出2个单位";
      }
      // 盈利 > 10%, 清半仓
      else if (chicangRate > 0.1 && sumStoke > 0) {
        stoke = -1 * oneUnitStoke;
        tradeType = "盈利 > 10%，卖出1个单位";
      }
      // 亏损 > 20%，购买2个单位
      else if (chicangRate < -0.2 && sumAccount > 0) {
        stoke = 2 * oneUnitStoke;
        tradeType = "亏损 > 20%，加购2个单位";
      }
      // 亏损 > 10%，购买1个单位
      else if (chicangRate < -0.1 && sumAccount > 0) {
        stoke = oneUnitStoke;
        tradeType = "亏损 > 10%，加购1个单位";
      }
      // 投资周期到了，购买1个单位
      else if (index % dingtouCycle == 0 && sumAccount > 0) {
        stoke = oneUnitStoke;
        tradeType = "周期到了，加购1个单位";
      }

      // 不能卖的比持有的多
      if(stoke < 0 && Math.abs(stoke) > sumStoke) {
        stoke = -sumStoke;
      }

      if (sumStoke + stoke == 0) {
        chicangStokeAvgCost = 0;
        chicangRate = 0;
      } else {
        chicangStokeAvgCost = (sumStoke * chicangStokeAvgCost + stoke * lastPrice) / (sumStoke + stoke);
        chicangStokeAvgCost = chicangStokeAvgCost.toFixed(4) - 0;

        chicangRate = (lastPrice - chicangStokeAvgCost) / chicangStokeAvgCost;
      }
    }

    // 未做交易
    if (stoke == 0 || sumStoke + stoke < 0 || sumAccount < 5500) {
      continue
    }

    sumStoke = sumStoke + stoke;
    sumFee = sumFee + 5;
    sumAccount = sumAccount - (stoke * 100 * lastPrice) - 5;
    sumValue = sumAccount + sumStoke * 100 * lastPrice;
    sumGainLossRate = (((sumValue - baseAccount) / baseAccount) * 100).toFixed(3) + '%';

    console.log(`-------${element.time_key}-(${index})--${tradeType}--${oneUnitStoke}-------`)
    console.log(`交易前成本价：${startChicangStokeAvgCost}`)
    console.log('交易前持仓总盈亏比', startChicangRate)
    console.log(`最新价格：${lastPrice}`)
    console.log('今日交易数：', stoke > 0 ? `+${stoke}` : stoke)
    console.log(`交易后成本价：${chicangStokeAvgCost}`);
    console.log('交易后持仓总盈亏比', chicangRate)
    console.log('***当日结算***');
    console.log(`账户总持仓：${sumStoke}手 (${sumStoke * 100 * chicangStokeAvgCost}元)`);
    console.log(`账户总现金：${sumAccount} 元`)
    console.log(`账户总价值：${sumValue} 元`)
    console.log(`账户总盈亏：${sumValue - baseAccount} 元`)
    console.log(`账户总盈亏比例：${sumGainLossRate}`)
    console.log('交易手续费：', sumFee)
    console.log(``)
  }
}

qtAvg();
