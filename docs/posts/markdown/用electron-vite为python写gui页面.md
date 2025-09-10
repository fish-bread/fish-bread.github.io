---
layout: Layout
title: 用electron-vite为python写gui页面
data: 2025/09/08
description: 这是一篇关于如何借助electron-vite-vue来为python写gui的文档,尚未完结
---

# 用electron代替pythongui
这是一篇关于如何借助electron-vite-vue来为python写gui的文档,尚未完结
# 为什么使用electron
我觉得pythongui的样式不够自定义,而且本身我也对vue和electron比较了解,并且可以结合puppeteer实现浏览器爬虫
# 为什么使用python-shell
> 在electron中运行python脚本有多种方式,构建python后端,直接在node子进程运行python文件,通过python-shell运行文件等等  
> 由于我这里想使用python执行自动化操作,所以使用在node通过python-shell运行文件这种方法
# 使用技术
1. [electron-vite](https://github.com/alex8088/electron-vite)
2. [pyautogui](https://github.com/asweigart/pyautogui)
3. [python-shell](https://github.com/extrabacon/python-shell)
4. [naiveui](https://www.naiveui.com/zh-CN/os-theme)(非必要)
5. [puppeteer](https://pptr.nodejs.cn/)(非必要)
# electron-vite
适用node的v22.18.0版本  
感谢[alex8088](https://github.com/alex8088)的electron-vite库,让我们可以在electron的渲染层可以编写vue文件,这极大的方便了渲染层的编写
## 安装electron
1. 运行以下命令或克隆该库[electron-vite模板](https://github.com/alex8088/electron-vite-boilerplate)
```bash
npm create @quick-start/electron@latest
```
2. 查询文档以快速适应electron-vite,[electron-vite文档](https://cn.electron-vite.org/)
# pyautogui
适用python的v3.7以上版本
## 安装pyautogui
1. 运行以下命令
```bash
pip install pyautogui
pip install pillow
pip install opencv-python
```
2. 查阅文档以了解pyautogui,[pyautogui文档](https://pyautogui.readthedocs.io/en/latest/)
# python-shell
## 安装python-shell
1. 运行以下命令
```bash
npm install python-shell
```
2. 查阅文档以了解python-shell,[python-shell文档](https://github.com/extrabacon/python-shell)
# 开始
## 了解如何通信
electron的主进程和渲染进程通过中间脚本进行通信,python与electron主进程通过python-shell进行通信  
所以我们可以用ipcRenderer.send和ipcMain.on在node主进程去发起python-shell的进程.然后在用pyshell.send向python-shell传输通信,使用pyshell.on('message')接收python进程的数据,用webContents.send和ipcRenderer.on向渲染进程持续发送python数据
## 具体实现的问题