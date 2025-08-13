<template><div><h1 id="从零配置koa" tabindex="-1"><a class="header-anchor" href="#从零配置koa"><span>从零配置koa</span></a></h1>
<p><mark>原创</mark><mark>2025/8/13</mark><mark>fishbread</mark></p>
<hr>
<p>这是一篇如何从零开始配置koa文件结构的文档<br>
因为koa官方并没有提供koa项目的文件结构,所以本文档提供一个简单的koa项目建立步骤</p>
<h2 id="使用技术" tabindex="-1"><a class="header-anchor" href="#使用技术"><span>使用技术</span></a></h2>
<hr>
<ol>
<li><a href="https://www.koajs.net" target="_blank" rel="noopener noreferrer">koa.js</a></li>
</ol>
<h2 id="下载koa包" tabindex="-1"><a class="header-anchor" href="#下载koa包"><span>下载koa包</span></a></h2>
<p>在你要下载的路径新建文件夹然后打开至该路径的命令行执行以下命令</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#575279;--shiki-dark:#e0def4;--shiki-light-bg:#faf4ed;--shiki-dark-bg:#232136"><pre class="shiki shiki-themes rose-pine-dawn rose-pine-moon vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#D7827E;--shiki-dark:#EA9A97">npm</span><span style="--shiki-light:#EA9D34;--shiki-dark:#F6C177"> install</span><span style="--shiki-light:#EA9D34;--shiki-dark:#F6C177"> koa</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>你将会在新文件夹得到以下文件
<img src="/markdown_img/koa/koa.png" alt="koa配置图片" title="配置图片"></p>
<h2 id="构建koa文件结构" tabindex="-1"><a class="header-anchor" href="#构建koa文件结构"><span>构建koa文件结构</span></a></h2>
<ol>
<li>在该文件夹根目录新建<strong>main.js</strong>,并添加以下代码</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#575279;--shiki-dark:#e0def4;--shiki-light-bg:#faf4ed;--shiki-dark-bg:#232136"><pre class="shiki shiki-themes rose-pine-dawn rose-pine-moon vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#286983;--shiki-dark:#3E8FB0">const</span><span style="--shiki-light:#575279;--shiki-light-font-style:italic;--shiki-dark:#E0DEF4;--shiki-dark-font-style:italic"> app</span><span style="--shiki-light:#286983;--shiki-dark:#3E8FB0"> =</span><span style="--shiki-light:#D7827E;--shiki-dark:#EA9A97"> require</span><span style="--shiki-light:#575279;--shiki-dark:#E0DEF4">(</span><span style="--shiki-light:#EA9D34;--shiki-dark:#F6C177">'./src/app/index.js'</span><span style="--shiki-light:#575279;--shiki-dark:#E0DEF4">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#575279;--shiki-light-font-style:italic;--shiki-dark:#E0DEF4;--shiki-dark-font-style:italic">app</span><span style="--shiki-light:#286983;--shiki-dark:#3E8FB0">.</span><span style="--shiki-light:#D7827E;--shiki-dark:#EA9A97">listen</span><span style="--shiki-light:#575279;--shiki-dark:#E0DEF4">(</span><span style="--shiki-light:#D7827E;--shiki-dark:#EA9A97">3000</span><span style="--shiki-light:#797593;--shiki-dark:#908CAA">,</span><span style="--shiki-light:#797593;--shiki-dark:#908CAA"> ()</span><span style="--shiki-light:#286983;--shiki-dark:#3E8FB0"> =></span><span style="--shiki-light:#797593;--shiki-dark:#908CAA"> {</span></span>
<span class="line"><span style="--shiki-light:#575279;--shiki-light-font-style:italic;--shiki-dark:#E0DEF4;--shiki-dark-font-style:italic">    console</span><span style="--shiki-light:#286983;--shiki-dark:#3E8FB0">.</span><span style="--shiki-light:#D7827E;--shiki-dark:#EA9A97">log</span><span style="--shiki-light:#575279;--shiki-dark:#E0DEF4">(</span><span style="--shiki-light:#EA9D34;--shiki-dark:#F6C177">'Server is running on http://localhost:3000!'</span><span style="--shiki-light:#575279;--shiki-dark:#E0DEF4">)</span><span style="--shiki-light:#797593;--shiki-dark:#908CAA">;</span></span>
<span class="line"><span style="--shiki-light:#797593;--shiki-dark:#908CAA">}</span><span style="--shiki-light:#575279;--shiki-dark:#E0DEF4">)</span><span style="--shiki-light:#797593;--shiki-dark:#908CAA">;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>构建src文件夹作为koa的核心,按照下面图片中的结构构建,并在<strong>index.js</strong>复制代码
<img src="/markdown_img/koa/koa_1.png" alt="koa配置图片" title="配置图片"></li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#575279;--shiki-dark:#e0def4;--shiki-light-bg:#faf4ed;--shiki-dark-bg:#232136"><pre class="shiki shiki-themes rose-pine-dawn rose-pine-moon vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#286983;--shiki-dark:#3E8FB0">const</span><span style="--shiki-light:#575279;--shiki-light-font-style:italic;--shiki-dark:#E0DEF4;--shiki-dark-font-style:italic"> Koa</span><span style="--shiki-light:#286983;--shiki-dark:#3E8FB0"> =</span><span style="--shiki-light:#D7827E;--shiki-dark:#EA9A97"> require</span><span style="--shiki-light:#575279;--shiki-dark:#E0DEF4">(</span><span style="--shiki-light:#EA9D34;--shiki-dark:#F6C177">'koa'</span><span style="--shiki-light:#575279;--shiki-dark:#E0DEF4">)</span><span style="--shiki-light:#797593;--shiki-dark:#908CAA">;</span></span>
<span class="line"><span style="--shiki-light:#797593;--shiki-light-font-style:italic;--shiki-dark:#908CAA;--shiki-dark-font-style:italic">//</span><span style="--shiki-light:#9893A5;--shiki-light-font-style:italic;--shiki-dark:#6E6A86;--shiki-dark-font-style:italic">koa</span></span>
<span class="line"><span style="--shiki-light:#286983;--shiki-dark:#3E8FB0">const</span><span style="--shiki-light:#575279;--shiki-light-font-style:italic;--shiki-dark:#E0DEF4;--shiki-dark-font-style:italic"> app</span><span style="--shiki-light:#286983;--shiki-dark:#3E8FB0"> =</span><span style="--shiki-light:#286983;--shiki-dark:#3E8FB0"> new</span><span style="--shiki-light:#D7827E;--shiki-dark:#EA9A97"> Koa</span><span style="--shiki-light:#575279;--shiki-dark:#E0DEF4">()</span><span style="--shiki-light:#797593;--shiki-dark:#908CAA">;</span></span>
<span class="line"><span style="--shiki-light:#575279;--shiki-light-font-style:italic;--shiki-dark:#E0DEF4;--shiki-dark-font-style:italic">app</span><span style="--shiki-light:#286983;--shiki-dark:#3E8FB0">.</span><span style="--shiki-light:#D7827E;--shiki-dark:#EA9A97">on</span><span style="--shiki-light:#575279;--shiki-dark:#E0DEF4">(</span><span style="--shiki-light:#EA9D34;--shiki-dark:#F6C177">'error'</span><span style="--shiki-light:#797593;--shiki-dark:#908CAA">,</span><span style="--shiki-light:#907AA9;--shiki-light-font-style:italic;--shiki-dark:#C4A7E7;--shiki-dark-font-style:italic">err</span><span style="--shiki-light:#286983;--shiki-dark:#3E8FB0">=></span><span style="--shiki-light:#797593;--shiki-dark:#908CAA">{</span></span>
<span class="line"><span style="--shiki-light:#575279;--shiki-light-font-style:italic;--shiki-dark:#E0DEF4;--shiki-dark-font-style:italic">    console</span><span style="--shiki-light:#286983;--shiki-dark:#3E8FB0">.</span><span style="--shiki-light:#D7827E;--shiki-dark:#EA9A97">log</span><span style="--shiki-light:#575279;--shiki-dark:#E0DEF4">(</span><span style="--shiki-light:#575279;--shiki-light-font-style:italic;--shiki-dark:#E0DEF4;--shiki-dark-font-style:italic">err</span><span style="--shiki-light:#575279;--shiki-dark:#E0DEF4">)</span><span style="--shiki-light:#797593;--shiki-dark:#908CAA">;</span></span>
<span class="line"><span style="--shiki-light:#797593;--shiki-dark:#908CAA">}</span><span style="--shiki-light:#575279;--shiki-dark:#E0DEF4">)</span></span>
<span class="line"><span style="--shiki-light:#56949F;--shiki-dark:#9CCFD8">module</span><span style="--shiki-light:#286983;--shiki-dark:#3E8FB0">.</span><span style="--shiki-light:#56949F;--shiki-dark:#9CCFD8">exports</span><span style="--shiki-light:#286983;--shiki-dark:#3E8FB0"> =</span><span style="--shiki-light:#575279;--shiki-light-font-style:italic;--shiki-dark:#E0DEF4;--shiki-dark-font-style:italic"> app</span><span style="--shiki-light:#797593;--shiki-dark:#908CAA">;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>(可选)在package.json可加入命令,用于快速启动</li>
</ol>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#575279;--shiki-dark:#e0def4;--shiki-light-bg:#faf4ed;--shiki-dark-bg:#232136"><pre class="shiki shiki-themes rose-pine-dawn rose-pine-moon vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#EA9D34;--shiki-dark:#F6C177"> "scripts"</span><span style="--shiki-light:#575279;--shiki-dark:#E0DEF4">: </span><span style="--shiki-light:#797593;--shiki-dark:#908CAA">{</span></span>
<span class="line"><span style="--shiki-light:#797593;--shiki-dark:#908CAA">    "</span><span style="--shiki-light:#56949F;--shiki-dark:#9CCFD8">start</span><span style="--shiki-light:#797593;--shiki-dark:#908CAA">"</span><span style="--shiki-light:#797593;--shiki-dark:#908CAA">:</span><span style="--shiki-light:#EA9D34;--shiki-dark:#F6C177"> "node main.js"</span></span>
<span class="line"><span style="--shiki-light:#797593;--shiki-dark:#908CAA">  }</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="koa组件推荐" tabindex="-1"><a class="header-anchor" href="#koa组件推荐"><span>koa组件推荐</span></a></h2>
<ol>
<li><strong>@koa/router</strong>,koa路由组件,用于构建后端接口</li>
<li><strong>@koa/multer</strong>,用于构建koa的文件传输功能</li>
<li><strong>koa-body</strong>,用于处理一系列不同的请求方式</li>
<li><strong>koa-json</strong>,用于美化json的可读性</li>
<li><strong>koa-static</strong>,koa静态资源处理方案</li>
<li><strong>koa2-cors</strong>,处理同源政策</li>
<li><strong>axios</strong>,用于传递请求</li>
<li><strong>nodemailer</strong>,用于邮件发送</li>
<li><strong>mongoose</strong>,简化与mongoDB数据库的链接</li>
</ol>
<h2 id="结束" tabindex="-1"><a class="header-anchor" href="#结束"><span>结束</span></a></h2>
<hr>
<p>恭喜你,完成了最基础的koa后端建立,快去试试吧!😃 🎉</p>
</div></template>


