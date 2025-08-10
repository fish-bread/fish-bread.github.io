<!--suppress ALL -->
<script setup>
import {RouterLink} from "vue-router";
import {is_mobile, link_imgs } from "../func/clientchoose.js";
import { theme_change, themes } from "../func/newColor.js";
defineProps({
  module_links: {
    type: Array,
    required: true
  }
})

</script>

<template>
  <div v-for="(item, index) in module_links" :key="index" class="model_link_box home-box" 
       :style="{
     '--link-color': theme_change === 'light' ? themes.light.color : themes.dark.color,
    '--home-box-back_color': theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
    '--home-box-color': theme_change === 'light' ? themes.light.color : themes.dark.color,
       }"
       :class="{ 'mobile-height': is_mobile, 'reverse': index % 2 !== 0 }"
  >
    <!--链接图片-->
    <div :ref="(el) => { link_imgs[index] = el }"  class="model_link_box_img" :class="{ 'mobile-view': is_mobile, 'desktop-view': !is_mobile }">
      <img :src="item.link_img" alt="">
    </div>
    <!--链接文本-->
    <div class="model_link_box_textbox">
      <router-link :to="item.link_href" class="model_link_box_smtextbox hover-box" :style="{
        '--hover-box-hover': theme_change === 'light' ? themes.light.hover_color : themes.dark.hover_color,
      }">
        <div class="title_1" >{{ item.link_title }}</div>
        <div class="title_2">{{ item.link_name }}</div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
a {
  color: var(--link-color);
  text-decoration: none; /* 去除默认的下划线 */
  outline: none; /* 去除旧版浏览器的点击后的外虚线框 */
}
.reverse {
  flex-direction: row-reverse !important; /* 文字在右,用于翻转图片 */
}
.model_link_box.mobile-height {
  height: 120px;
}
.model_link_box {
  box-sizing: border-box;
  width: 80%;
  height: 300px;
  display: flex;
  flex-direction: row;
  /*padding: 10px;*/
  border-radius: 10px;
  gap: 10px;
}
.model_link_box_img {
  width: 500px;
  height: 100%;
  overflow: hidden;
  border-radius: 5px;
}
.model_link_box_img img {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.model_link_box_textbox {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: currentColor;
  justify-content: center;
  background-color: transparent;
}
.model_link_box_smtextbox {
  all:  unset;
  /*background-color: #f186b2;*/
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: color 0.3s ease;
  width: 100%;
  align-items: center;
  justify-content: center;
}
</style>