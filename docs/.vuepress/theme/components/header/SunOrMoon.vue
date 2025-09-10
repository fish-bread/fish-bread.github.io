<script setup lang="ts">
import {theme, whiteTheme} from "../../func/themeChange";
import WeatherSunny20Regular from '@vicons/fluent/WeatherSunny20Regular'
import WeatherMoon20Regular from '@vicons/fluent/WeatherMoon20Regular'
</script>

<template>
  <!--主题-->
  <div style="display: flex; align-items: center;">
    <!--白天-->
    <div style="display: flex; align-items: center;" @click="whiteTheme(true)" v-show="theme === null">
      <n-tooltip :show-arrow="false" trigger="hover">
        <template #trigger>
          <n-icon size="40" class="cursor-pointer">
            <WeatherSunny20Regular/>
          </n-icon>
        </template>
        日间模式
      </n-tooltip>
    </div>
    <!--夜晚-->
    <div style="display: flex; align-items: center;" @click="whiteTheme(false)" v-show="theme !== null">
      <n-tooltip  :show-arrow="false" trigger="hover">
        <template #trigger>
          <n-icon size="40" class="cursor-pointer">
            <WeatherMoon20Regular/>
          </n-icon>
        </template>
        夜晚模式
      </n-tooltip>
    </div>
  </div>
</template>

<style scoped>

</style>