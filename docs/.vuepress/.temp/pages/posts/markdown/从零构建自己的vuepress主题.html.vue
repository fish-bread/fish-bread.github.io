<template><div><h1 id="从零构建自己的vuepress主题" tabindex="-1"><a class="header-anchor" href="#从零构建自己的vuepress主题"><span>从零构建自己的vuepress主题</span></a></h1>
<p>这是一篇关于如何构建vuepress自定义主题的文档</p>
<h2 id="使用技术" tabindex="-1"><a class="header-anchor" href="#使用技术"><span>使用技术</span></a></h2>
<ol>
<li>vue3</li>
<li><a href="https://vuepress.vuejs.org/zh/guide/getting-started.html" target="_blank" rel="noopener noreferrer">vuepress@2.0.0</a></li>
</ol>
<h2 id="构建vuepress默认主题" tabindex="-1"><a class="header-anchor" href="#构建vuepress默认主题"><span>构建vuepress默认主题</span></a></h2>
<ol>
<li>使用构建vuepress默认主题命令构建项目</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#5c6a72;--shiki-dark:#d3c6aa;--shiki-light-bg:#fdf6e3;--shiki-dark-bg:#2d353b"><pre class="shiki shiki-themes everforest-light everforest-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#8DA101;--shiki-dark:#A7C080">npm</span><span style="--shiki-light:#DFA000;--shiki-dark:#DBBC7F"> init</span><span style="--shiki-light:#DFA000;--shiki-dark:#DBBC7F"> vuepress</span><span style="--shiki-light:#DFA000;--shiki-dark:#DBBC7F"> vuepress-starter</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="选择默认配置" tabindex="-1"><a class="header-anchor" href="#选择默认配置"><span>选择默认配置</span></a></h2>
<ol>
<li>选择配置,你可以自己选择,也可以向我一样选择
<img src="/markdown_img/vue/vuepress.png" alt="vuepress配置图片" title="配置图片">
<strong>(如果你和我一样的配置,那么你现在的文件结构一定的这样的)</strong>
<img src="/markdown_img/vue/vuepress_1.png" alt="vuepress配置图片" title="配置图片"></li>
</ol>
<h2 id="vuepress项目解释" tabindex="-1"><a class="header-anchor" href="#vuepress项目解释"><span>vuepress项目解释</span></a></h2>
<ol>
<li><strong>.github文件夹</strong>,用于自动化上传构建github-pages页面,一般不需要动</li>
<li><strong>posts文件夹</strong>,用于存放一切md文档,vuepress会自动识别该目录下的文件并渲染为html文件</li>
<li><strong>REMADE.md</strong>,类似于一般vue项目的index.html,文档的'/'页面会自动以该页面为出口</li>
<li><strong>.vuepress</strong>,vuepress项目的核心,我们将在这里构建主题</li>
<li><strong>client.js</strong>,客户端增强文件,用于配置一些无法在服务器运行的方法</li>
<li><strong>config.js</strong>,vuepress的配置文件,一切有关vuepress的配置都在这里引入</li>
</ol>
<h2 id="去除vuepress默认配置" tabindex="-1"><a class="header-anchor" href="#去除vuepress默认配置"><span>去除vuepress默认配置</span></a></h2>
<p>首先将除了README.md的其他md文档全部删除,在将config.js文件按以下图片进行清理
<img src="/markdown_img/vue/vuepress_2.png" alt="vuepress配置图片" title="配置图片">
<img src="/markdown_img/vue/vuepress_3.png" alt="vuepress配置图片" title="配置图片">
然后将confit.js文件按以下图片进行清理
<img src="/markdown_img/vue/vuepress_4.png" alt="vuepress配置图片" title="配置图片">
接着删除.vuepress中的components文件夹和layout文件夹,新建一个theme文件夹并构建下面图片的结构
<img src="/markdown_img/vue/vuepress_5.png" alt="vuepress配置图片" title="配置图片"></p>
<h2 id="解析文件用途" tabindex="-1"><a class="header-anchor" href="#解析文件用途"><span>解析文件用途</span></a></h2>
<p>每个layout文件夹中的vue文件都是可以是一个模板,在client.js中导出模板即可在md文档里使用<br>
每个md文件就是一个页面,所以如过你要创建其他路由,就要在posts中创建一个md文件并指定模板
<img src="/markdown_img/vue/vuepress_6.png" alt="vuepress配置图片" title="配置图片">
即可切换md文档的模板,其中,在vue文件中<strong>Content标签</strong>是作为md文档的出口位置</p>
<ol>
<li><strong>Home.vue</strong>,用于构建'/'路由的界面</li>
<li><strong>Layout.vue</strong>,用于posts文件夹中md文件的出口,文件无需指定layout: Layout</li>
<li><strong>404.vue</strong>,用于构建不存在的路径时显示的页面,无需md文件支持</li>
</ol>
<h2 id="结束" tabindex="-1"><a class="header-anchor" href="#结束"><span>结束</span></a></h2>
<p>至此,你的vuepress自定义主题已经成功迈出了一步,快去书写属于你的主题吧!😃 🎉</p>
</div></template>


