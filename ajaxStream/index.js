const Koa = require("koa");
const fs = require("fs");
const path = require("path");
const app = new Koa();

app.use(async ctx => {
  if (ctx.url === "/") {
    let filePath = path.join(__dirname, "index.html");
    let tpl = fs.readFileSync(filePath, "binary");
    return (ctx.body = tpl);
  }
  if (ctx.url === "/comet/ajax/stream") {
    ctx.type = "text/event-stream; charset=utf-8";
    ctx.status = 200;
    await delay(1000);
    ctx.res.write('{"a": "aaa", "b": 123}');
    await delay(2000);
    ctx.res.write('{"a": "aaa2", "b": 234}');
    await delay(2000);
    ctx.res.end('{"a": "aaa3", "b": 345}');
    return;
  }
});

app.listen(3000);

// util
const delay = time =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
