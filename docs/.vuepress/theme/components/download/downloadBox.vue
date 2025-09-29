<script setup lang="ts">
import {theme} from "../../func/themeChange";
import {AListInter} from "../../types/types";
defineProps<{
  aListProps: AListInter;
}>()
</script>

<template>
  <div class="download-big-box">
    <h1>{{ aListProps.title }}</h1>
    <div class="download-box" :style="{
      backgroundColor: theme === null ? '#f2f0f6' : '#332844',
    }">
      <div class="a-box" v-for="(item, index) in aListProps.linkArray" :key="index">
        <h2>{{ item.h2title }}</h2>
        <div class="a-box-link">
          {{ item.note }}
          <a :href="item.href" :download="item.href" :style="{
    '--a-after-back-color': theme === null ? '#101014' : '#ffffff'
  }">{{ item.hrefName }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.download-big-box {
  display: flex;
  flex-direction: column;
}
.download-box {
  box-sizing: border-box;
  width: 700px;
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  gap:10px;
  :root {
    --a-after-back-color: '#ffffff'
  }
  h2 {
    margin: 5px 0;
  }
  .a-box {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .a-box-link {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  a {
    position: relative;
    width: fit-content;
  }
  a::after {
    box-sizing: border-box;
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    height: 2px;
    width: 0;
    border-radius: 5px;
    transition: all 0.3s ease;
    background-color: var(--a-after-back-color);
  }
  a:hover::after {
    width: 100%;
  }
}
</style>