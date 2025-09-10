<script setup lang="ts">
import SunOrMoon from './header/SunOrMoon.vue'
import {theme} from "../func/themeChange";
import { animate } from 'animejs'
import Dismiss20Regular from '@vicons/fluent/Dismiss20Regular'
import { watchThrottled } from "@vueuse/core";
import {onMounted, inject} from "vue";
import {headerListInter} from "../types/types";
const isSidebar = defineModel()
const buttonList:headerListInter[] = inject('buttonList')
onMounted(() => {
  const sidebarBox_anim = animate('.sidebarBox',{
    opacity: {to: [0,1]},
    x: { to: [-300, 0] },
    duration: 500,
    loop: 0,
    autoplay: false,
  })
  watchThrottled(
      () => isSidebar.value,
      (newSidebar) => {
        if (newSidebar) {
          sidebarBox_anim.restart()
          document.body.style.overflow = "hidden"
        }
        else {
          document.body.style.overflow = ""
        }
      },{immediate: true,throttle: 0}
  )
})
</script>

<template>
  <Transition>
    <div v-show="isSidebar" ref="sidebar" class="sidebarBack">
      <div class="sidebarBox" :style="{
        backgroundColor: theme === null ? '#ffffff' : '#101014',
      }">
        <!--头部-->
        <div class="sidebarBox-head">
          <n-icon size="35" @click="isSidebar = !isSidebar" class="cursor-pointer">
            <Dismiss20Regular></Dismiss20Regular>
          </n-icon>
          <div class="logo-title">FISHBREAD</div>
          <SunOrMoon/>
        </div>
        <!--内容-->
        <div class="sidebarBox-body">
          <!--个人头像及名字-->
          <div class="sidebar-user">
            <img src="/header/124017298_p0.png" alt="头像"/>
            <h2>FISHBREAD</h2>
          </div>
          <!--内容-->
          <div class="list-box">
            <router-link :to="item.href" class="cursor-pointer" v-for="(item, index) in buttonList" :key="index">{{ item.title }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
%display-flex-column {
   box-sizing: border-box;
   display: flex;
   flex-direction: column;
 }
%display-flex-row {
   box-sizing: border-box;
   display: flex;
   flex-direction: row;
 }
.sidebarBack {
  box-sizing: border-box;
  position: absolute;
  z-index: 10000;
  background-color: rgba(0,0,0,0.3);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.sidebarBox {
  @extend %display-flex-column;
  width: 300px;
  height: 100%;
  padding: 5px 10px 10px 10px;
  opacity: 0;
  gap: 5px;


}
.sidebarBox-head {
  @extend %display-flex-row;
  padding-left: 14px;
  align-items: center;
  gap: 5px;
  .logo-title {
    user-select: none;
    font-size: 30px;
    font-weight: bold;
  }
}
.sidebarBox-body {
  @extend %display-flex-column;
  align-items: center;
  gap: 5px;
  .sidebar-user {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  img {
    width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 50%;
    transition:  border-radius 0.3s ease;
  }
  img:hover {
    border-radius: 5px;
  }
  h2 {
    margin: 0;
    font-size: 25px;
  }
}
.list-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  gap: 10px;
}
</style>