var ETF = require('./data-r20/50ETF.json');

var cash = 300000;// 元，初始现金数量
var base = 2000; // 元，每次交易价格
var stoke = 0; // 手，一手100股
var lastPrice = 0; //股票最后交易日价格
var fee = 0; // 总交易费用

var rate = 0.1; // 撤回比例
var startTime = '2013-03-15';
var endTime = "2019-04-30";

/**
 * 每月（20个交易日），定投
 */
var qtAvg = function () {
  for (let index = 0; index < ETF.length; index++) {
    const element = ETF[index];
    if (index % 20 == 0 && cash > 0) {
      let stokeNum = Math.round(base / (element.close * 100));
      let cost = stokeNum * element.close * 100;
      fee = 5 + fee;
      cash = cash - cost - 5;
      stoke = stoke + stokeNum;
      lastPrice = element.close;

      console.log(`*******交易日 ${element.time_key} -- ${index}*******`)
      console.log('今日交易价格：', element.close, ' -- ', '今日交易数量：', stokeNum)
      console.log('今日申股花费：', cost)
      console.log('今日交易费用：', 5)
      console.log('当前持仓股手：', stoke, ' -- ', '当前股票价值：', stoke * 100 * element.close)
      console.log('现金剩余：', cash)
      console.log('账户总价值：', cash + stoke * 100 * element.close)
      console.log(``)
    }

  }
}

qtAvg();

console.log('***********交易结束***********')
console.log('当前持仓股手：', stoke, ' || ', '当前股票价值：', stoke * 100 * lastPrice)
console.log('总交易费用：', fee)
console.log('现金剩余：', cash)
console.log('账户总价值：', cash + stoke * 100 * lastPrice)

