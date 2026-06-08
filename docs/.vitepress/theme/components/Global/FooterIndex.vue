<script setup>
import MoeCounter from "./moeCounter.vue";
</script>

<template>
  
  <div class="footer-page">
    <moe-counter></moe-counter>
    <div class="footer-box">
      <div>© Renovamen 2026</div>
      <div>Powered by VitePress & fishbread</div>
      </div>
  </div>
</template>

<style scoped>
.footer-page {
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  padding: 24px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}
.footer-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>