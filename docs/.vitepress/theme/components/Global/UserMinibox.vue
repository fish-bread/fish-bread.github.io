<script setup>
import userHeadImg from '/userHead.png';
</script>

<template>
  <div class="home-user-minibox">
    <img class="home-user-minibox-img" :src="userHeadImg" alt="头像"/>
    <h1>FISHBREAD</h1>
    <h3>fishbread的博客</h3>
    <h3>what can i say?</h3>
  </div>
</template>

<style scoped lang="scss">
@mixin flex-between-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home-user-minibox {
  @include flex-between-center;
  justify-content: space-between;
  width: 100%;
  height: 150px;
  padding: 10px 10px;
  border-radius: 10px;
  
  .home-user-minibox-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  
  h1 {
    margin: 0;
  }
  h3 {
    margin: 0;
  }
}
</style>