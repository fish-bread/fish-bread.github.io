<script setup lang="ts">
import {theme} from "../../func/themeChange";
</script>

<template>
  <div class="about-page"  :style="{
    backgroundColor: theme === null ? '#ffffff' : '#101014'
  }">
    <div>
      <div class="about-title">关于</div>
      <div class="about-user-box" :style="{
      backgroundColor: theme === null ? '#f2f0f6' : '#332844',
    }">
        <!--头像-->
        <img src="/header/124017298_p0.png" alt=""/>
        <!--文字-->
        <div class="about-user-box-text">
          <h1 class="about-user-box-text-h1">fishbread</h1>
          <h2 class="about-user-box-text-h2">一个菜鸡前端爱好者</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about-page {
  display: flex;
  height: calc(100vh - 60px - 200px);
  flex-direction: column;
  align-items: center;
}
.about-user-box {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  width: 720px;
  height: 200px;
  border-radius: 10px;
  transition: width 0.3s ease;
}
@media (max-width: 720px) {
  .about-user-box {
    width: 500px;
  }
}
@media (max-width: 500px) {
  .about-user-box {
    width: 400px;
  }
}
img {
  box-sizing: border-box;
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 50%;
  transition: border-radius 0.3s ease;
  margin: 32px;
}
img:hover {
  border-radius: 5px;
}
h1 {
  font-size: 32px;
  font-weight: bold;
}
h2 {
  font-size: 18px;
}
.about-title {
  width: fit-content;
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>