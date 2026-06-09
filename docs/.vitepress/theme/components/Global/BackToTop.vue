<script setup lang="ts">
import {computed, ComputedRef} from "vue";
import { useScroll } from '@vueuse/core'
import HoverBeforeBox from "./HoverBeforeBox.vue";
import {boxIsFixedInterface} from "../../Script/other";
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
const fixed: boxIsFixedInterface = {
  isFixed: true,
  bottom: `35`,
  right: `20`
}
</script>

<template>
  <HoverBeforeBox 
      :clickFunction="backToTop"
      width="42"
      height="42"
      IconBoxWidth="15"
      IconBoxHeight="15"
      :backGround="true"
      hoverText="返回顶部"
      translateWay="left"
      :isHide="backToTopHide"
      :fixed="fixed"
  >
    <template v-slot>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 320 512"><path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" fill="currentColor"></path></svg>
    </template>
  </HoverBeforeBox>
</template>

<style scoped lang="scss">

</style>