<script setup lang="ts">
import {theme} from "../../func/themeChange";
import ArrowCircleDown20Regular from '@vicons/fluent/ArrowCircleDown20Regular'
const homeDown = () => {
  const targetPosition = window.scrollY + window.innerHeight;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div class="home-user">
    <div class="user-box" :style="{
      backgroundColor: theme === null ? 'rgba(255 ,255 ,255 ,0.5)' : 'rgba(16, 16, 20, 0.5)',
   }">
     <!--头像-->
     <div class="user-head-img">
       <img src="/header/124017298_p0.png" alt="头像" />
     </div>
      <!--名字-->
      <div class="user-name">FISHBREAD</div>
      <!--简介-->
     <div class="user-title">一个菜鸟的博客网站</div>
   </div>
    <!--到底部-->
    <n-icon @click="homeDown" size="40" class="home-down cursor-pointer" :style="{
      backgroundColor: theme === null ? 'rgba(255 ,255 ,255 ,0.5)' : 'rgba(16, 16, 20, 0.5)',
   }">
      <ArrowCircleDown20Regular></ArrowCircleDown20Regular>
    </n-icon>
  </div>
</template>

<style scoped>
.home-user {
  box-sizing: border-box;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  position: relative;
}
.user-box {
  box-sizing: border-box;
  width: 600px;
  height: 200px;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease;
  .user-name {
  font-size: 30px;
  font-weight: bold;
  }
  .user-title {
    font-size: 20px;
  }
  .user-head-img {
     width: 90px;
     height: 90px;
     border-radius: 50%;
     overflow: hidden;
    transition: all 0.3s ease;
     img {
       width: 100%;
       height: 100%;
     }
  }
  .user-head-img:hover {
    border-radius: 5px;
  }
}
@media (max-width: 600px) {
  .user-box {
    width: 300px;
  }
}
.home-down {
  box-sizing: border-box;
  position: absolute;
  z-index: 2;
  bottom: 10px;
  border-radius: 50%;
  overflow: hidden;
}
</style>