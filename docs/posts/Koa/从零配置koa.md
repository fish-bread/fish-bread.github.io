---
layout: Layout
---
# 从零配置koa

<mark>原创</mark><mark>2025/8/13</mark><mark>fishbread</mark>

---

这是一篇如何从零开始配置koa文件结构的文档  
因为koa官方并没有提供koa项目的文件结构,所以本文档提供一个简单的koa项目建立步骤

## 使用技术
---
1. [koa.js](https://www.koajs.net)

## 下载koa包
在你要下载的路径新建文件夹然后打开至该路径的命令行执行以下命令
```bash
npm install koa
```
你将会在新文件夹得到以下文件
![koa配置图片](/markdown_img/koa/koa.png '配置图片')
## 构建koa文件结构
1. 在该文件夹根目录新建**main.js**,并添加以下代码
```javascript
const app = require('./src/app/index.js')

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000!');
});
```
2. 构建src文件夹作为koa的核心,按照下面图片中的结构构建,并在**index.js**复制代码
![koa配置图片](/markdown_img/koa/koa_1.png '配置图片')
```javascript
const Koa = require('koa');
//koa
const app = new Koa();
app.on('error',err=>{
    console.log(err);
})
module.exports = app;
```
3. (可选)在package.json可加入命令,用于快速启动
```json
 "scripts": {
    "start": "node main.js"
  }
```
## koa组件推荐
1. **@koa/router**,koa路由组件,用于构建后端接口
2. **@koa/multer**,用于构建koa的文件传输功能
3. **koa-body**,用于处理一系列不同的请求方式
4. **koa-json**,用于美化json的可读性
5. **koa-static**,koa静态资源处理方案
6. **koa2-cors**,处理同源政策
7. **axios**,用于传递请求
8. **nodemailer**,用于邮件发送
9. **mongoose**,简化与mongoDB数据库的链接
## 结束
---
恭喜你,完成了最基础的koa后端建立,快去试试吧!😃 🎉