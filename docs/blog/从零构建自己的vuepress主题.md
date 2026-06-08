---
layout: markdown
outline: deep
title: 从零构建自己的vuepress主题
category: 未分类
tags: ["vuepress2"]
writtenDate: 2025/08/21
updatedDate: 2025/08/21
description: 这是一篇关于如何构建vuepress自定义主题的文档
---
# 从零构建自己的vuepress主题

这是一篇关于如何构建vuepress自定义主题的文档  

# 使用技术
1. vue3
2. [vuepress@2.0.0](https://vuepress.vuejs.org/zh/guide/getting-started.html)
# 构建vuepress默认主题
1. 使用构建vuepress默认主题命令构建项目
```bash
npm init vuepress vuepress-starter
```
# 选择默认配置
1. 选择配置,你可以自己选择,也可以向我一样选择
![vuepress配置图片](/markdown_img/vue/vuepress.png '配置图片')
**(如果你和我一样的配置,那么你现在的文件结构一定的这样的)**
![vuepress配置图片](/markdown_img/vue/vuepress_1.png '配置图片')
# vuepress项目解释
1. **.github文件夹**,用于自动化上传构建github-pages页面,一般不需要动
2. **posts文件夹**,用于存放一切md文档,vuepress会自动识别该目录下的文件并渲染为html文件
3. **REMADE.md**,类似于一般vue项目的index.html,文档的'/'页面会自动以该页面为出口
4. **.vuepress**,vuepress项目的核心,我们将在这里构建主题
5. **client.js**,客户端增强文件,用于配置一些无法在服务器运行的方法
6. **config.js**,vuepress的配置文件,一切有关vuepress的配置都在这里引入
# 去除vuepress默认配置
首先将除了README.md的其他md文档全部删除,在将config.js文件按以下图片进行清理
![vuepress配置图片](/markdown_img/vue/vuepress_2.png '配置图片')
![vuepress配置图片](/markdown_img/vue/vuepress_3.png '配置图片')
然后将confit.js文件按以下图片进行清理
![vuepress配置图片](/markdown_img/vue/vuepress_4.png '配置图片')
接着删除.vuepress中的components文件夹和layout文件夹,新建一个theme文件夹并构建下面图片的结构
![vuepress配置图片](/markdown_img/vue/vuepress_5.png '配置图片')
# 解析文件用途
每个layout文件夹中的vue文件都是可以是一个模板,在client.js中导出模板即可在md文档里使用  
每个md文件就是一个页面,所以如过你要创建其他路由,就要在posts中创建一个md文件并指定模板
![vuepress配置图片](/markdown_img/vue/vuepress_6.png '配置图片')
即可切换md文档的模板,其中,在vue文件中**Content标签**是作为md文档的出口位置
1. **Home.vue**,用于构建'/'路由的界面
2. **Layout.vue**,用于posts文件夹中md文件的出口,文件无需指定layout: Layout
3. **404.vue**,用于构建不存在的路径时显示的页面,无需md文件支持

# 结束
至此,你的vuepress自定义主题已经成功迈出了一步,快去书写属于你的主题吧!😃 🎉
