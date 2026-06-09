<script setup lang="ts">
import IconBox from "./IconBox.vue";
import {boxIsFixedInterface} from "../../Script/other";

type translateWayType = 'left' | 'right' | 'bottom' | 'top'

const props = withDefaults(defineProps<{
  fixed?: boxIsFixedInterface
  isHide?: boolean
  clickFunction: () => void;
  IconBoxWidth: string;
  IconBoxHeight: string;
  width: string;
  height: string;
  hoverText: string;
  translateWay: translateWayType;
  backGround: boolean;
}>(), {
  isHide: true,
  fixed: () => ({
    isFixed: false,
    bottom: `0`,
    right: `0`
  })
})


</script>

<template>
  <transition name="fade">
    <div v-show="isHide" class="back-to-top cursorPointer"  
         :class="{ fixed: fixed.isFixed }" :style="{
      bottom: fixed.isFixed ? `${fixed.bottom}px` : 0,
      right: fixed.isFixed ? `${fixed.right}px` : 0,
      width:`${width}px`,
      height: `${height}px`,
      backgroundColor: backGround ? `#242424` : `transparent`
         }" @click="clickFunction">
      <IconBox :width="IconBoxWidth" :height="IconBoxHeight">
        <slot />
      </IconBox>

      <div :class="['hover-tooltip', translateWay]">
        {{ hoverText }}
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.back-to-top {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.back-to-top.fixed {
  position: fixed;
  z-index: 12;
}
.hover-tooltip {
  position: absolute;
  z-index: 11;
  padding: 6px 12px;
  background-color: var(--markDownMiniBackgroundColor);
  font-size: 12px;
  white-space: nowrap;
  border-radius: 4px;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

/* --- 上 (Top) --- */
.hover-tooltip.top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(0px); /* 初始位置紧贴元素 */
}
.back-to-top:hover .hover-tooltip.top {
  transform: translateX(-50%) translateY(-10px); /* 向上浮动 10px */
  opacity: 1;
  visibility: visible;
}

/* --- 下 (Bottom) --- */
.hover-tooltip.bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(0px);
}
.back-to-top:hover .hover-tooltip.bottom {
  transform: translateX(-50%) translateY(10px); /* 向下浮动 10px */
  opacity: 1;
  visibility: visible;
}

/* --- 左 (Left) --- */
.hover-tooltip.left {
  top: 50%;
  right: 100%;
  transform: translateY(-50%) translateX(0px);
}
.back-to-top:hover .hover-tooltip.left {
  transform: translateY(-50%) translateX(-10px); /* 向左浮动 10px */
  opacity: 1;
  visibility: visible;
}

/* --- 右 (Right) --- */
.hover-tooltip.right {
  top: 50%;
  left: 100%;
  transform: translateY(-50%) translateX(0px);
}
.back-to-top:hover .hover-tooltip.right {
  transform: translateY(-50%) translateX(10px); /* 向右浮动 10px */
  opacity: 1;
  visibility: visible;
}

/* Transition 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>