var ETF500 = require('./500ETF.json');

var cash = 100000;// 元，初始现金数量
var base = 5000; // 元，每次交易价格
var stoke = 0; // 手，一手100股
var lastPrice = 0; //股票最后交易日价格
var fee = 0; // 总交易费用

var rate = 0.1; // 撤回比例
var startTime = '2013-03-15';
var endTime = "2019-04-30";


var qtAvg = function () {
  for (let index = 0; index < ETF500.length; index++) {
    const element = ETF500[index];
    if (index % 20 == 0 && cash > 0) {
      let stokeNum = Math.round(10000 / (element.close * 100));
      let cost = stokeNum * element.close * 100;
      fee = 5 + fee;
      cash = cash - cost - 5;
      stoke = stoke + stokeNum;
      lastPrice = element.close;

      console.log(`*******交易${index}*******`)
      console.log('今日交易价格：', element.close, ' || ', '今日交易数量：', stokeNum)
      console.log('当前持仓股手：', stoke, ' || ', '当前股票价值：', stoke * 100 * element.close)
      console.log('交易费用：', 5)
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

