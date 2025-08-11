# puppeteer
---
这是一个puppeteer起始文件,请在左侧列表中选择文档阅读

## 什么是 Puppeteer？
---
Puppeteer 是一个 JavaScript 库，它提供了一个高级 API 来通过 开发工具协议 或 WebDriver 双向 控制 Chrome 或 Firefox。Puppeteer 默认在无头（无可见 UI）浏览器中运行，但可以配置为在可见（“有头”）浏览器中运行。

## Puppeteer特性
---
你可以在浏览器中手动执行的大多数作都可以使用 Puppeteer 完成！以下是一些帮助你入门的示例：

自动化表单提交、UI 测试、键盘输入等。

使用最新的 JavaScript 和浏览器功能创建自动化测试环境。

捕获站点的 时间线痕迹 以帮助诊断性能问题。

测试 Chrome 扩展程序。

生成页面的屏幕截图和 PDF。

抓取 SPA（单页应用）并生成预渲染内容（即 “SSR”（服务器端渲染））。
安装
要在项目中使用 Puppeteer，请运行：
```bash
$ npm i puppeteer
```

当你安装 Puppeteer 时，它会自动下载最新版本的 用于测试的 Chrome（~170MB macOS、~282MB Linux、~280MB Windows）和 二进制文件（从 Puppeteer v21.6.0 开始），即带有 Puppeteer 的 保证能用于。浏览器默认下载到文件夹（从 Puppeteer v19.0.0 开始）。请参阅 configuration 了解用于控制下载行为的配置选项和环境变量。chrome-headless-shell$HOME/.cache/puppeteer

¥当您安装 Puppeteer 时，它会自动下载最新版本的 Chrome 进行测试（~170MB macOS、~282MB Linux、~280MB Windows）和二进制文件（从 Puppeteer v21.6.0 开始），保证 与 Puppeteer 合作。浏览器将下载到文件夹 默认情况下（从 Puppeteer v19.0.0 开始）。请参阅配置，了解配置选项和环境变量以控制下载行为。chrome-headless-shell$HOME/.cache/puppeteer