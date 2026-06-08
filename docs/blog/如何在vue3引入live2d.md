---
layout: markdown
outline: deep
title: 如何在vue3引入live2d
category: 未分类
tags: ["vue3","live2d"]
writtenDate: 2025/08/22
updatedDate: 2025/08/22
description: 这是一篇关于如何在vue3部署liv2d的文档
---
# 如何在vue3引入live2d
这是一篇关于如何在vue3部署liv2d的文档  
基于guansss大佬开发的[pixi-live2d-display@0.5.0-beta](https://github.com/guansss/pixi-live2d-display)库来构建  
如需立即获得一个live2d基础框架,请点击该网址,[fish-bread的live2d项目](https://github.com/fish-bread/vue-live2d)

# 使用技术
1. vue3
2. [pixi.js@7.4.3](https://pixijs.com/7.x/guides)
3. [pixi-live2d-display@0.5.0-beta](https://github.com/guansss/pixi-live2d-display)
4. live2dcubism的用于web的脚本文件(live2dcubismcore.min.js和live2d.min.js)  
[live2d.min.js的文件链接](https://github.com/fish-bread/vue-live2d/blob/main/src/live2d.min.js)  
[live2dcubismcore.min.js的文件链接](https://github.com/fish-bread/vue-live2d/blob/main/src/live2dcubismcore.min.js)

# 配置依赖
1. 首先将需要的包进行下载  
```bash
 npm install pixi.js@7.4.3
 npm install pixi-live2d-display@0.5.0-beta
```
2. 将两个运行脚本下载到项目中(推荐下载到public文件夹)  
3. 在index.html文件中引入(将图中的路径替换为你的路径)
![index.html配置图片](/markdown_img/vue/vue_live2d_index.png 'index.html配置图片')
4. 将你所需要运行的单个live2d文件放在public文件夹中

# live2d文件介绍
1. model3.json文件(或model.json文件),本次部署live2d模型的**核心文件**.在该文件中记录;了有关live2d模型的  
   1. 动作列表[Motion],**用于记录触发什么动作**
   2. 语言列表[Motion列表下每个动作file路径下的对应的Sound],**用于记录触发相应动作时的音频路径**,
   > 注意:语音无需主动触发,当动作执行时,语音会自动触发,当然,如果有的话
   3. 表情列表[expressioon],**用于记录触发什么表情，表情列表不跟随动作一同进行**
   ![motion图片](/markdown_img/vue/motion.png 'motion图片')
   ![express图片](/markdown_img/vue/express.png 'express图片')
# 组件引入
## 在你要引入的组件中引入
```javascript
import * as PIXI from 'pixi.js';
//所有引入
import { Live2DModel } from 'pixi-live2d-display';
//只需要 Cubism 2.1
//import { Live2DModel } from 'pixi-live2d-display/cubism2';
//只需要 Cubism 4
//import { Live2DModel } from 'pixi-live2d-display/cubism4';

```

## 创建相关对象
> 其中,model_list用于编写**模型名字**,**模型文件路径**(一般为模型文件下的'模型名.model3.json'或'模型名.model.json'),**模型缩放大小**
```javascript
//将 PIXI 暴露到 window 对象，以便运行库能够一次使用全部方法
window.PIXI = PIXI;
//为了存储pixi实例
const app = ref()
//为了存储live2d实例
const model = ref()
//便签绑定
const liveCanvas = shallowRef();
//模型是否运动
const is_moving = ref()
//模型列表
const model_list = ref([
    {model_name: "none", model_path: "none", scale_set: "none"},
])
```
## 创建函数用于加载模型
> 这里我使用了model.value.motion('任意动作对象名称'),用于点击模型触发动画,你也可以自己使用model.value.motion(selectedMotion,motionNum)去绑定你的函数来执行动作
```javascript
// 加载模型的函数
const loadModel = async (index) => {
    // 如果已经有模型存在，先销毁
    if (model.value) {
        app.value.stage.removeChild(model.value);
        model.value.destroy();
        model.value = null;
    }
    // 加载新模型
    if (model_list.value[index].model_path !== "none") {
        // 这里是放live2d资源的地方，直接相对路径引用即可
       // 导入后缀为.model3.json的json文件路径
        model.value = await Live2DModel.from(model_list.value[index].model_path); 
        // 直接引入模型
        app.value.stage.addChild(model.value);
        // 调整缩放比例,0.1-0.2整体比较合适,要每个模型具体调整
        model.value.scale.set(model_list.value[index].scale_set); 
        /* 调整渲染位置,要每个模型具体调整
         model.value.position.set(window.innerWidth / 5, window.innerHeight / 60); */
        model.value.autoInteract = true; // 启用自动交互
    }
    //模型构建
    if (!model.value) return
    // 添加点击事件监听
    model.value.on('pointerdown', (event) => {
        console.log('模型被点击', event.data.global);
        // 触发点击动作（例如触摸身体）
        if (model.value && is_moving.value === false ) {
            console.log('当前正在执行动作')
            return
        }
        model.value.motion('任意动作对象');
    });
};
//页面dom构建完成就执行
onMounted(async () => {
    app.value = new PIXI.Application({
        view: liveCanvas.value, //ref组件绑定，liveCanvas为下文自定义的
        autoStart: true, //是否开启自动播放
        //resizeTo: window, //是否覆盖样式
        interaction: true, // 确保启用交互系统
        backgroundAlpha: 0, //背景
        resolution: window.devicePixelRatio || 1, // 使用设备像素比提高清晰度
        antialias: true, // 开启抗锯齿
    })
    // 初始加载模型
    await loadModel(model_num.value);
    //监听动画是否正在执行
    watchEffect(()=> {
        if (!model.value || !model.value.internalModel) return;
        is_moving.value = model.value.internalModel?.motionManager.isFinished()
        console.log('动画是否正在执行',is_moving.value )
    })
})
onBeforeUnmount(() => {
    model?.value.destroy()
    app?.value.destroy()
})
```
# 构建页面
```vue
<template>
  <div class="background">
    <div class="live2d-box">
      <canvas class="live2d-box-canvas" ref="liveCanvas"></canvas>
    </div>
  </div>
</template>
```

```css
.background {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    background-color: aquamarine;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
}
.live2d-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.live2d-box-canvas {
    height: 100%;
}
```
# 结束
在vue中开始运行你的live2d模型吧! :smiley: 🎉

