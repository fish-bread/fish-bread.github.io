<!--suppress ALL -->
<script setup>
import {hide_left_button, is_left_hide,  is_Sidebar,sidebar } from "../func/clientchoose.js";
import { theme_change, themes} from "../func/newColor.js";
import { animate,text, stagger,createTimer } from "animejs";
import { onMounted,watch } from "vue";
import  UserHead from '../components/userHead.vue'
const hide_left = () => {
  hide_left_button.value.style.transform = '';
  is_left_hide.value = false
  is_Sidebar.value = false
}
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
  const all_box_anim = animate('.sidebar-box-left', {
    x: { to: [-300, 0]},
    duration: 300,
    loop: 0,
    ease: 'easeInQuad',
    autoplay: false,
    onComplete:()=> {
      console.log('执行完成')
      name_time.revert()
      name_time.play()
    }
  })
  //文字动画
  const name_text =text.split('.sidebar-content-user-name',{
    chars: true
  })
  const name_anim = animate(name_text.chars, {
    opacity: {to: [0,1]},
    x: { to: [10, 0]},
    duration: 300,
    delay: stagger(50),
    autoplay: false,
  })
  const name_time = createTimer({
    duration: 200,
    loop: 0,
    autoplay: false,
    onComplete:()=> {
      name_anim.restart()
    }
  })
})
</script>

<template> 
  <div v-show="is_Sidebar" ref="sidebar" class="sidebar-back">
    <div class="sidebar-box-left"  :style="{
    backgroundColor: theme_change === 'light' ? themes.light.back_color : themes.dark.back_color,
    color: theme_change === 'light' ? themes.light.color : themes.dark.color,
  }">
      <!--顶部内容-->
      <div class="sidebar-box-left-title" :style="{
     '--scrollbar-track-color': theme_change === 'light' ? themes.light.back_color : themes.dark.back_color,
  }">
        <div class="markdown-box-left-list-title-left">
          <div style="width: 25px; height: 25px" :style="{
        fill: theme_change === 'light' ? themes.light.color : themes.dark.color,
      }">
            <svg :style="{
            '--default-fill-color': theme_change === 'light' ? themes.light.color : themes.dark.color,
            '--default-hover-color': theme_change === 'light' ? themes.light.hover_color : themes.dark.hover_color,
            }"
                t="1755677742689" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12037" width="200" height="200"><path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM912 476H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM912 760H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" p-id="12038"></path><path d="M160 228m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z" p-id="12039"></path><path d="M160 512m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z" p-id="12040"></path><path d="M160 796m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z" p-id="12041"></path></svg>
          </div>
          导航栏
        </div>
        <!--隐藏按钮-->
        <button ref="hide_left_button" class="hied_left_button" @click="hide_left">
          <svg :style="{
            '--default-fill-color': theme_change === 'light' ? themes.light.color : themes.dark.color,
            '--default-hover-color': theme_change === 'light' ? themes.light.hover_color : themes.dark.hover_color,
          }"
              t="1755672417856" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11872" width="200" height="200"><path d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" p-id="11873"></path></svg>
        </button>
      </div>
      <!--普通内容-->
      <div class="sidebar-content">
        <!--个人盒子-->
        <div class="sidebar-content-user">
          <UserHead :set-height="'60px'" :set-width="'60px'"></UserHead>
          <div class="sidebar-content-user-name">fishbread</div>
        </div>
        <!--其他-->
        <div class="sidebar-content-inConcent">你好</div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.sidebar-back {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  z-index: 10000;
}
.sidebar-box-left {
  box-sizing: border-box;
  width: 300px;
  /*background-color: chocolate;*/
  padding: 10px 10px 10px 20px;
  transition: padding 0.5s ease ,transform 0.5s ease;
  background-color: transparent;
  height: 100vh;
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
.sidebar-box-left-title {
  font-size: 20px;
  box-sizing: border-box;
  padding-bottom: 5px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
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
  gap: 5px;
}
.sidebar-content {
  box-sizing: border-box;
  padding: 10px 0 10px 0;
  gap: 10px;
  display: flex;
  flex-direction: column;
}
.sidebar-content-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.sidebar-content-user-name {
  font-size:20px;
  font-weight: bold;
}
.sidebar-content-inConcent {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>