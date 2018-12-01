# 服务器推送
本项目主要展示了服务器推送的 http stream 方式。

# 知识点介绍
* http stream 的实质是以长连接为基础，返回 stream，保证服务器可以持续推送。
* 方式如下：
  * ajax 发送 content-type = “text/event/stream” 的请求。
  * iframe src 请求
    * onload 事件可触发重新请求 
    
# 知识点扩展
SSE 是 http 流 ajax 实现方式的封装，封装之后的API更加友好，自带断线重连机制，代码更简洁。

```
var source = new EventSource(url);
source.onopen = () => { //do something }
source.onmessage = () => { //do something }
source.onerror = () => { //do something }
source.close()
```
