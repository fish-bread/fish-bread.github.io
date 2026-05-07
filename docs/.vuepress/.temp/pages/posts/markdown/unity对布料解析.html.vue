<template><div><h1 id="unity对布料解析" tabindex="-1"><a class="header-anchor" href="#unity对布料解析"><span>unity对布料解析</span></a></h1>
<h2 id="unity插件" tabindex="-1"><a class="header-anchor" href="#unity插件"><span>unity插件</span></a></h2>
<ol>
<li>Magica Cloth 2插件</li>
</ol>
<h2 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤"><span>步骤</span></a></h2>
<ol>
<li>对于要导入的模型,先进行常规处理模型操作,如果是一个整体,应当在blender中全选后按p进行材质分解</li>
<li>导入模型到unity</li>
<li>选中要添加的衣服模型,添加magicaCloth组件
<ol>
<li>在这里添加你要添加的衣服模型
<img src="/markdown_img/unity/Pasted_image_20260507204836.png" alt="Pasted image 20260507204836.png"></li>
<li>在这里调整模拟量
<img src="/markdown_img/unity/Pasted_image_20260507204909.png" alt="Pasted image 20260507204909.png"></li>
<li>使用这个按钮进行编辑顶点
<img src="/markdown_img/unity/Pasted_image_20260507205046.png" alt="Pasted image 20260507205046.png"></li>
<li>在这个preset中选择预设模拟的物体是什么,或者你自己设置
<img src="/markdown_img/unity/Pasted_image_20260507205403.png" alt="Pasted image 20260507205403.png"></li>
</ol>
</li>
<li>如需添加碰撞,选中离你的衣服最近的骨骼==(必须是控制人物动作的骨骼)==为其添加magicacollider组件,然后设置其大小,功能类似unitycollider,但这里必须使用magicacollider</li>
<li>将刚刚添加过magicacollider的骨骼在中的collider List中添加即可
<img src="/markdown_img/unity/Pasted_image_20260507205825.png" alt="Pasted image 20260507205825.png"></li>
<li>运行游戏查看结果</li>
</ol>
</div></template>


