<script setup lang="ts">
import {theme} from "../func/themeChange";
import { animate } from 'animejs'
import { Dismiss20Regular } from "@vicons/fluent"
import { watchThrottled } from "@vueuse/core";
import {onMounted} from "vue";
const isSidebar = defineModel()
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
        <div class="sidebarBox-head">
          <n-icon size="35" @click="isSidebar = !isSidebar" class="cursor-pointer">
            <Dismiss20Regular></Dismiss20Regular>
          </n-icon>
          <div class="logo-title">FISHBREAD</div>
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
}
</style>