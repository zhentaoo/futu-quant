#!/usr/bin/python
# coding:utf-8
from futu import *
quote_ctx = OpenQuoteContext(host='127.0.0.1', port=11111)
print(quote_ctx.get_market_snapshot('HK.00700'))
quote_ctx.close()
