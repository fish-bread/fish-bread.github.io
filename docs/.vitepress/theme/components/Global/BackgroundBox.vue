<script setup lang="ts">

</script>

<template>
  <div class="home-page-background" />
</template>

<style scoped lang="scss">
.home-page-background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-image: url("/TianChen.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
}
</style>