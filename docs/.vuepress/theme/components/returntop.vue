<!--suppress ALL -->
<script setup>
import {onMounted, shallowRef, watch, ref, nextTick} from "vue";
//监听滚动距离
import {useWindowScroll, watchThrottled} from '@vueuse/core'
import {theme_change, themes} from '../func/newColor.js'
import {headerHeight, layout_header, layout_header_left_list, layout_header_title} from "../func/bigHeader.js";
import {layout_header_left, markdown_box} from "../func/clientchoose.js";
const return_top_ref = shallowRef()
const { y } = useWindowScroll()
const Height_percentage = ref(0)
const is_Height_percentage_box = ref(true)
onMounted(()=> {
  //监听滚动节流
  watchThrottled(
      () => y.value, // 监听的依赖
      (newY) => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        console.log('整个高度与滚动高度的百分比',`${((newY / total) * 100).toFixed(2)}%`)
        Height_percentage.value = ((newY / total) * 100).toFixed(0)
        //导航栏变化函数
        if (newY > 0) {
          //按钮是否显现
          return_top_ref.value.style.display = 'block';
          if (!markdown_box.value) return
          //执行导航高度变化
          nextTick()
          headerHeight.value = getComputedStyle(layout_header.value).height
          layout_header.value.style.height = "60px";
          layout_header_title.value.style.transform = "translateY(-180px)";
          layout_header_title.value.style.opacity = "0";
          markdown_box.value.style.paddingTop = "60px";
          layout_header_left.value.style.padding = "70px 10px 10px 20px";
          layout_header_left.value.style.height = "calc(100vh)";
          layout_header_left_list.value.style.height = "100%";
          
        } else {
          //按钮是否显现
          return_top_ref.value.style.display = 'none';
          if (!markdown_box.value) return
          //执行导航高度变化
          nextTick()
          headerHeight.value = '240px'
          layout_header.value.style.height = "";
          layout_header_title.value.style.transform = "";
          layout_header_title.value.style.opacity = "";
          markdown_box.value.style.paddingTop = "";
          layout_header_left.value.style.padding = "";
          layout_header_left.value.style.height = "";
          layout_header_left_list.value.style.height = "";
        }
        //监听高度变化
        console.log('导航高度', headerHeight.value)
      },
      {throttle: 300, immediate: true} // 100ms 节流
  )
})
//返回最上面
const return_top_func = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 平滑滚动
  });
}
</script>

<template>
  <transition>
    <!--设置返回最上级-->
    <button @mouseover="is_Height_percentage_box = false" @mouseleave="is_Height_percentage_box = true" ref="return_top_ref" 
            @click="return_top_func" class="return_top svg-box"  :style="{
      '--svg-box-icon-path-hover': theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
      '--svg-box-hover':theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
      '--svg-box-path': theme_change === 'light' ? themes.light.color : themes.dark.color,
      color: theme_change === 'light' ? themes.light.color : themes.dark.color,
         }">
      <!--未停留时显示百分比-->
      <transition>
        <div v-show="is_Height_percentage_box" class="Height_percentage_box"
             :style="{backgroundColor: theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,}">
          <!-- 只保留进度圆 -->
          <svg class="progress-circle" viewBox="0 0 36 36">
            <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                :stroke="theme_change === 'light' ? themes.light.color : themes.dark.color"
                stroke-width="2"
                stroke-linecap="round"
                :stroke-dasharray="100"
                :stroke-dashoffset="100 - Height_percentage"
                transform="rotate(-90 18 18)"
            />
          </svg>
          <!--圆形内部数字-->
          <div class="Height_percentage_box_text" :style="{
           backgroundColor: theme_change === 'light' ? themes.light.back_color : themes.dark.back_color,
        }">{{ Height_percentage }}</div>
        </div>
      </transition>
      <!--停留显示返回svg-->
      <svg t="1754149666072" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8990" width="200" height="200"><path d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128c-211.744443 0-384 172.255557-384 384s172.255557 384 384 384 384-172.255557 384-384S723.744443 128 512 128z" fill="#575B66" p-id="8991"></path><path d="M694.463217 458.367639l-158.495686-160.25545c-9.34412-9.471415-23.167639-11.840129-34.784142-7.135385-0.736245 0.287273-1.312512 0.992555-2.016073 1.343475-2.975944 1.47249-5.951888 3.072275-8.447897 5.5356-0.032684 0.032684-0.032684 0.063647-0.063647 0.096331-0.032684 0.032684-0.063647 0.032684-0.096331 0.063647l-159.359226 158.911974c-12.512727 12.480043-12.54369 32.735385-0.063647 45.248112 6.239161 6.271845 14.463432 9.407768 22.65674 9.407768 8.160624 0 16.352211-3.103239 22.591372-9.34412l103.616181-103.296224 0 305.056632c0 17.695686 14.336138 31.99914 32.00086 31.99914s32.00086-14.303454 32.00086-31.99914L544.00258 397.247252l104.959656 106.112189c6.239161 6.335493 14.496116 9.504099 22.751351 9.504099 8.12794 0 16.25588-3.072275 22.496761-9.247789C706.783282 491.199355 706.912297 470.944013 694.463217 458.367639z" fill="#575B66" p-id="8992"></path></svg>
    </button>
  </transition>
</template>

<style scoped>
.progress-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.progress-circle circle {
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.3));
}
.Height_percentage_box {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Height_percentage_box_text {
  position: relative;
  z-index: 2;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.return_top {
  all:  unset;
  z-index: 10000;
  position: fixed;
  width: 40px;
  height: 40px;
  cursor: pointer;
  right: 30px;
  bottom: 30px;
  border-radius: 50%;
  overflow: hidden;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>