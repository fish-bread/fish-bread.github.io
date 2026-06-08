<script setup>
import BackgroundBox from "./BackgroundBox.vue";
import HeaderIndex from "./HeaderIndex.vue";
import FooterIndex from "./FooterIndex.vue";
import BackToTop from "./BackToTop.vue";
</script>

<template>
  <div class="home-page">
    <BackgroundBox />
    <div class="home-page-full">
      <HeaderIndex />
      <div class="home-page-homeText">
        <slot name="TitleBox" />
      </div>
    </div>
    <div class="home-page-list">
     <slot name="contentBox"/>
    </div>
    <BackToTop />
    <FooterIndex />
  </div>
</template>

<style scoped lang="scss">
@mixin flex-between-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home-page {
  width: 100%;
  height: 100%;
}
.home-page-full {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: transparent;
}

.home-page-homeText {
  @include flex-between-center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 60px 0 0 0;
}
.home-page-list {
  @include flex-between-center;
  gap: 10px;
  padding: 0 20%;
}
</style>