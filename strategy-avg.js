var ETF = require('./data-r40/500ETF.json');

var startCash = 1000000;
var cash = 1000000;// 账户总人民币，元，初始现金数量
var stoke = 0; // 账户总手数，一手100股，初始为0
var value = null; // 账户总价值

var maxValue = 0; // 账户最大总值
var maxDate = null;
var minValue = 999999999999; // 账户最小总值
var minDate = null;
var fee = 0; // 总交易费用

var base = 10000; // 定投金额(元)，每次购股花费
var cycle = 20; // 定投周期(日)，五个交易日为一周，20个交易日为一月

var lastPrice = 0; //股票最后交易日价格

var rate = 0.1; // 撤回比例
var startTime = '2018-03-15';
var endTime = "2019-04-30";

/**
 * 每月（20个交易日），定投
 */
var qtAvg = function () {
  for (let index = 0; index < ETF.length; index++) {
    const element = ETF[index];
    if (element.time_key < startTime) {
      continue;
    }

    if (index % cycle == 0 && cash > 0) {
      let stokeNum = Math.round(base / (element.close * 100));
      let cost = stokeNum * element.close * 100;
      fee = 5 + fee;
      cash = cash - cost - 5;
      stoke = stoke + stokeNum;
      lastPrice = element.close;
      value = cash + stoke * 100 * lastPrice;
      value = value.toFixed(3) - 0;
      if (maxValue < value) {
        maxValue = value;
        maxDate = element.time_key;
      }
      if (minValue > value) {
        minValue = value;
        minDate = element.time_key;
      }

      console.log(`*******交易日 ${element.time_key} -- ${index}*******`)
      console.log('今日交易价格：', element.close, ' -- ', '今日交易数量：', stokeNum)
      console.log('今日申股花费：', cost)
      console.log('今日交易费用：', 5)
      console.log('当前持仓股手：', stoke, ' -- ', '当前股票价值：', stoke * 100 * element.close)
      console.log('现金剩余：', cash)
      console.log('账户总价值：', value)
      console.log(``)
    }

  }
}

qtAvg();

console.log('***********交易结束***********')
console.log('当前股票价值：', stoke * 100 * lastPrice, '当前持仓股手：', stoke, '当前价格：', lastPrice)
console.log('当前购股成本：', startCash - cash, '购股价格：', (startCash - cash) / (stoke * 100))
console.log('总交易费用：', fee)
console.log('现金剩余：', cash)
console.log('账户总价值：', value)
console.log('账户总价值最大：', maxValue, maxDate)
console.log('账户总价值最小：', minValue, minDate)


