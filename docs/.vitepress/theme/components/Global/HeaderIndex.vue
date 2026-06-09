<script setup lang="ts">
import {RouterOutFunc} from "../../Script/RouterFunc";
import {headerStyle} from "../../Script/HeaderTheme"
import HoverBeforeBox from "./HoverBeforeBox.vue";
const baseUrl = import.meta.env.VITE_BASE_URL
const handleClick = (url: string) => {
  return () => RouterOutFunc(url)
}
</script>

<template>
<nav class="header-component"  
     :style="{
      backgroundColor: headerStyle.backgroundColor,
      backdropFilter: headerStyle.backdropFilter
    }">
  <!--头部盒子-->
  <div class="header-component-box">
    <!--头部左边盒子-->
    <div class="header-component-box-minibox">
      <a class="header-component-box-minibox-a" :href="`${baseUrl}`">FISHBREAD</a>
      <!--头部分类盒子-->
      <div class="header-component-box-minibox-tab">
        <a :href="`${baseUrl}`" class="header-component-box-minibox-tab-a">首页</a>
        <a :href="`${baseUrl}/search/MarkdownSearchClassification`" class="header-component-box-minibox-tab-a">分类查询</a>
        <a :href="`${baseUrl}/search/MarkdownSearchTags`" class="header-component-box-minibox-tab-a">标签查询</a>
      </div>
    </div>
    <!--头部右边盒子-->
    <div class="header-component-box-minibox">
      <!--头部右边图标盒子-->
      <div class="header-component-box-minibox-icon">
        <HoverBeforeBox 
            :clickFunction="handleClick('https://github.com/fish-bread/fish-bread.github.io')"
            height="20"
            width="20"
            hoverText="github"
            IconBoxHeight="20"
            IconBoxWidth="20"
            translateWay="bottom"
        >
          <template v-slot>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6c-3.3.3-5.6-1.3-5.6-3.6c0-2 2.3-3.6 5.2-3.6c3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9c2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9c.3 2 2.9 3.3 5.9 2.6c2.9-.7 4.9-2.6 4.6-4.6c-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2c12.8 2.3 17.3-5.6 17.3-12.1c0-6.2-.3-40.4-.3-61.4c0 0-70 15-84.7-29.8c0 0-11.4-29.1-27.8-36.6c0 0-22.9-15.7 1.6-15.4c0 0 24.9 2 38.6 25.8c21.9 38.6 58.6 27.5 72.9 20.9c2.3-16 8.8-27.1 16-33.7c-55.9-6.2-112.3-14.3-112.3-110.5c0-27.5 7.6-41.3 23.6-58.9c-2.6-6.5-11.1-33.3 2.6-67.9c20.9-6.5 69 27 69 27c20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27c13.7 34.7 5.2 61.4 2.6 67.9c16 17.7 25.8 31.5 25.8 58.9c0 96.5-58.9 104.2-114.8 110.5c9.2 7.9 17 22.9 17 46.4c0 33.7-.3 75.4-.3 83.6c0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252C496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2c1.6 1.6 3.9 2.3 5.2 1c1.3-1 1-3.3-.7-5.2c-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9c1.6 1 3.6.7 4.3-.7c.7-1.3-.3-2.9-2.3-3.9c-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2c2.3 2.3 5.2 2.6 6.5 1c1.3-1.3.7-4.3-1.3-6.2c-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9c1.6 2.3 4.3 3.3 5.6 2.3c1.6-1.3 1.6-3.9 0-6.2c-1.4-2.3-4-3.3-5.6-2z" fill="currentColor"></path></svg>
          </template>
        </HoverBeforeBox>
        <HoverBeforeBox
            :clickFunction="handleClick('https://github.com/fish-bread/fish-bread.github.io')"
            height="20"
            width="20"
            hoverText="搜索"
            IconBoxHeight="20"
            IconBoxWidth="20"
            translateWay="bottom"
        >
          <template v-slot>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128c0-70.7 57.2-128 128-128c70.7 0 128 57.2 128 128c0 70.7-57.2 128-128 128z" fill="currentColor"></path></svg>
          </template>
        </HoverBeforeBox>
        
      </div>
    </div>
  </div>
</nav>
</template>

<style scoped lang="scss">
@mixin flex-between-center {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header-component {
  @include flex-between-center;
  position: fixed;
  width: 100%;
  height: 60px;
  padding: 5px 16px;
  z-index: 10;
}
.header-component-box {
  @include flex-between-center;
  justify-content: space-between;
  width: 100%;
  margin: 0 13vw;
  .header-component-box-minibox {
    @include flex-between-center;
    gap: 10px;
    
    .header-component-box-minibox-icon {
      @include flex-between-center;
      gap: 10px;
    }
    
    .header-component-box-minibox-tab {
      @include flex-between-center;
      gap: 10px;
      
    }
    .header-component-box-minibox-a {
      font-weight: bold;
      font-size: 30px;
    }
  }
}
</style>