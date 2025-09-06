<script setup lang="ts">
import {computed, onMounted} from "vue";
import { useMessage } from 'naive-ui'
import UserBox from './userBox.vue'
import HomeShow from './homeShow.vue'
onMounted(() => {
  const message = useMessage()
  message.success('欢迎回来,fishbread')
})
import { usePages } from '../../../.temp/posts'
const pages = usePages()
const sortedAndLimitedDiaryList = computed(() => {
  // 首先对数组进行排序：按日期降序（最新的在前）
  const sorted = [...pages].sort((a, b) => {
    // 假设 item.frontmatter.data 是日期字符串或时间戳
    // 确保你的日期格式可以被正确解析，这里使用 new Date 进行转换比较
    return new Date(b.frontmatter.data).getTime() - new Date(a.frontmatter.data).getTime();
  });
  console.log('文档',sorted)
  // 然后使用 slice 方法取前5项
  return sorted.slice(0, 5);
});
</script>

<template>
  <!--背景-->
  <div class="home-back"/>
  <div class="home-box">
    <!--个人简介-->
    <UserBox></UserBox>
    <!--展示-->
    <HomeShow :diaryList="sortedAndLimitedDiaryList"></HomeShow>
  </div>
</template>

<style scoped lang="scss">
.home-box {
  box-sizing: border-box;
  padding-top: 60px; 
  position: relative;
}
.home-back {
  height: 100vh;
  width: 100vw;
  background: url(/background/4.png) no-repeat center center;
  background-size: cover;
  position: fixed;
  z-index: -1;
}
</style>