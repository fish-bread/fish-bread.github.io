<script setup lang="ts">
import "../../styles/purple.css"
import "../../styles/markdown.css"
import {theme} from "../../func/themeChange";
import { useClientData } from '@vuepress/client'

const {
  pageFrontmatter,
} = useClientData()
console.log('页面', pageFrontmatter.value)
</script>

<template>
  <div class="markdown-body">
    <div class="markdown-header">
      <div class="home-show-box-h1">{{ pageFrontmatter.title}}</div>
      <div class="home-show-box-h2">{{ pageFrontmatter.description }}</div>
      <div class="home-show-box-data">fishbread&nbsp;原创&nbsp;{{ pageFrontmatter.data }}</div>
    </div>
    <Content class="content-markdown font_size" id="write" :style="{
    '--content-write-bg-color': theme === null ? '#ffffff' : '#101014',
    '--blockquote-bg-color': theme === null ? '#e7e7e7' : '#3e3e3e',
    '--vp-copy-code-button': theme === null ? '#e7e7e7' : '#3e3e3e',
    '--vp-copy-code-button-hover':theme === null ? '#f2f0f6' : '#332844',
  }" :data-theme="theme === null ? 'light' : 'dark'"/>
  </div>
</template>

<style scoped lang="scss">
.markdown-header {
    width: auto;
    box-sizing: border-box;
    height: 160px;
    border-radius: 5px;
    overflow: hidden;
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    .home-show-box-h1 {
      font-size: 30px;
      font-weight: bold;
      color: #8064a9;
    }
    .home-show-box-h2 {
      font-size: 18px;
      flex: 1;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;    /* 限制最多显示3行 */
      overflow: hidden;
      text-overflow: ellipsis;  /* 可选，部分浏览器不生效 */
      word-break: break-word;
    } 
  .home-show-box-data {
    font-weight: bold;
  }
}
.markdown-body {
  box-sizing: border-box;
  padding-top: 1px;
  transition: margin 0.3s ease, width 0.3s ease;
  margin: 0 20%;
}
@media (max-width:1200px ) {
  .markdown-body {
    margin: 0 20%;
  }
}
@media (max-width: 760px) {
  .markdown-body {
    margin: 0 5%;
  }
}
@media (max-width: 500px) {
  .markdown-body {
    margin: 0 0;
  }
}
</style>