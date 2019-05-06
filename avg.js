var ETF = require('./data-r40/500ETF.json');

var sumCost = 0;// 购股总花费(花了多少钱)
var sumStoke = 0; // 账户总手数，一手100股，初始为0（有多少股）
var sumValue = 0; // 账户总价值（账户股票对应价值）
var sumFee = 0; // 总交易费用
var sumGainLossRate = 0;
var lastPrice = 0; //股票最后交易日价格

var dingtouBase = 10000; // 定投金额(元)，每次购股花费
var dingtouCycle = 20; // 定投周期(日)，五个交易日为一周，20个交易日为一月

var rate = 0.1; // 撤回比例
var startTime = '2013-05-01';
var endTime = "2019-04-30";

/**
 * 每月（20个交易日），定投
 */
var qtAvg = function () {
  for (let index = 0; index < ETF.length; index++) {
    const element = ETF[index];
    lastPrice = element.close;

    if (element.time_key < startTime) {
      continue;
    }

    if (index % dingtouCycle == 0) {
      let stokeNum = Math.round(dingtouBase / (lastPrice * 100));
      let cost = stokeNum * lastPrice * 100 + 5;

      sumCost = sumCost + cost;
      sumStoke = sumStoke + stokeNum;

      sumValue = sumStoke * 100 * lastPrice;
      sumFee = sumFee + 5;

      sumGainLossRate = (((sumValue - sumCost) / sumCost) * 100).toFixed(3) + '%';

      console.log(`*******交易日 ${element.time_key} -- ${index}*******`)

      console.log('最新价格：', lastPrice)
      console.log('今日交易数量：', stokeNum, `(${stokeNum * 100})`)
      console.log('今日申股花费：', cost)
      console.log('今日交易费用：', 5)

      console.log('账户总持仓：', sumStoke, `(${sumStoke * 100})`)
      console.log('账户总价值：', sumValue)
      console.log('账户总花费：', sumCost)
      console.log('账户总盈亏：', sumGainLossRate)
      console.log(``)
    }

  }
}

qtAvg();

console.log('***********最终交易结束***********')
console.log('账户总持仓：', sumStoke, `(${sumStoke * 100})`)
console.log('账户总价值：', sumValue)
console.log('账户总花费：', sumCost)
console.log('账户总盈亏：', sumGainLossRate)
