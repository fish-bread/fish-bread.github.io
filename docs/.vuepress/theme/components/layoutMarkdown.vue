<script setup>
import { markdown_body, markdown_box, is_mobile } from "../func/clientchoose.js"
import { themes, theme_change } from "../func/newColor.js";
import {onMounted, watchEffect} from "vue";
import {headerHeight,} from "../func/bigHeader.js";
import TocSidebar from "./TocSidebar.vue";  

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
      <Content class="markdown-body font_size" 
               :style="{
         '--header-height': headerHeight,
       '--a-hover-color': theme_change === 'light' ? themes.light.hover_color : themes.dark.hover_color,
       '--a-color': theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
       '--strong-color': theme_change === 'light' ? themes.light.hover_color : themes.dark.hover_color,
       '--vp-copy-code-button': theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
       '--vp-copy-code-button-hover': theme_change === 'light' ? themes.light.hover_color : themes.dark.hover_color,
       '--blockquote-bg-color': theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
       '--blockquote-border-color': theme_change === 'light' ? themes.light.hover_color : themes.dark.hover_color,
       '--blockquote-hover-border-color': theme_change === 'light' ? themes.light.hover_color : themes.dark.hover_color,
      }"></Content>
    </div>
    <!--新增的目录侧边栏-->
    <toc-sidebar :header-height="headerHeight"
        :style="{
      '--toc-bg': theme_change === 'light' ? themes.light.back_color : themes.dark.back_color,
      '--toc-hover-color': theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
    }"></toc-sidebar>
  </div>
</template>

<style scoped>
.markdown-box {
  box-sizing:  border-box;
  padding: 240px 0 0 300px;
  transition: padding 0.5s ease;
}
.markdown-body :target::before {
  content: "";
  display: block;
  height: var(--header-height); /* 与header高度相同 */
  margin-top: calc(-1 * var(--header-height));/* 负值向上偏移 */
  visibility: hidden;
  pointer-events: none;
  transition: height 0.3s ease, margin-top 0.3s ease;
}
.markdown {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 80px 20% 150px 20%;
  background-color: transparent;
  overflow: hidden;
}
.markdown_mobile {
  padding: 0 0 150px 10px !important;
  width: 95% !important;
}
</style>