<script setup lang="ts">
import {computedTheme, theme} from "../func/themeChange";
import FooterIndex from "./FooterIndex.vue";
import HeaderIndex from "./HeaderIndex.vue";
import {ClientOnly} from "@vuepress/client";
defineProps<{
  position: 'absolute' | 'fixed' | 'relative';
  darkColor?: string;
  lightColor?: string;
}>()

</script>

<template>
  <!--还未解决的ssr不友好-->
  <ClientOnly>
    <n-config-provider :theme="theme" :theme-overrides="computedTheme">
      <!--消息提示-->
      <n-message-provider>
        <!--内容-->
        <HeaderIndex :position-data="position" :darkColor="darkColor" :lightColor="lightColor"></HeaderIndex>
        <slot/>
        <FooterIndex></FooterIndex>
        <!--消息提示-->
      </n-message-provider>
      <!--返回顶部-->
      <n-back-top :right="30" :bottom="30" />
      <!--同步颜色-->
      <n-global-style />
    </n-config-provider>
  </ClientOnly>
</template>

<style scoped>

</style>