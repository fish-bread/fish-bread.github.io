<!--suppress CssUnresolvedCustomProperty -->
<script setup>
import {
  change_user_box,
  is_hide_user_box,
  ball,
  user_img,
  user_enter_img,
  user_leave_img,
  user_click_img
} from '../func/user_box.js'
import {watchEffect, onMounted, ref, onUnmounted, watch} from "vue";
import {alpha_back_color, theme_change, hexToRGBA, themes} from '../func/newColor.js'
import dayjs from "dayjs";
import '../styles/font.css'
//启用季节
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import TypeIt from "typeit";
dayjs.extend(quarterOfYear)
//时间
import { useDateTime } from '../func/useDateTime';
const { data_time, data_season } = useDateTime();
const set_time_setInterval_id = ref()
//引入vueuse用于检测用户是否活动
import {useIdle} from '@vueuse/core'
import Usertimebox from "./usertimebox.vue";
//设置时间
const set_time_setInterval = () => {
  if (set_time_setInterval_id.value) {
    clearInterval(set_time_setInterval_id.value)
    set_time_setInterval_id.value = null;
  } else {
    set_time_setInterval_id.value = setInterval(() => {
      data_time.value = dayjs().format('YYYY-MM-DD HH:mm:ss'); // 格式化年月日时分秒
    }, 1000);
  }
}
//设置季节
const set_season = () => {
  const now_num = dayjs().quarter()
  switch (now_num) {
    case 1:
      data_season.value = '春季';
      break;
    case 2:
      data_season.value = '夏季';
      break;
    case 3:
      data_season.value = '秋季';
      break;
    case 4:
      data_season.value = '冬季';
      break;
  }
  console.log('当前季节:', data_season.value);// 返回 1-4（1=春, 2=夏, 3=秋, 4=冬）
}
const current_head = ref(''); // 添加背景状态
// 动态获取背景图片
const backgroundImages = ref([]);
const changeBackground = () => {
  if (backgroundImages.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * backgroundImages.value.length);
    current_head.value = `${backgroundImages.value[randomIndex]}`;
  }
};
//自动透明
onMounted(async ()=>{
  const { idle, lastActive } = useIdle(3000)
  watch(() => idle.value, 
      (newValue) => {
    console.log('当前未活动为',newValue,'未活动时间',lastActive.value)
        is_hide_user_box.value = newValue;
  }, {
    immediate: true
      })
  //设置时间
  set_time_setInterval()
 //设置季节
  set_season()
  //监视盒子的隐藏
  watchEffect(()=>{
    if (is_hide_user_box.value === true) {
      ball.value.style.transform = 'translateX(55px)'
      ball.value.style.background = 'white'
    }
    else {
      ball.value.style.transform = ''
      ball.value.style.background = ''
    }
  })
  watch(() => theme_change.value, (newValue) => {
        if (newValue === 'light') {
          alpha_back_color.value = hexToRGBA(themes.value.light.theme_color, 0.5)
        } 
        else {
          alpha_back_color.value = hexToRGBA(themes.value.dark.theme_color, 0.5)
        }
        console.log('执行透明')
      }, {immediate: true})
  //注册打字机
  new TypeIt('#name', {
    strings: `fishbread`,
    speed: 50,
    loop: false,
    cursor: false,
    breakLines: false,
    startDelete: true,// 用于选择是否删除原本字符串还是直接替代
    afterComplete: () => {
      setTimeout(() => {
        new TypeIt('#title', {
          strings: `fishbred的个人博客`,
          speed: 50,
          loop: false,
          cursor: false,
          breakLines: false,
          startDelete: true,
        }).go();
      }, 1);
    }
  }).go();
  // 动态导入sm_开头的图片
  if (typeof window !== 'undefined') {
    const images = import.meta.glob('../../public/images/user_head/head_[0-9]*.png', { eager: true });
    backgroundImages.value = Object.keys(images).map(path => {
      return path.replace('../../public', '');
    });
    changeBackground(); // 初始化背景
  }
  console.log('头像', current_head.value);
})
onUnmounted(() => {
  clearInterval(set_time_setInterval_id.value)
})

</script>

