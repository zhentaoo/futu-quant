## 使用富途open api，python开启量化之路

### 堆官方文档 & 起步注意事项
- FutuOpenD客户端：https://www.futunn.com/openAPI
- Futu Open API官方文档：https://futunnopen.github.io/futu-api-doc/api/Quote_API.html
- Python官方文档：https://www.python.org/
- 下载FutuOpenD后，记得在xml文件配置自己的账户密码，第一次登录需要去futu官网同意免责协议，还会有一次手机验证码
- 调用过程：写PY脚本，调用futu提供的api（行情、交易），Api Request经过FutuOpenD转发至futu服务器，futu服务器返回数据给py

### 1. 如何获取股票（ETF）历史K线数据
- 代码如下，使用futu open api: request_history_kline可以获取你想要的个股K线数据
- futu api返回的数据结构是pandas，需要对应的py库做处理（我是转化成json，降低了学习成本）
- 返回的数据不包括 5、10、20日均线，需要自己计算
```python
from futu import *
import pandas as pd

quote_ctx = OpenQuoteContext(host='127.0.0.1', port=11111)

print(data)

ret, data2, page_req_key = quote_ctx.request_history_kline('SH.510050', start='2005-09-30', end='2019-05-05',max_count=1000,page_req_key=page_req_key) #请求开头50个数据
print(data2)
```

### 2. 数据处理，从pandas到json
- api返回的日线数据limit是1000，所以需要一些分页操作，page_req_key，是上一次查询返回的页码标识再下一次查询中带上就好，最后把几次结果合并一下（代码写的非常粗暴，for循环都没有，因为我是从文档中copy过来的）
```python
ret, data, page_req_key = quote_ctx.request_history_kline('SH.510050', start='2005-09-30', end='2019-05-05',max_count=1000)
print(data)

ret, data2, page_req_key = quote_ctx.request_history_kline('SH.510050', start='2005-09-30', end='2019-05-05',max_count=1000,page_req_key=page_req_key) 
print(data2)

ret, data3, page_req_key = quote_ctx.request_history_kline('SH.510050', start='2005-09-30', end='2019-05-05',max_count=1000,page_req_key=page_req_key) 
print(data3)

result = pd.concat([data, data2, data3])
```
- 拿到数据之后，转化为json格式，然后写入json文件
- 由于本人更熟悉javascript & json操作，所以之后的逻辑策略用js处理；对于熟悉python的同学这里应该更加得心应手。
```python
file = open('50ETF.json', 'w')
file.write(str(result.to_json(orient='records')))
file.close()
```

### 3. 策略-定投
配合代码&下图可以看出，从2013-05-01到2019-04-30，每20个交易日定投沪深300，10000元最终可盈利130.488%
<img src="./img/cl.jpg" width=400/>

### 4. 策略-均线定投（待续...）


<!-- ### 最新效果
今天第一次弄，稍微坎坷些，目前只取得了腾讯当前价格，未完待续，欢迎交流、咨询
![api](./img/run.jpg) -->
