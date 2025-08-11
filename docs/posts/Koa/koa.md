# koa文档
---
这是一个koa起始文件,请在左侧列表中选择文档阅读

## 什么是koa
---
Koa 是一个全新的 web 框架，由 Express 幕后的原班人马打造，致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过使用异步函数，Koa 帮你丢弃回调函数，并有力地增强错误处理能力。 Koa 并没有捆绑任何中间件，而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

## 安装koa
---
Koa 需要 node v12.17.0 或更高版本，以满足对 ES2015 和异步函数的支持。

```bash
$ npm install koa
```

```bash title="Hello koa"
const Koa = require('koa');
const app = new Koa();

// 响应
app.use(ctx => {
ctx.body = 'Hello Koa';
});

app.listen(3000);
```


## 入门koa
---
[Kick-Off-Koa](https://github.com/koajs/kick-off-koa) - 通过一系列自身指引的讲解介绍了 Koa。
[指南](https://www.koajs.net/guide) - 直接去看文档吧。