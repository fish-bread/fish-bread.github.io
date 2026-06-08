---
layout: Layout
title: 关于模之屋的mmd模型导入unity
data: 2026/05/07
description: 关于模之屋的mmd模型导入unity
---
# blender插件
1. mmd-tool(用于导入模型)
2. BBBbulldozer(用于处理贴图)
3. blender-unity-fbx(用于导出模型)
# 步骤
1. 使用mmd-tool导入模型
2. 处理模型,删去刚体骨骼和
![删除对象的图片](/markdown_img/unity/Pasted_image_20260506150700.png '配置图片')
![删除对象的图片](/markdown_img/unity/Pasted_image_20260506150829.png)
3. 用BBBbulldozer处理模型提取原理化后的模型
4. (可选)如果需要在unity中布料解析,是一个整体的模型,应当在blender中全选后按p进行材质分解
5. 在blender中全选模型,使用 blender-unity-fbx导出模型,选择仅选中物体和带叶骨
6. 将原本的贴图复制一份到unity,将模型放入与贴图在同一层级下的文件夹中,这样模型就自带贴图了
7. 在unity中导入模型
