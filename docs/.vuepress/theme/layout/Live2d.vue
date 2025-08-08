
<script setup>
import Header from '../components/Header.vue'
import {onBeforeUnmount, onMounted, ref, shallowRef, watchEffect} from "vue";
import {theme_change, themes} from "../func/newColor.js";
import PromptBox from "../components/PromptBox.vue";
import {showPrompt} from "../func/prompt_box.js";
//动态引入
const live2DModel = ref(null);
const PIXI = ref(null);
// 将loadScript函数移到顶层作用域
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}
//在引入框架前先加载运行时
const loadDependencies = async () => {
  try {
    // 加载脚本
    await loadScript('/js/live2dcubismcore.min.js');
    await loadScript('/js/live2d.min.js');
// 动态加载 PIXI.js
    const pixiModule = await import('pixi.js');
    PIXI.value = pixiModule.default || pixiModule;
    
    // 动态加载模块
    const module = await import('pixi-live2d-display');
    console.log('加载依赖成功');
    return module.Live2DModel;
  } catch (error) {
    console.error('加载依赖失败:', error);
    throw error;
  }
}
//为了存储pixi实例
const app = ref()
//为了存储live2d实例
const model = ref()
//便签绑定
const liveCanvas = shallowRef();
//模型列表
const model_list = ref([
  {model_name: "none", model_path: "none"},
  {model_name: "wuzang_3", model_path: "/live2d/wuzang_3/wuzang_3.model3.json", scale_set: "0.1" },
])
// 动作列表数据
const model_motion_list = ref([
  {
    model_name: "none",
    model_list:[
      {motion_name: 'none'},
    ]
  },
  {
    model_name: "wuzang",
    motion_list: [
      {motion_name: 'none'},
      {motion_name: 'complete'},
      {motion_name: 'effect'},
      {motion_name: 'home'},
      {motion_name: 'idle'},
      {motion_name: 'idle1'},
      {motion_name: 'idle2'},
      {motion_name: 'idle3'},
      {motion_name: 'idle4'},
      {motion_name: 'idle5'},
      {motion_name: 'idle6'},
      {motion_name: 'idle7'},
      {motion_name: 'idle8'},
      {motion_name: 'login'},
      {motion_name: 'mail'},
      {motion_name: 'main_1'},
      {motion_name: 'main_2'},
      {motion_name: 'main_3'},
      {motion_name: 'main_4'},
      {motion_name: 'main_5'},
      {motion_name: 'mission'},
      {motion_name: 'mission_complete'},
      {motion_name: 'touch_body'},
      {motion_name: 'touch_drag1'},
      {motion_name: 'touch_drag2'},
      {motion_name: 'touch_drag3'},
      {motion_name: 'touch_drag4'},
      {motion_name: 'touch_drag5'},
      {motion_name: 'touch_drag6'},
      {motion_name: 'touch_drag7'},
      {motion_name: 'touch_drag8'},
      {motion_name: 'touch_drag9'},
      {motion_name: 'touch_drag10'},
      {motion_name: 'touch_drag11'},
      {motion_name: 'touch_drag12'},
      {motion_name: 'touch_drag13'},
      {motion_name: 'touch_drag14'},
      {motion_name: 'touch_head'},
      {motion_name: 'touch_idle1'},
      {motion_name: 'touch_special'},
      {motion_name: 'wedding'}
    ]
  },
]);
//模型数字
const model_num = ref(0)
//模型是否运动
const is_moving = ref()
//是否切换模型
const is_change_model = ref(false)
//模型动作相关
const model_motion = ref({
  // 当前选择的动作
  selectedMotion: 'none',
  // 当前动作编号
  motionNum: 0,
})
//模型创建时间
const model_elapsedTime = ref('none')
// 加载模型的函数
const loadModel = async (index, Live2DModel ) => {
  // 如果已经有模型存在，先销毁
  if (model.value) {
    app.value.stage.removeChild(model.value);
    model.value.destroy();
    model.value = null;
  }
  // 加载新模型
  if (model_list.value[index].model_path !== "none") {
    // 这里是放live2d资源的地方，直接相对路径引用即可
    model.value = await Live2DModel.from(model_list.value[index].model_path); //导入后缀为.model3.json的json文件路径
    app.value.stage.addChild(model.value);// 直接引入模型
    model.value.scale.set(model_list.value[index].scale_set); // 调整缩放比例,0.1-0.2整体比较合适,要每个模型具体调整
    // model.value.position.set(window.innerWidth / 5, window.innerHeight / 60); // 调整渲染位置,要每个模型具体调整
    model.value.autoInteract = true; // 启用自动交互
  }
  //模型构建时间
  if (!model.value) return
  model_elapsedTime.value = model.value.elapsedTime
  console.log('模型数据',model.value)
  // 添加点击事件监听
  model.value.on('pointerdown', (event) => {
    console.log('模型被点击', event.data.global);
    // 触发点击动作（例如触摸身体）
    if (model.value && is_moving.value === false ) {
      console.log('当前正在执行动作')
      return
    }
    model.value.motion('idle');
  });
};
// 执行动作函数
const execute_action = async (selectedMotion, motionNum) => {
  if (!model.value) return;
  model.value.motion(selectedMotion,  motionNum);
};
//更换模型
const change_model = async () => {
  await loadModel(model_num.value, live2DModel.value);
  is_change_model.value = true;
  showPrompt( '模型更换成功', 'success');
}
// 更换动作
const change_model_move = () => {
  execute_action(model_motion.value.selectedMotion, model_motion.value.motionNum);
  showPrompt( '动作更换成功', 'success');
};
//停止动作
const motion_stop = () => {
  // 停止所有当前动作
  model.value.internalModel.motionManager.stopAllMotions();
  showPrompt( '动作已停止', 'success');
}
//测试函数
const test_func = () => {
  if (!model.value) return;
  console.log('当前音频', model.value.internalModel.motionManager.currentAudio)
}
onMounted(async () => {
  try {
    const Live2DModel = await loadDependencies();
    //将 PIXI 暴露到 window 对象，以便本插件能够
    //引用 window.PIXI.Ticker 来自动更新 Live2D 模型
    window.PIXI = PIXI.value; // 确保PIXI在全局可用
    live2DModel.value = Live2DModel;
    // 初始化Live2D
    app.value = new PIXI.value.Application({
      view: liveCanvas.value, //ref组件绑定，liveCanvas为下文自定义的
      autoStart: true, //是否开启自动播放
      //resizeTo: window, //是否覆盖样式
      interaction: true, // 确保启用交互系统
      backgroundAlpha: 0, //背景
      resolution: window.devicePixelRatio || 1, // 使用设备像素比提高清晰度
      antialias: true, // 开启抗锯齿
    })
    // 初始加载模型
    await loadModel(model_num.value,live2DModel.value);
    //监听动画
    watchEffect( ()=> {
      if (!model.value || !model.value.internalModel) return;
      is_moving.value = model.value.internalModel?.motionManager.isFinished()
      console.log('执行监听动画',is_moving.value,is_change_model.value  )
    })
    //监视模型切换
    watchEffect(async ()=> {
      if (!model.value) return;
      console.log('执行监听模型')
    })
    //监视时间
    watchEffect(async ()=> {
      if (!model.value) return
      model_elapsedTime.value = Math.floor(parseFloat(model.value.elapsedTime))
      console.log('时间',model_elapsedTime.value)
    })
    
  } catch (e) {
    console.error('初始化失败:', e);
  }
});
onBeforeUnmount(() => {
  model?.value.destroy()
  app?.value.destroy()
})
</script>

