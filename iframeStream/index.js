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
  if (ctx.url === "/comet/iframe/stream") {
    ctx.status = 200;
    const delay = time =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    await delay(1000);
    ctx.res.write(
      '<script>parent.handleMessage({"a": "aaa", "b": 123})</script>'
    );
    await delay(2000);
    ctx.res.write(
      '<script>parent.handleMessage({"a": "aaa2", "b": 234})</script>'
    );
    await delay(2000);
    // ctx.status = 200;
    ctx.res.end(
      '<script>parent.handleMessage({"a": "aaa3", "b": 345})</script>'
    );
    return;
  }
});

app.listen(3000);
