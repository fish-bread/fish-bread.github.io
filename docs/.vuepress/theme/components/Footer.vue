<script setup>
import {themes, theme_change} from "../func/newColor.js";
import MoeCounter from "./anime/moeCounter.vue";
</script>

<template>
  
  <div class="footer" :style="{
  color: theme_change === 'light' ? themes.light.color : themes.dark.color,
  backgroundColor: theme_change === 'light' ? themes.light.back_color : themes.dark.back_color,
  }">
    <moe-counter></moe-counter>
    <div class="footer-box">
      <div>© Renovamen 2025</div>
      <div>Powered by VuePress & fishbread</div>
      </div>
  </div>
</template>

<style scoped>
.footer {
  box-sizing: border-box;
  background-color: white;
  width: 100%;
  height: 200px;
  padding: 24px 40px;
  /*box-shadow: 0 0 10px 0 rgba(0,0,0,0.4);*/
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease, color 0.3s ease;
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