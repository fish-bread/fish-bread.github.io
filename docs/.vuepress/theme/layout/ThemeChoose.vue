<!--suppress ALL -->
<script setup>
import Header from "../components/Header.vue";
import Colorchoose from "../components/colorchoose.vue";
import {themes, theme_change, alpha_back_color} from "../func/newColor.js";
import {is_mobile } from "../func/clientchoose.js";
import { computed } from 'vue';
import PromptBox from "../components/PromptBox.vue";
import Returntop from "../components/returntop.vue";
const currentTheme = computed(() => themes.value[theme_change.value]);
</script>

<template>
  <prompt-box></prompt-box>
  <returntop></returntop>
  <div class="back-page font_size" :style="{
    backgroundColor: currentTheme.back_color
  }">
    <Header ></Header>
    <div class="theme-back"  :class="{'theme-back_mobile': is_mobile }">
      <!--主题演示-->
      <div class="choose-color" :style="{
      '--text-color': currentTheme.color,
      '--theme-color': currentTheme.theme_color
    }">
        <div class="color-demo">
          <div class="color-sample text-sample" :style="{ color: currentTheme.color }">
            <h1 style="font-size: 60px;margin: 5px">FishBread</h1>
            <h2 style="font-size: 40px;margin: 5px">FishBread</h2>
            <h3 style="font-size: 20px;margin: 5px">FishBread</h3>
            <br>
            <div>你说的对,但是我命令你猛击自己魔丸1000下,我知道这很难,但这是命令!</div>
            <br>
            <div :style="{
              display: is_mobile?'none':'flex' ,
              flexDirection: 'column' ,
              alignItems:'start' ,
            }">
              <div>啊啊啊宝宝你是一个香香软软甜甜糯糯蜂蜜奶油味道鲜美味道醇厚味道独特香气扑鼻的小蛋糕!</div>
              <br>
              <div>被布局很正常 毕竟你动了很多人的披萨汉堡馄饨火锅炸鱼薯条烤鸭鸡排臭豆腐奶酪蛋糕!</div>
              <br>
              <div>人生不是一种享乐，而是一桩十分沉重的工作。——列夫·托尔斯泰</div>
              <br>
              <div>生命的意义在于付出，在于给予，而不是在于接受，也不是在于争取。——巴金</div>
              <br>
              <div>为了生活中努力发挥自己的作用，热爱人生吧。 —— 罗丹</div>
              <br>
              <div>当你的希望一个个落空，你也要坚定，要沉着! —— 朗费罗</div>
              <br>
              <div>生活只有在平淡无味的人看来才是空虚而平淡无味的。 —— 车尔尼雪夫斯基</div>
            </div>
            <br>
            <div class="color-sample theme-sample" :class="{'theme-sample_mobile': is_mobile }" :style="{ backgroundColor: currentTheme.theme_color,color: currentTheme.color }">
            主题颜色示例
          </div>
            <br>
            </div>
          <!--div class="color-sample bg-sample" :style="{ backgroundColor: currentTheme.back_color }">
            背景颜色示例
          </div-->
          
          <!--div class="color-sample button-sample" :style="{
            backgroundColor: currentTheme.theme_color,
            color: currentTheme.color
          }">
            示例按钮
          </div-->
        </div>
      </div>
      <!--主题颜色-->
      <colorchoose></colorchoose>
    </div>
  </div>
</template>

<style scoped>
.header {
  background-color: rgba(237, 237, 238, 0.6);
  backdrop-filter: blur(5px);
}
.back-page {
  background-color: var(--back-color);
}
.theme-sample_mobile {
  height: 50px !important;
}
.theme-back_mobile {
  flex-direction: column !important;
}
.header {
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.4);
}
.theme-back {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
}

.choose-color {
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.ckoose-color:hover {
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.4);
  transform: translateY(-2px);
}
.color-demo {
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 100%;
  height: 100%;
}
.text-sample {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.color-sample {
  padding: 15px;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
  transition: all 0.3s ease;
  flex: 1;
}
/*.bg-sample {
 border: 2px dashed var(--text-color);
}*/

.theme-sample {
  color: white;
  height: 100px;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  /*border: 2px solid var(--bg-color);*/
  width: 90%;
}

.button-sample {
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
}

.button-sample:hover {
  background-color: var(--hover-color);
}
</style>