<script setup>
//markdown样式表
//import '../styles/github-markdown.css'
import '../styles/spring.css'
import { markdown_body, markdown_box, is_mobile } from "../func/clientchoose.js"
import {themes, theme_change, calculateHoverColor} from "../func/newColor.js";
import {nextTick, onMounted, watch, watchEffect} from "vue";
import {headerHeight,} from "../func/bigHeader.js";
import TocSidebar from "./TocSidebar.vue";
import {watchThrottled} from "@vueuse/core";
import {useRoute} from "vue-router";  
const route = useRoute()
// 提取标题和添加类名的函数
const extractHeadingsAndAddClasses = () => {
  nextTick(() => {
    const allElements = document.querySelectorAll('li');
    allElements.forEach(element => {
      element.classList.add('md-list-item', 'mark');
    });
    const markdown = document.querySelector('.markdown-body');
    if (markdown) {
      markdown.setAttribute('id', 'write');
    }
  });
};
onMounted(() => {
  //监听shiki样式
  watchEffect(() => {
    document.documentElement.setAttribute('data-theme', theme_change.value);
  });
  extractHeadingsAndAddClasses();
  // 监听路由变化
  watch(
      () => route.path,
      () => {
        extractHeadingsAndAddClasses();
      },
      { immediate: true }
  );

// 监听 hash 变化（比如锚点跳转）
  watch(
      () => route.hash,
      () => {
        extractHeadingsAndAddClasses();
      }
  );
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
      '--p-hover-bg-color': theme_change === 'light' ? calculateHoverColor(themes.light.theme_color,0.1) : calculateHoverColor(themes.dark.back_color,0.15),
      '--write-h1-before-bg': theme_change === 'light' 
      ? `linear-gradient(90deg, rgba(152, 251, 152, 0), ${calculateHoverColor(themes.light.theme_color,0.1)}, rgba(152, 251, 152, 0))`
      : `linear-gradient(90deg, rgba(152, 251, 152, 0), ${calculateHoverColor(themes.dark.theme_color,0.1)}, rgba(152, 251, 152, 0))`,
    '--write-h2-after-bg': theme_change === 'light' 
      ? `linear-gradient(90deg, rgba(106, 158, 69, 0), ${themes.light.hover_color}, rgba(106, 158, 69, 0))`
      : `linear-gradient(90deg, rgba(106, 158, 69, 0), ${themes.dark.hover_color}, rgba(106, 158, 69, 0))`,
       '--hr-bg-image': theme_change === 'light' 
     ? `linear-gradient(90deg, ${themes.light.theme_color}, ${themes.light.hover_color}, ${themes.light.theme_color})`
     : `linear-gradient(90deg, ${themes.dark.theme_color}, ${themes.dark.hover_color}, ${themes.dark.theme_color})`,
     '--ul-marker-color': theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
     '--ol-hover-marker-color':theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
     '--mark-bg-color':theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
     '--mark-hover-bg-color':theme_change === 'light' ? themes.light.hover_color : themes.dark.hover_color,
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