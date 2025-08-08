<template><div><h1 id="vuepress-theme-fishbread-v1-0-0-alpha" tabindex="-1"><a class="header-anchor" href="#vuepress-theme-fishbread-v1-0-0-alpha"><span>vuepress-theme-fishbread@v1.0.0-alpha</span></a></h1>
<p>这是我个人基于vuepress设计的自定义博客主题.但是很粗糙,绝大多数地方都没有组件化或者代码杂乱,所以仅供个人使用.</p>
<p>本人菜鸡一枚,如果你能改写并优化我的代码,再上一层楼的话,本人诚邀你与我共同改进代码</p>
<h2 id="全局样式设置备忘" tabindex="-1"><a class="header-anchor" href="#全局样式设置备忘"><span>全局样式设置备忘:</span></a></h2>
<p>主题色: pink
明色: while
暗色: #7a86bd
滚动条颜色: #464646
文字链接颜色: #ff758d
vue颜色: #42b983</p>
<p>:style=&quot;{
'--svg-box-icon-path-hover': theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
'--svg-box-hover':theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
'--svg-box-path': theme_change === 'light' ? themes.light.color : themes.dark.color,
color: theme_change === 'light' ? themes.light.color : themes.dark.color,
}&quot;控制图标及文字 然后为该盒子的子盒子添加svg-box类</p>
<p>:style=&quot;{
'--font-box-back_color': theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
'--font-box-color': theme_change === 'light' ? themes.light.color : themes.dark.color,
}&quot;控制文字盒子,然后为该盒子的子盒子添加font-box类,hover盒子添加hover-color类</p>
<p>showPrompt('您成功设置了主题', 'success')全局提示框</p>
<p>index.css设置了代码框样式</p>
<p>search-box设置了搜索组件样式</p>
<p>github_client.css设置了markdown样式</p>
</div></template>


