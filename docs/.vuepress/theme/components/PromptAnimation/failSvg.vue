<template>
  <svg class="error-svg" viewBox="0 0 100 100">
    <!-- 圆形背景 -->
    <circle class="circle-bg" cx="50" cy="50" r="45" />

    <!-- 加载圆圈 -->
    <circle
        class="loading-circle"
        cx="50"
        cy="50"
        r="45"
        stroke-dasharray="283"
        stroke-dashoffset="283"
    />

    <!-- X标记（初始隐藏） -->
    <path
        class="x-mark"
        d="M30,30 L70,70 M70,30 L30,70"
        fill="none"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue';
import { theme_change, themes } from '../../func/newColor.js'; // 请替换为实际路径

// 计算当前主题颜色
const currentColor = computed(() => {
  return theme_change.value === 'light'
      ? themes.value.light.color
      : themes.value.dark.color;
});
</script>

<style scoped>
.error-svg {
  width: 26px;
  height: 26px;
}

.circle-bg {
  fill: none;
  stroke: #e0e0e0;
  stroke-width: 4;
}

.loading-circle {
  fill: none;
  stroke: v-bind(currentColor);
  stroke-width: 4;
  stroke-linecap: round;
  transform-origin: 50% 50%;
  transform: rotate(-90deg);
  animation: loading 0.5s ease-in-out forwards;
}

.x-mark {
  stroke: v-bind(currentColor);
  stroke-width: 6;
  stroke-linecap: round;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: xmark 0.5s ease-in-out 0.5s forwards;
}

@keyframes loading {
  0% {
    stroke-dashoffset: 283;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes xmark {
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>