<!--suppress ALL -->
<script setup>
import Header from "../components/Header.vue";
import Colorchoose from "../components/colorchoose.vue";
import { themes, theme_change } from "../func/newColor.js";
import {is_mobile } from "../func/clientchoose.js";
import { computed } from 'vue';
import PromptBox from "../components/PromptBox.vue";

const currentTheme = computed(() => themes.value[theme_change.value]);
</script>

<template>
  <prompt-box></prompt-box>
  <div class="back-page font_size">
    <Header></Header>
    <div class="theme-back"  :class="{'theme-back_mobile': is_mobile }">
      <!--主题演示-->
      <div class="ckoose-color" :style="{
      '--text-color': currentTheme.color,
      '--bg-color': currentTheme.back_color,
      '--theme-color': currentTheme.theme_color
    }">
        <div class="color-demo">
          <div class="color-sample text-sample" :style="{ color: currentTheme.color }">
            FishBread
          </div>
          <!--div class="color-sample bg-sample" :style="{ backgroundColor: currentTheme.back_color }">
            背景颜色示例
          </div-->
          <div class="color-sample theme-sample" :class="{'theme-sample_mobile': is_mobile }" :style="{ backgroundColor: currentTheme.theme_color,color: currentTheme.color }">
            主题颜色示例
          </div>
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
.back-page {
  background-color: #e4e4e4;
  height: 100vh;
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
.ckoose-color {
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  background-color: var(--bg-color);
  color: var(--text-color);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.ckoose-color:hover {
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.4);
  transform: translateY(-2px);
}
.color-demo {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.color-sample {
  padding: 15px;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
  transition: all 0.3s ease;
}

.text-sample {
  font-size: 35px;
  /*border: 2px solid var(--theme-color);*/
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