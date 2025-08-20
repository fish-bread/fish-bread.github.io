<script setup>
import {useDateTime} from "../func/useDateTime.js";
import {is_mobile} from "../func/clientchoose.js";
import {alpha_back_color, theme_change, themes} from "../func/newColor.js";
import {onMounted} from "vue";
const { data_time, greeting, data_season} = useDateTime()
onMounted(()=> {
  
})
</script>

<template>
  <div class="time-box" :style="{
    display: is_mobile === true ? 'none': 'flex',
  color: theme_change === 'light' ? themes.light.color : themes.dark.color, 
  backgroundColor: alpha_back_color,
  }">
    <div>欢迎访问本网站,{{ greeting }}</div>
    <!--显示大的本地时间-->
    <div class="big-time">{{ data_time.split(' ')[1] }}</div>
    <!--显示年月日及季节-->
    <div class="sm_time">{{ data_time.split(' ')[0].replace(/-/g, '/') }}&nbsp;{{ data_season }}</div>
  </div>
</template>

<style scoped>
.time-box {
  box-sizing: border-box;
  position: absolute;
  bottom: 10px;
  right: 10px;
  height: 130px;
  width: 400px;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
}
.big-time {
  height: 70px;
  font-size: 70px;
  display: flex;
  align-items: center;
}
</style>