<script setup>
import { markdown_body, markdown_box, is_mobile } from "../func/clientchoose.js"
import { themes, theme_change } from "../func/newColor.js";
import {onMounted, watchEffect} from "vue";
onMounted(() => {
  //监听shiki样式
  watchEffect(() => {
    document.documentElement.setAttribute('data-theme', theme_change.value);
  });
})
</script>

<template>
  <div ref="markdown_box" class="markdown-box" >
    <div ref="markdown_body" class="markdown" :class="{'markdown_mobile': is_mobile }">
      <Content class="markdown-body font_size" style="background-color: transparent" 
               :style="{
        '--fgColor-default': theme_change === 'light' ? themes.light.color : themes.dark.color, 
        '--fgColor-accent': theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color, 
        '--vp-copy-code-button' : theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
        '--vp-copy-code-button-hover':  theme_change === 'light' ? themes.light.hover_color : themes.dark.hover_color,
        '--bgColor-muted': theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
        '--code-title-back': theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
      }"></Content>
    </div>
  </div>
</template>

<style scoped>
.markdown-box {
  box-sizing:  border-box;
  padding: 240px 0 0 300px;
  display: flex;
  flex-direction: row;
  transition: padding 0.5s ease;
}
.markdown {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0 20% 150px 20%;
  background-color: transparent;
}
.markdown_mobile {
  padding: 0 0 150px 10px !important;
  width: 95% !important;
}
</style>