<template>
  <div class="home-user-box-back">
    <!--取消和显示用户盒子-->
    <div class="show-hide-box">
      <button class="show-button" @click="change_user_box">
        <div ref="ball" class="show-button-ball" :style="{'--show-button-ball': theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color}"></div>
      </button>
    </div>
    <!--用户盒子-->
    <transition>
      <div v-show="is_hide_user_box === false" class="home-user-box">
        <!--绝对定位时间盒子-->
        <usertimebox></usertimebox>
        <div></div>
        <!--头像-->
        <div @click="user_click_img" @mouseenter="user_enter_img" @mouseleave="user_leave_img" 
             ref="user_img" class="home-user-box-head">
          <img style="z-index: 100" :src="current_head" alt="">
        </div>
        <!--文本-->
        <div class="home-user-box-text"  :style="{ 
          backgroundColor: alpha_back_color,
          color: theme_change === 'light' ? themes.light.color : themes.dark.color,
           }">
          <!--时间-->
          <div class="now_time" :style="{ backgroundColor: alpha_back_color }">{{data_time}}&nbsp;{{data_season}}</div>
          <div id="name" style="font-size: 30px;font-weight: bold"></div>
          <div id="title" style="font-size: 20px"></div>
          <!--快捷链接-->
          <!--蓝鸟-->
          <div class="quick-links"  :style="{'--svg-box-icon-path-hover': theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,'--svg-box-hover':theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,'--svg-box-path': theme_change === 'light' ? themes.light.color : themes.dark.color,}">
            <a href="https://x.com/home" target="_blank" class="quick-links-box  svg-box">
              <svg t="1754289658844" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1280" width="200" height="200"><path d="M849.92 51.2H174.08c-67.8656 0-122.88 55.0144-122.88 122.88v675.84c0 67.8656 55.0144 122.88 122.88 122.88h675.84c67.8656 0 122.88-55.0144 122.88-122.88V174.08c0-67.8656-55.0144-122.88-122.88-122.88z m-93.65504 336.5888a317.0816 317.0816 0 0 1 0.4352 16.11776c0 165.16096-126.8224 355.53792-358.656 355.53792-71.14752 0-137.4208-20.72064-193.24416-56.05888a248.6272 248.6272 0 0 0 30.04928 1.7664 254.80704 254.80704 0 0 0 156.56448-53.45792c-55.13728-1.08544-101.67808-37.28384-117.71392-86.79424 7.67488 1.37216 15.616 2.29888 23.74656 2.29888a124.6208 124.6208 0 0 0 33.13152-4.50048c-57.61024-11.47904-101.08416-61.94176-101.08416-122.54208v-1.46432c17.02912 9.216 36.48512 14.96064 57.15456 15.59552-33.85856-22.49728-56.064-60.66688-56.064-104.03328 0-22.81472 6.14912-44.43648 17.06496-62.90432a359.2192 359.2192 0 0 0 259.80416 130.62144 125.37344 125.37344 0 0 1-3.29216-28.50816c0-68.97664 56.42752-124.91264 126.05952-124.91264 36.24448 0 68.96128 15.0784 91.88864 39.40352 28.73344-5.5296 55.7312-16.0256 80.09728-30.30528-9.40032 29.12768-29.42464 53.7856-55.48032 69.24288 25.62048-3.1488 49.8944-9.82016 72.47872-19.82464a247.84384 247.84384 0 0 1-62.94016 64.72192z" fill="#2c2c2c" p-id="1281"></path></svg>
            </a>
            <!--b站-->
            <a href="https://www.bilibili.com/" target="_blank" class="quick-links-box svg-box">
              <svg t="1754289692021" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1667" width="200" height="200"><path d="M729.32864 373.94944c-9.79456-5.94432-19.06176-6.784-19.14368-6.784l-1.06496-0.0512c-57.20064-3.8656-121.1648-5.83168-190.12608-5.83168l-13.98784 0.00512c-68.95616 0-132.92544 1.96096-190.12096 5.83168l-1.06496 0.0512c-0.08192 0-9.34912 0.83968-19.14368 6.784-15.04768 9.12896-24.27392 25.94816-27.4176 49.9712-10.07104 76.91264-4.38272 173.64992 0.18944 251.392 2.93888 49.96608 33.408 62.45888 85.04832 67.1488 10.78272 0.98816 69.08928 5.86752 159.50848 5.89312v-0.00512c90.4192-0.02048 148.72576-4.90496 159.5136-5.888 51.64032-4.68992 82.10944-17.18272 85.0432-67.1488 4.57728-77.74208 10.26048-174.47936 0.18944-251.392-3.1488-24.02816-12.37504-40.84736-27.42272-49.97632z m-390.9888 172.71808a23.64928 23.64928 0 0 1-31.68768-10.84416 23.68 23.68 0 0 1 10.84416-31.68768c2.03776-1.00352 50.69312-24.72448 110.5408-43.06432a23.68 23.68 0 1 1 13.88032 45.29152c-56.2944 17.24928-103.11168 40.07424-103.5776 40.30464z m268.89728 35.88608c-0.44032 2.23232-11.26912 54.64064-50.93888 54.64064-21.44256 0-36.10112-14.04928-44.98432-26.77248-8.69376 12.70784-22.80448 26.77248-42.65472 26.77248-35.5328 0-50.13504-48.26624-51.68128-53.77024a11.3664 11.3664 0 0 1 21.87776-6.1696c2.74944 9.6512 14.1312 37.20192 29.7984 37.20192 16.37376 0 28.89216-23.64416 31.98464-31.92832a11.37152 11.37152 0 0 1 10.6496-7.38816h0.06144c4.76672 0.03072 9.0112 3.02592 10.62912 7.50592 0.10752 0.28672 11.96544 31.81568 34.31424 31.81568 20.864 0 28.56448-35.95264 28.64128-36.32128a11.34592 11.34592 0 0 1 13.35808-8.93952 11.36128 11.36128 0 0 1 8.94464 13.35296z m110.11584-46.73536a23.68 23.68 0 0 1-31.68256 10.84416c-0.47104-0.2304-47.47264-23.1168-103.57248-40.30976a23.69024 23.69024 0 0 1-15.70816-29.58336 23.66976 23.66976 0 0 1 29.57824-15.70304c59.84768 18.33984 108.49792 42.0608 110.55104 43.06432a23.68 23.68 0 0 1 10.83392 31.68768z" fill="#2c2c2c" p-id="1668"></path><path d="M849.92 51.2H174.08c-67.8656 0-122.88 55.0144-122.88 122.88v675.84c0 67.87072 55.0144 122.88 122.88 122.88h675.84c67.87072 0 122.88-55.00928 122.88-122.88V174.08c0-67.86048-55.00928-122.88-122.88-122.88z m-36.60288 627.45088c-2.62656 44.57984-21.82144 78.63296-55.51616 98.48832-25.68192 15.13472-54.17472 19.48672-81.13664 21.9392-32.45568 2.94912-92.71808 6.09792-164.66432 6.1184-71.94112-0.02048-132.20864-3.16416-164.66432-6.1184-26.96192-2.45248-55.45472-6.80448-81.13152-21.9392-33.69472-19.85536-52.8896-53.90336-55.51104-98.4832-4.70528-80.13312-10.5728-179.85536 0.19456-262.10816C221.5424 335.16544 280.99072 311.57248 311.5008 310.37952a2482.64192 2482.64192 0 0 1 81.42336-4.08576c-7.53664-8.53504-19.88096-23.3216-28.81536-38.11328-13.73696-22.73792 8.52992-41.68704 8.52992-41.68704s23.68-20.36736 44.52864 5.21216c15.69792 19.26656 38.37952 55.99744 48.61952 72.95488l53.20704-0.21504c13.2608 0 26.33216 0.07168 39.2192 0.21504 10.24-16.95744 32.9216-53.6832 48.61952-72.95488 20.84352-25.57952 44.52864-5.21216 44.52864-5.21216s22.26176 18.94912 8.5248 41.68704c-8.9344 14.79168-21.27872 29.57824-28.81536 38.11328 28.35968 0.97792 55.56224 2.33984 81.42336 4.08064 30.5152 1.19808 89.9584 24.79104 100.61312 106.17344 10.7776 82.24768 4.9152 181.96992 0.20992 262.10304z" fill="#2c2c2c" p-id="1669"></path></svg>
            </a>
            <!--抖音-->
            <a href="https://www.douyin.com/" target="_blank" class="quick-links-box  svg-box">
              <svg t="1754289731200" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2109" width="200" height="200"><path d="M849.92 51.2H174.08c-67.8656 0-122.88 55.0144-122.88 122.88v675.84c0 67.8656 55.0144 122.88 122.88 122.88h675.84c67.8656 0 122.88-55.0144 122.88-122.88V174.08c0-67.8656-55.0144-122.88-122.88-122.88z m-75.0848 402.176c-4.9664 0.4608-10.00448 0.768-15.104 0.768-57.4208 0-107.87328-29.53216-137.23648-74.16832v252.55936c0 103.0912-83.57888 186.67008-186.66496 186.67008s-186.66496-83.57888-186.66496-186.67008c0-103.08608 83.57888-186.66496 186.66496-186.66496 3.89632 0 7.7056 0.34816 11.53536 0.5888v91.98592c-3.82976-0.4608-7.59296-1.16224-11.53536-1.16224-52.62848 0-95.27296 42.64448-95.27296 95.27296 0 52.62336 42.64448 95.26272 95.27296 95.26272 52.61824 0 99.0976-41.45664 99.0976-94.08512l0.9216-428.93824h87.91552c8.27392 78.61248 71.73632 140.65152 151.07072 146.34496V453.376z" p-id="2110" fill="#2c2c2c"></path></svg>
            </a>
            <!--youtube-->
            <a href="https://www.youtube.com/" target="_blank" class="quick-links-box  svg-box">
              <svg t="1754290011223" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2385" width="200" height="200"><path d="M620.9024 501.20704l-158.51008-105.6768c-8.64256-5.76512-20.20864 0.43008-20.20864 10.80832v211.33312c0 10.38848 11.56608 16.58368 20.20864 10.82368l158.51008-105.68192c7.71072-5.13024 7.71072-16.46592 0-21.6064z" fill="#2c2c2c" p-id="2386"></path><path d="M849.92 51.2H174.08c-67.8656 0-122.88 55.0144-122.88 122.88v675.84c0 67.8656 55.0144 122.88 122.88 122.88h675.84c67.8656 0 122.88-55.0144 122.88-122.88V174.08c0-67.8656-55.0144-122.88-122.88-122.88z m-44.51328 608.26112c-6.12352 31.27296-32.16896 55.11168-64.33792 59.58656-50.56 7.41888-134.84032 16.36352-229.82656 16.36352-93.46048 0-177.73568-8.94464-229.83168-16.36352-32.18432-4.47488-58.23488-28.30848-64.34816-59.58656C210.93376 625.19808 204.8 574.56128 204.8 512c0-62.55616 6.12864-113.19808 12.25216-147.456 6.13376-31.27296 32.17408-55.11168 64.35328-59.58656 50.56512-7.43424 134.8352-16.37376 229.82656-16.37376 94.99136 0 177.72032 8.93952 229.82656 16.37376 32.17408 4.47488 58.22976 28.3136 64.33792 59.58656C811.53536 398.80192 819.2 449.44384 819.2 512c-1.52064 62.56128-7.65952 113.19808-13.79328 147.46112z" fill="#2c2c2c" p-id="2387"></path></svg>
            </a>
            <!--facebook-->
            <a href="https://www.facebook.com/" target="_blank" class="quick-links-box  svg-box">
              <svg t="1754290159421" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2831" width="200" height="200"><path d="M849.92 51.2H174.08c-67.8656 0-122.88 55.0144-122.88 122.88v675.84c0 67.8656 55.0144 122.88 122.88 122.88h265.1904v-347.56608h-119.552v-127.0272h119.552V413.70112c0-139.9296 68.17792-201.344 184.47872-201.344 55.69536 0 85.17632 4.1216 99.10784 6.00576V329.216H643.5328c-49.36192 0-66.60096 46.79168-66.60096 99.56352v69.43232h144.70656l-19.6352 127.0272h-125.04576V972.8H849.92c67.8656 0 122.88-55.0144 122.88-122.88V174.08c0-67.8656-55.0144-122.88-122.88-122.88z" fill="#2c2c2c" p-id="2832"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.home-user-box-back {
  z-index: 2;
  box-sizing:  border-box;
  padding-top: 60px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.home-user-box{
  box-sizing: border-box;
  width: 600px;
  height: 350px;
  background-color: transparent;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}
