<template>
  <svg class="success-svg" viewBox="0 0 100 100">
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

    <!-- 打勾标记（初始隐藏） -->
    <path
        class="checkmark"
        d="M20,50 L40,70 L80,30"
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
.success-svg {
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

.checkmark {
  stroke: v-bind(currentColor);
  stroke-width: 6;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: checkmark 0.5s ease-in-out 0.5s forwards;
}

@keyframes loading {
  0% {
    stroke-dashoffset: 283;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes checkmark {
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>