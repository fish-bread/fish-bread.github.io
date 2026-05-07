<template><div><h1 id="关于模之屋的mmd模型导入unity" tabindex="-1"><a class="header-anchor" href="#关于模之屋的mmd模型导入unity"><span>关于模之屋的mmd模型导入unity</span></a></h1>
<h2 id="blender插件" tabindex="-1"><a class="header-anchor" href="#blender插件"><span>blender插件</span></a></h2>
<ol>
<li>mmd-tool(用于导入模型)</li>
<li>BBBbulldozer(用于处理贴图)</li>
<li>blender-unity-fbx(用于导出模型)</li>
</ol>
<h2 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤"><span>步骤</span></a></h2>
<ol>
<li>使用mmd-tool导入模型</li>
<li>处理模型,删去刚体骨骼和
<img src="/markdown_img/unity/Pasted_image_20260506150700.png" alt="删除对象的图片" title="配置图片">
<img src="/markdown_img/unity/Pasted_image_20260506150829.png" alt="删除对象的图片"></li>
<li>用BBBbulldozer处理模型提取原理化后的模型</li>
<li>(可选)如果需要在unity中布料解析,是一个整体的模型,应当在blender中全选后按p进行材质分解</li>
<li>在blender中全选模型,使用 blender-unity-fbx导出模型,选择仅选中物体和带叶骨</li>
<li>将原本的贴图复制一份到unity,将模型放入与贴图在同一层级下的文件夹中,这样模型就自带贴图了</li>
<li>在unity中导入模型</li>
</ol>
</div></template>


