<!--suppress ALL -->
<script setup>
import {hide_left_button, is_left_hide, layout_header_left, markdown_box, single_markdown_list } from "../func/clientchoose.js";
import { layout_header_left_list } from "../func/bigHeader.js";
import {RouterLink} from "vue-router";
import {big_title} from "../func/bigHeader.js";
import {calculateHoverColor, theme_change, themes} from "../func/newColor.js";

const hide_left = () => {
  if (is_left_hide.value === false) {
    layout_header_left.value.style.transform = 'translateX(-270px)';
    hide_left_button.value.style.transform = 'rotate(180deg)';
    markdown_box.value.style.paddingLeft = "30px";
    hide_left_button.value.style.right = '0';
    is_left_hide.value = true
  } else {
    layout_header_left.value.style.transform = '';
    hide_left_button.value.style.transform = '';
    markdown_box.value.style.paddingLeft = "300px";
    hide_left_button.value.style.right = '';
    is_left_hide.value = false
  }
}
import { useRoute } from "vue-router";
const route = useRoute();

// 添加计算当前激活链接的函数
const isActiveLink = (link) => {
  return route.path === link;
};
</script>

<template> 
  <div ref="layout_header_left" class="markdown-box-left"  :style="{
    backgroundColor: theme_change === 'light' ? calculateHoverColor(themes.light.back_color, 0.1) : calculateHoverColor(themes.dark.back_color,0.1),
  }">
    <!--隐藏按钮-->
    <button ref="hide_left_button" class="hied_left svg-box" @click="hide_left" :style="{
'--svg-box-icon-path-hover': theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
'--svg-box-hover':theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
'--svg-box-path': theme_change === 'light' ? themes.light.color : themes.dark.color,
}">
      <svg t="1754292160137" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10101" width="200" height="200"><path d="M603.3 327.5l-246 178c-4.4 3.2-4.4 9.7 0 12.9l246 178c5.3 3.8 12.7 0 12.7-6.5V643c0-10.2-4.9-19.9-13.2-25.9L457.4 512l145.4-105.2c8.3-6 13.2-15.6 13.2-25.9V334c0-6.5-7.4-10.3-12.7-6.5z" p-id="10102"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" p-id="10103"></path></svg>
    </button>
    <!--内容-->
    <div class="markdown-box-left-list-title font-box" :style="{
    '--font-box-color': theme_change === 'light' ? themes.light.color : themes.dark.color,
     '--scrollbar-track-color': theme_change === 'light' ? themes.light.back_color : themes.dark.back_color,
  }">
      <div style="width: 25px; height: 25px" :style="{
        fill: theme_change === 'light' ? themes.light.color : themes.dark.color,
      }">
        <svg t="1754753383337" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13078" width="200" height="200"><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326z m1.8 562H232V136h302v216c0 23.2 18.8 42 42 42h216v494z" p-id="13079"></path><path d="M504 618H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM312 490v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8z" p-id="13080"></path></svg>
      </div>
      {{ big_title }}文档清单
    </div>
    <!--文档列表-->
    <div class="markdown-box-left-list font-box" :style="{
    '--font-box-color': theme_change === 'light' ? themes.light.color : themes.dark.color,
     '--scrollbar-track-color': theme_change === 'light' ? themes.light.back_color : themes.dark.back_color,
  }" ref="layout_header_left_list">
      <div class="markdown-box-left-list-item ">
        <router-link
            :class="{ 'active-link': isActiveLink(list.markdown_link) }"
            :title="list.markdown_name" v-for="(list, index) in single_markdown_list" :to="list.markdown_link" :key="index" 
            class="markdown-box-left-list-box hover-box" 
            :style="{
          '--hover-box-hover': theme_change === 'light' ? themes.light.hover_color : themes.dark.hover_color,
           '--active-link-bg': theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
          '--active-link-color': theme_change === 'light' ? themes.light.color : themes.dark.color
        }">
          {{ list.markdown_name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  color: var(--link-color);
  text-decoration: none !important;
  outline: none; /* 去除旧版浏览器的点击后的外虚线框 */
}
.active-link {
  background-color: var(--active-link-bg) !important;
  color: var(--active-link-color) !important;
  font-weight: bold;
}
.markdown-box-left {
  box-sizing: border-box;
  width: 300px;
  /*background-color: chocolate;*/
  padding: 250px 10px 10px 20px;
  position: fixed;
  z-index: 9;
  transition: padding 0.5s ease ,transform 0.5s ease;
  background-color: transparent;
  height: 100vh;
  border-right: solid 1px #2c2c2c;
}
.hied_left {
  all: unset;
  position: absolute;
  width: 30px;
  height: 30px;
  right: 10px;
  transition:all 0.5s ease;
}
.hied_left .icon {
  width: 100%;
  height: 100%;
}
.hied_left .icon path {
  fill: currentColor;
  transition: fill 0.3s ease;
}
.markdown-box-left-list-title {
  font-size: 20px;
  box-sizing: border-box;
  padding-bottom: 5px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  border-bottom: 1px solid #2c2c2c;
}
.markdown-box-left-list {
  width:  100%;
  height: calc(100vh - 280px);
  overflow-y: auto;
  transition: height 1s ease;
}
.markdown-box-left-list::-webkit-scrollbar {
  background: var(--scrollbar-track-color);
  width: 8px;
  transition: background 0.3s ease;
}
.markdown-box-left-list::-webkit-scrollbar-thumb {
  background: #888; /* 显式设置滑块颜色，避免继承 */
  border-radius: 20px;
}
.markdown-box-left-list-item {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.markdown-box-left-list-box {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 36px;
  padding: 8px 5px 8px 5px;
  border-radius: 5px;
  transition: color 0.3s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
}
</style>