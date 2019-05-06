#!/usr/bin/python
# coding:utf-8
from futu import *
import pandas as pd

quote_ctx = OpenQuoteContext(host='127.0.0.1', port=11111)

# 50ETF
# ret, data, page_req_key = quote_ctx.request_history_kline('SH.510050', start='2005-09-30', end='2019-05-05',max_count=1000) #请求开头50个数据
print(data)

ret, data2, page_req_key = quote_ctx.request_history_kline('SH.510050', start='2005-09-30', end='2019-05-05',max_count=1000,page_req_key=page_req_key) #请求开头50个数据
print(data2)

ret, data3, page_req_key = quote_ctx.request_history_kline('SH.510050', start='2005-09-30', end='2019-05-05',max_count=1000,page_req_key=page_req_key) #请求开头50个数据
print(data3)

result = pd.concat([data, data2, data3])

file = open('50ETF.json', 'w')
file.write(str(result.to_json(orient='records')))
file.close()

# 300ETF
ret, data, page_req_key = quote_ctx.request_history_kline('SH.510300', start='2005-09-30', end='2019-05-05',max_count=1000) #请求开头50个数据
print(data)

ret, data2, page_req_key = quote_ctx.request_history_kline('SH.510300', start='2005-09-30', end='2019-05-05',max_count=1000,page_req_key=page_req_key) #请求开头50个数据
print(data2)

result = pd.concat([data, data2])

file = open('300ETF.json', 'w')
file.write(str(result.to_json(orient='records')))
file.close()

# 500ETF
ret, data, page_req_key = quote_ctx.request_history_kline('SH.510500', start='2005-09-30', end='2019-05-05',max_count=1000) #请求开头50个数据
print(data)

ret, data2, page_req_key = quote_ctx.request_history_kline('SH.510500', start='2005-09-30', end='2019-05-05',max_count=1000,page_req_key=page_req_key) #请求开头50个数据
print(data2)

result = pd.concat([data, data2])

file = open('500ETF.json', 'w')
file.write(str(result.to_json(orient='records')))
file.close()


quote_ctx.close()