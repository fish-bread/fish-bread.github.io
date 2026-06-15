---
layout: markdown
outline: deep
title: 解包的叶瞬光blender模型如何导入unity
category: unity
tags: ["blender","unity","绝区零"]
writtenDate: 2026/06/11
updatedDate: 2026/06/14
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
2. 检查模型是否具有boneroot根骨骼,没有则添加
3. 首先我们要CTRL+A应用模型旋转,选择单个模型的全部集合**从根空物体**(注意要选择性显示实体模型,便于unity设计p2或去掉不显示的模型)
4. 用Better FBX插件进行导出,插件设置如图(**其他配置默认即可** ),导出后在unity的坐标系就是正确的**注意检测根骨骼位置是否为零**
5. ![motion图片](/markdown_img/unity/Pasted_image_20260611221855.png 'motion图片')
6. ![motion图片](/markdown_img/unity/Pasted_image_20260611221912.png 'motion图片')
> 战斗的模型要和武器匣一起导出
> (贴图导出可选可不选,不选需要你直接复制一份贴图在unity中)
## 动作模型处理
1. 动作模型处理于之前的处理**类似但有不同** ,但此时导出的模型是用于在unity充当animeclip载体的fbx
2. 首先我们要CTRL+A应用模型旋转,让模型处于z轴向上.在这之后选择动画用脚本组合应用,然后用插件导出动画,此时导出的动画和后续用该模型导出的就与unity坐标系一致了
**如果模型导出动画后发生旋转,不必理会,继续使用该模型导出**
3. 使用blender的追加功能将动画文件导入(建议一次只导入一种类型动画),使用编写好的脚本将动画合并为完整动画
4. 全选该模型层级**从根空物体**(内部模型是否显示不重要),使用Better FBX插件导出,插件配置如图(**其他配置默认即可** )
5. ![motion图片](/markdown_img/unity/Pasted_image_20260611223515.png 'motion图片')
6. ![motion图片](/markdown_img/unity/Pasted_image_20260611223524.png 'motion图片')
> 战斗动画文件要和武器匣一起导出
# unity相关
来到unity,现在我们已经拥有了原模型和一个动作模型,此时我们还需要一些配置.
## 模型处理
1. 选中原模型,在Rig中将模型设置为 根节点,根节点设置依据动作真正控制移动的根节点决定(**动作和模型的rig全设置为generic**)
2. ![motion图片](/markdown_img/unity/Pasted_image_20260611223754.png 'motion图片')
3. 动画fbx也类似,但要注意选择正确的根节点,否则动画不会产生真正的位移或移动的位置不对
4. 应用根运动(root motion)
> 由于绝区零的模型似乎在maincity和attack中其正真移动的根节点不一致,如果设置了错误的根节点会导致模型没有位移,循环动画会一致从原点起步(**如果不确定可以查看动画文件,如果默认的根节点没有位移,那就是其下面的第一个节点是动画真正的根节点**)
## 使用动画
1. 首先要确认动画文件是否向前如果不是向前,则重新执行上面的步骤导入动画
2. 如图所示
2.  ![motion图片](/markdown_img/unity/Pasted_image_20260611225916.png 'motion图片')
3. 将动画文件做以下处理
4. ![motion图片](/markdown_img/unity/屏幕截图_2026-06-12_220831.png 'motion图片')
> 此处的循环时间依据动画的作用设置,烘焙y轴动画和旋转是防止无旋转及y轴作用的动画不按直线行走
# 坑点
## 不适用或过期的教程
1. 在前期角色动画没有真正位移时去查看大量过期或不适用教程例如:
    1. 将animtor设置为如图所示![motion图片](/markdown_img/unity/Pasted_image_20260611230244.png 'motion图片') (经测试,不适用)
    2. 文件本身的根节点无位移动画,需要在blender中k帧(经查看,有位移)
    3. animtor的write defaulte启用导致的(经测试,不影响)
## 模型骨骼不一致
1. 绝区零在maincity和attack动画中控制的根节点不同,皮肤之间的节点设置也不同
2. 导入的动画有时不是向着人物方向
##  unity与blender动画显示效果不一致
1. blender坐标与unity坐标系不一致
2. 在blender显示完好的动画导入unity后会可能会出现错乱**已知默认模型_attack的行走,idle均会出现武器错位问题,尚未解决**
3. 模型导入unity后可能缺少根骨骼节点