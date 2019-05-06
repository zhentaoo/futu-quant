var fs = require('fs');
var ETF50 = require('./data-back/50ETF.json')
var ETF300 = require('./data-back/300ETF.json')
var ETF500 = require('./data-back/500ETF.json')

/**
 * 数据处理，增加各个均线
 */
// 50ETF
for (let index = 0; index < ETF50.length; index++) {
  let etf = ETF50[index];
  etf.r5 = 0;
  etf.r10 = 0;
  etf.r20 = 0;
  etf.r30 = 0;
  etf.r40 = 0;
  if (index < 40) {
    continue;
  }

  for (let i = index - 5; i < index; i++) {
    etf.r5 = etf.r5 + ETF50[i].close;
  }

  for (let i = index - 10; i < index; i++) {
    etf.r10 = etf.r10 + ETF50[i].close;
  }

  for (let i = index - 20; i < index; i++) {
    etf.r20 = etf.r20 + ETF50[i].close;
  }

  for (let i = index - 30; i < index; i++) {
    etf.r30 = etf.r30 + ETF50[i].close;
  }

  for (let i = index - 40; i < index; i++) {
    etf.r40 = etf.r40 + ETF50[i].close;
  }

  etf.r5 = etf.r5.toFixed(3) - 0;
  etf.r10 = etf.r10.toFixed(3) - 0;
  etf.r20 = etf.r20.toFixed(3) - 0;
  etf.r30 = etf.r30.toFixed(3) - 0;
  etf.r40 = etf.r40.toFixed(3) - 0;
}

fs.writeFileSync('./data-r40/50ETF.json', JSON.stringify(ETF50, 2, 2))


// 300ETF
for (let index = 0; index < ETF300.length; index++) {
  let etf = ETF300[index];
  etf.r5 = 0;
  etf.r10 = 0;
  etf.r20 = 0;
  etf.r30 = 0;
  etf.r40 = 0;
  if (index < 40) {
    continue;
  }

  for (let i = index - 5; i < index; i++) {
    etf.r5 = etf.r5 + ETF300[i].close;
  }

  for (let i = index - 10; i < index; i++) {
    etf.r10 = etf.r10 + ETF300[i].close;
  }

  for (let i = index - 20; i < index; i++) {
    etf.r20 = etf.r20 + ETF300[i].close;
  }

  for (let i = index - 30; i < index; i++) {
    etf.r30 = etf.r30 + ETF300[i].close;
  }

  for (let i = index - 40; i < index; i++) {
    etf.r40 = etf.r40 + ETF300[i].close;
  }

  etf.r5 = etf.r5.toFixed(3) - 0;
  etf.r10 = etf.r10.toFixed(3) - 0;
  etf.r20 = etf.r20.toFixed(3) - 0;
  etf.r30 = etf.r30.toFixed(3) - 0;
  etf.r40 = etf.r40.toFixed(3) - 0;
}

fs.writeFileSync('./data-r40/300ETF.json', JSON.stringify(ETF300, 2, 2))


// 500ETF
for (let index = 0; index < ETF500.length; index++) {
  let etf = ETF500[index];
  etf.r5 = 0;
  etf.r10 = 0;
  etf.r20 = 0;
  etf.r30 = 0;
  etf.r40 = 0;
  if (index < 40) {
    continue;
  }

  for (let i = index - 5; i < index; i++) {
    etf.r5 = etf.r5 + ETF500[i].close;
  }

  for (let i = index - 10; i < index; i++) {
    etf.r10 = etf.r10 + ETF500[i].close;
  }

  for (let i = index - 20; i < index; i++) {
    etf.r20 = etf.r20 + ETF500[i].close;
  }

  for (let i = index - 30; i < index; i++) {
    etf.r30 = etf.r30 + ETF500[i].close;
  }

  for (let i = index - 40; i < index; i++) {
    etf.r40 = etf.r40 + ETF500[i].close;
  }

  etf.r5 = etf.r5.toFixed(3) - 0;
  etf.r10 = etf.r10.toFixed(3) - 0;
  etf.r20 = etf.r20.toFixed(3) - 0;
  etf.r30 = etf.r30.toFixed(3) - 0;
  etf.r40 = etf.r40.toFixed(3) - 0;
}

fs.writeFileSync('./data-r40/500ETF.json', JSON.stringify(ETF500, 2, 2))