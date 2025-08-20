<!--suppress ALL -->
<script setup>
import {hide_left_button, is_left_hide, single_markdown_list, is_Sidebar,sidebar } from "../func/clientchoose.js";
import { layout_header_left_list } from "../func/bigHeader.js";
import {RouterLink} from "vue-router";
import {big_title} from "../func/bigHeader.js";
import {calculateHoverColor, theme_change, themes} from "../func/newColor.js";
import { animate, createTimeline } from "animejs";
import { onMounted } from "vue";
const hide_left = () => {
    hide_left_button.value.style.transform = '';
    is_left_hide.value = false
    is_Sidebar.value = false
}
import { useRoute } from "vue-router";
import {watch} from "vue";
const route = useRoute();

// 添加计算当前激活链接的函数
const isActiveLink = (link) => {
  return route.path === link;
};
const anim_line = createTimeline()
onMounted(() => {
  // 添加禁止滚动的函数
  const disableScroll = (disable) => {
    if (disable) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      all_box_anim.restart()
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }
  // 监听 is_Sidebar 的变化
  watch(is_Sidebar, (newValue) => {
    disableScroll(newValue)
  })
  const all_box_anim = animate('.markdown-box-left', {
    x: { to: [-300, 0]},
    duration: 300,
    loop: 0,
    ease: 'easeInQuad',
    autoplay: false,
    onComplete:()=> {
      console.log('执行完成')
    }
  })
})
</script>

<template> 
  <div v-show="is_Sidebar" ref="sidebar" class="layout-left-back">
    <div class="markdown-box-left"  :style="{
    backgroundColor: theme_change === 'light' ? calculateHoverColor(themes.light.back_color, 0.1) : calculateHoverColor(themes.dark.back_color,0.1),
  }">
      <!--内容-->
      <div class="markdown-box-left-list-title" :style="{
     color: theme_change === 'light' ? themes.light.color : themes.dark.color,
     '--scrollbar-track-color': theme_change === 'light' ? themes.light.back_color : themes.dark.back_color,
  }">
        <div class="markdown-box-left-list-title-left">
          <div style="width: 25px; height: 25px" :style="{
        fill: theme_change === 'light' ? themes.light.color : themes.dark.color,
      }">
            <svg t="1754753383337" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13078" width="200" height="200"><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326z m1.8 562H232V136h302v216c0 23.2 18.8 42 42 42h216v494z" p-id="13079"></path><path d="M504 618H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM312 490v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8z" p-id="13080"></path></svg>
          </div>
          {{ big_title }}文档清单
        </div>
        <!--隐藏按钮-->
        <button ref="hide_left_button" class="hied_left_button" @click="hide_left">
          <svg t="1755672417856" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11872" width="200" height="200"><path d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" p-id="11873"></path></svg>
        </button>
      </div>
      <!--文档列表-->
      <div class="markdown-box-left-listx" :style="{
     color: theme_change === 'light' ? themes.light.color : themes.dark.color,
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
          '--active-link-color': theme_change === 'light' ? themes.light.color : themes.dark.color,
          '--default-hover-color': theme_change === 'light' ? themes.light.hover_color : themes.dark.hover_color,
        }">
            {{ list.markdown_name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.layout-left-back {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  z-index: 10000;
}
.markdown-box-left {
  box-sizing: border-box;
  width: 300px;
  /*background-color: chocolate;*/
  padding: 10px 10px 10px 20px;
  transition: padding 0.5s ease ,transform 0.5s ease;
  background-color: transparent;
  height: 100vh;
  border-right: solid 1px #2c2c2c;
}
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
.hied_left_button {
  all: unset;
  width: 30px;
  height: 30px;
  transition:all 0.5s ease;
}
.hied_left .icon {
  width: 100%;
  height: 100%;
}
.hied_left .icon path {
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
  justify-content: space-between;
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
.markdown-box-left-list-title-left {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}
</style>