.home-user-box img {
  width: 100%;
  height: 100%;
}
.home-user-box-text {
   position: relative;
   box-sizing: border-box;
   width: 100%;
   height: 100px;
   display: flex;
   align-items: center;
   flex-direction: column;
   border-radius: 15px;
   padding: 5px;
   gap: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
 }
.home-user-box-head {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(0) scale(1);
  transition: transform 0.8s ease;
}
.home-user-box-head img {
  transition:
      transform 0.8s ease,
      opacity 0.3s ease; /* 添加 opacity 过渡 */
}
.show-hide-box {
  position: absolute;
  z-index: 2;
  top: 70px;
  left: 10px;
}
.show-button {
  all:  unset;
  box-sizing: border-box;
  background-color: #ece9e9;
  border-radius: 15px;
  width: 80px;
  height: 25px;
  overflow: hidden;
  border: 3px solid #d4d4d4;
  cursor: pointer;
}
.show-button-ball {
  width: 20px;
  height: 20px;
  overflow: hidden;
  background-color: var(--show-button-ball) !important;
  border-radius: 50%;
  transform: translateX(0);
  transition: transform 0.3s ease, background 0.3s ease;
}
.now_time {
  position: absolute;
  top: -32px;
  box-sizing: border-box;
  padding: 2px;
  border-radius: 5px;
}
.quick-links {
  box-sizing: border-box;
  display:  flex;
  flex-direction: row;
  position: absolute;
  height: 30px;
  bottom: -35px;
  width:  auto;
  border-radius: 3px;
  transition: fill 0.3s ease;
  gap: 5px;
  padding: 0 3px;
  background-color: transparent;
}
.quick-links-box {
  height: 100%;
  width: 30px;
  cursor: pointer;
  position: relative;
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