---
layout: Layout
title: unity对布料解析
data: 2026/05/07
description: unity对布料解析
---
# unity对布料解析
## unity插件
1. Magica Cloth 2插件
## 步骤
1. 对于要导入的模型,先进行常规处理模型操作,如果是一个整体,应当在blender中全选后按p进行材质分解
2. 导入模型到unity
3. 选中要添加的衣服模型,添加magicaCloth组件
    1. 在这里添加你要添加的衣服模型
   ![Pasted image 20260507204836.png](/markdown_img/unity/Pasted_image_20260507204836.png)
    2. 在这里调整模拟量
   ![Pasted image 20260507204909.png](/markdown_img/unity/Pasted_image_20260507204909.png)
    3. 使用这个按钮进行编辑顶点
   ![Pasted image 20260507205046.png](/markdown_img/unity/Pasted_image_20260507205046.png)
    4. 在这个preset中选择预设模拟的物体是什么,或者你自己设置
   ![Pasted image 20260507205403.png](/markdown_img/unity/Pasted_image_20260507205403.png)
4. 如需添加碰撞,选中离你的衣服最近的骨骼==(必须是控制人物动作的骨骼)==为其添加magicacollider组件,然后设置其大小,功能类似unitycollider,但这里必须使用magicacollider
5. 将刚刚添加过magicacollider的骨骼在中的collider List中添加即可
![Pasted image 20260507205825.png](/markdown_img/unity/Pasted_image_20260507205825.png)
6.  运行游戏查看结果