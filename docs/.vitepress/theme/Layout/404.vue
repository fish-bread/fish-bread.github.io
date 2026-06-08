<script setup>
import BackgroundBox from "../components/Global/BackgroundBox.vue";
</script>

<template>
  <div class="home-page">
    <BackgroundBox />
    <div class="notfound-box">
      <h1>404</h1>
      <h2>页面找不到了喵,我们回家吧喵</h2>
      <a href="http://localhost:5173/">一键回家</a>
    </div>
  </div>
</template>

<style scoped lang="scss">
@mixin a-clear {
  text-decoration: none;
  color: inherit;
}
.home-page {
  width: 100%;
  height: 100vh;
}
.notfound-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  h1 {
    margin: 0;
  }
  h2 {
    margin: 0;
  }
  a {
    @include a-clear;
    padding: 5px;
    background-color: #b8a5c7;
    border-radius: 5px;
  }
}
</style>