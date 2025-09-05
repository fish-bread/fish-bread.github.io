<script setup lang="ts">
import {theme} from "../../func/themeChange";
import {DiaryItem} from "../../types/types";
defineProps<{
  diaryList: DiaryItem[]
}>()
</script>

<template>
  <div class="home-show" :style="{
      backgroundColor: theme === null ? '#ffffff' : '#101014',
   }">
    <!--内容-->
    <div class="home-show-box-list">
      <!--盒子-->
      <RouterLink :to="item.path" v-for="(item, index) in diaryList" :key="index" class="home-show-box" :style="{
        backgroundColor: theme === null ? '#f2f0f6' : '#332844',
      }">
        <div class="home-show-box-h1">{{ item.frontmatter.title}}</div>
        <div class="home-show-box-h2">{{ item.frontmatter.description }}</div>
        <div class="home-show-box-data">fishbread&nbsp;原创&nbsp;{{ item.frontmatter.data }}</div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-show {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 25% 0 25%;
  transition: padding 0.3s ease;
}
@media (max-width: 600px) {
  .home-show {
    padding: 20px 0 0 0;
  }
}
.home-show-box-list {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.home-show-box {
  width: 100%;
  box-sizing: border-box;
  height: 160px;
  border-radius: 5px;
  overflow: hidden;
  background-color: #1F883D;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  .home-show-box-h1 {
    font-size: 30px;
    font-weight: bold;
  }
  .home-show-box-h2 {
    font-size: 14px;
    flex: 1;
    max-height: 70px;
    min-height: 70px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;    /* 限制最多显示3行 */
    overflow: hidden;
    text-overflow: ellipsis;  /* 可选，部分浏览器不生效 */
    word-break: break-word;
  }
}
</style>