<template>
  <!--添加确认提示-->
  <prompt-box></prompt-box>
  <div class="home-box font_size" :style="{
    '--home-box-back_color': theme_change === 'light' ? themes.light.back_color : themes.dark.back_color,
  }">
    <Header></Header>
    <div class="background">
      <div class="top" :style="{
        color: theme_change === 'light' ? themes.light.color : themes.dark.color,
      }">
        <div class="model_size">
          <!--切换模型-->
          <select v-model="model_num" @change="change_model">
            <option v-for="(model , index) in model_list" :value="index" :key="index">
              {{model.model_name}}
            </option>
          </select>
          <!--更换动作-->
          <select :disabled="is_moving === true && is_change_model === false" v-model="model_motion.selectedMotion" @change="change_model_move">
            <option v-for="motion in model_motion_list[model_num].motion_list" :value="motion.motion_name" :key="motion.motion_name">
              {{motion.motion_name}}
            </option>
          </select>
          <button @click="motion_stop">停止动作</button>
          <button @click="test_func">test</button>
          <div style="font-size: 13px">注:(出现模型动作卡住,请停止动作试试)</div>
        </div>
        <div class="top_name">这是live2d-vue一键部署项目</div>
        <div class="model_data">
          <div>当前模型:&nbsp;{{model_list[model_num].model_name}}</div>
          <div>当前动作:&nbsp;{{model_motion.selectedMotion}}</div>
          <div>创建时间&nbsp;{{ model_elapsedTime }}毫秒</div>
        </div>
      </div>
      <div class="live2d-box">
        <canvas class="live2d-box-canvas" ref="liveCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.4);
}
select {
  cursor: pointer;
}
button {
  cursor: pointer;
}
.background {
  padding-top:10px;
  box-sizing: border-box;
  width: 100vw;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
}
.top {
  box-sizing: border-box;
  height: 30px;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: color 0.3s ease;
}
.model_size {
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.top_name {
  flex-grow: 1;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.model_data {
  width: 450px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.live2d-box {
  width: 100%;
  height: calc(100% - 30px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.live2d-box-canvas {
  height: 100%;
}
</style>
