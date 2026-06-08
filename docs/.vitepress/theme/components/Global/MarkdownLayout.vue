<script setup lang="ts">
import HeaderIndex from "./HeaderIndex.vue";
import BackgroundBox from "./BackgroundBox.vue";
import FooterIndex from "./FooterIndex.vue";
import BackToTop from "./BackToTop.vue";
</script>

<template>
  <div class="home-page">
    <BackgroundBox />
    <HeaderIndex />
    <div class="markdown-body">
      <div class="markdown-body-head">
        <slot name="titleBox" />
      </div>
      <slot name="contentBox"/>
    </div>
    <BackToTop />
    <FooterIndex />
  </div>
</template>

<style scoped lang="scss">
.home-page {
  width: 100%;
  height: 100%;
}
.markdown-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 60px 0 0 0;
  .markdown-body-head {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
  }

}
</style>