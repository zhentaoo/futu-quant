#!/usr/bin/python
# coding:utf-8
from futu import *
import pandas as pd

quote_ctx = OpenQuoteContext(host='127.0.0.1', port=11111)

ret, data, page_req_key = quote_ctx.request_history_kline('SH.510050', start='2005-09-30', end='2019-05-05', max_count=50) #请求开头50个数据
print(data)

file = open('50ETF.json', 'w')
file.write(str(data.to_json(orient='records')))
file.close()

quote_ctx.close()