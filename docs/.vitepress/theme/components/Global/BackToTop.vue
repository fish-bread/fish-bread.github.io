<script setup lang="ts">
import {computed, ComputedRef} from "vue";
import { useScroll } from '@vueuse/core'
import IconBox from "./iconBox.vue";
//验证只在浏览器渲染
const isClient = typeof window !== 'undefined'

const {y} = useScroll(isClient ? window : undefined)
const backToTop = (): void => {
  if (isClient) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
const backToTopHide: ComputedRef<boolean> = computed(() => {
  return y.value !== 0;
})
</script>

<template>
  <transition name="fade">
    <div v-show="backToTopHide" class="back-to-top cursorPointer" @click="backToTop">
      <IconBox width="15" height="15">
        <template v-slot>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 320 512"><path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" fill="currentColor"></path></svg>
        </template>
      </IconBox>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.back-to-top {
  position: fixed;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 35px;
  right: 20px;
  width: 42px;
  height: 42px;
  border-radius: 5px;
  background-color: var(--markDownMiniBackgroundColor);
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--primaryColor);
  }
  &::before {
    content: '返回顶部';
    position: absolute;
    z-index: 1;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 6px 12px;
    background-color: var(--markDownMiniBackgroundColor);
    font-size: 12px;
    white-space: nowrap;
    border-radius: 4px;
    pointer-events: none;
    width: 40px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, right 0.3s ease, visibility 0s linear 0.3s;
  }
  &:hover::before {
    opacity: 1;
    right: 52px;
    visibility: visible;
    transition: opacity 0.3s ease, right 0.3s ease, visibility 0s linear 0s;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>