## 使用富途open api，python开启量化之路
### 首先上一堆官方文档：futu，python（本人不熟悉py，所以贴了py文档）
- FutuOpenD客户端：https://www.futunn.com/openAPI
- futu官方文档：https://futunnopen.github.io/futu-api-doc/api/Quote_API.html
- Python官方文档：https://www.python.org/

### 接着介绍如何使用python+futu调用行情接口，一图言尽
![api](./img/API.png)

### 基本分三步：
1. 写PY脚本，调用futu提供的api（行情、交易）
2. Api Request经过FutuOpenD转发至futu服务器
3. futu服务器返回数据给py

### 注意事项：
1. 记得要在FutuOpenD，xml文件配置自己的账户密码
2. 记得把mac的2.X python升级下，最好用3.0的

### 最新效果
今天第一次弄，稍微坎坷些，目前只取得了腾讯当前价格，未完待续，欢迎交流、咨询
![api](./img/run.jpg)
