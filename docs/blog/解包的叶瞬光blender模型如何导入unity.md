---
layout: markdown
outline: deep
title: 解包的叶瞬光blender模型如何导入unity
category: unity
tags: ["blender","unity","绝区零"]
writtenDate: 2026/06/11
updatedDate: 2026/06/11
description: 个人基于zzz解包的人物动画导入unity的记录
---
# 应用版本
1. blender3.6
2. unity2022及以上(最好是)
# 准备工作(需要的文件)
1. 解包文件
2. Better FBX Importer & Exporter 6.3.0(blender插件)
# blender相关
## 模型处理
1. 由于默认的两个模型虽然是立直的,但是没有应用变换,导致模型旋转不为0.
2. 首先我们要CTRL+A应用模型旋转.在这之后将所有模型旋转x轴-90度,选择单个模型的全部集合(注意要显示全部实体模型,便于unity设计p2),
3. 用Better FBX插件进行导出,插件设置如图(**其他配置默认即可** ),导出后在unity的坐标系就是正确的
4. ![motion图片](/markdown_img/unity/Pasted_image_20260611221855.png 'motion图片')
5. ![motion图片](/markdown_img/unity/Pasted_image_20260611221912.png 'motion图片')
> (贴图导出可选可不选,不选需要你直接复制一份贴图在unity中)
## 动作模型处理
1. 动作模型处理于之前的处理**类似但有不同** ,但此时导出的模型是用于在unity充当animeclip载体的fbx
2. 首先我们要CTRL+A应用模型旋转.在这之后将所有模型旋转x轴-90度,在应用旋转变换,此时导出的动画就与unity坐标系一致了
3. 使用blender的追加功能将动画文件导入(建议一次只导入一种动画),使用编写好的脚本将动画合并为完整动画
4. 全选该模型层级(内部模型是否显示不重要),使用Better FBX插件导出,插件配置如图(**其他配置默认即可** )
5. ![motion图片](/markdown_img/unity/Pasted_image_20260611223515.png 'motion图片')
6. ![motion图片](/markdown_img/unity/Pasted_image_20260611223524.png 'motion图片')
# unity相关
来到unity,现在我们已经拥有了原模型和一个动作模型,此时我们还需要一些配置.
## 模型处理
1. 选中原模型,在Rig中将模型设置为 ![motion图片](/markdown_img/unity/Pasted_image_20260611223754.png 'motion图片')根节点,根节点设置依据动作真正控制移动的根节点决定(**动作和模型的rig全设置为generic**)
2.  动画fbx也类似,但要注意选择正确的根节点,否则动画不会产生真正的位移或移动的位置不对
3.  应用根运动(root motion)
> 由于绝区零的模型似乎在maincity和attack中其正真移动的根节点不一致,如果设置了错误的根节点会导致模型没有位移,循环动画会一致从原点起步(**如果不确定可以查看动画文件,如果默认的根节点没有位移,那就是其下面的第一个节点是动画真正的根节点**)
## 使用动画
1. 如图所示
2.  ![motion图片](/markdown_img/unity/Pasted_image_20260611225916.png 'motion图片')
# 坑点
## 不适用或过期的教程
1. 在前期角色动画没有真正位移时去查看大量过期或不适用教程例如:
    1. 将animtor设置为如图所示![motion图片](/markdown_img/unity/Pasted_image_20260611230244.png 'motion图片') (经测试,不适用)
    2. 文件本身的根节点无位移动画,需要在blender中k帧(经查看,有位移)
    3. animtor的write defaulte启用导致的(经测试,不影响)
## 模型骨骼不一致
1. 绝区零在maincity和attack动画中控制的根节点不同,皮肤之间的节点设置也不同