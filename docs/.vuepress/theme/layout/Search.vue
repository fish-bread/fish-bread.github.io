<script setup lang="ts">
import NaiveIndex from '../components/naiveIndex.vue'
import SearchComponents from '../components/search/SearchComponents.vue'
import {theme} from "../func/themeChange";
</script>

<template>
  <NaiveIndex :position="'absolute'">
    <div class="search-page" :style="{
             backgroundColor: theme === null ? '#ffffff' : '#101014',
    }">
      <div class="search-big-box">
        <div class="search-text" style="font-size: 70px; font-weight: bold">FISHBREAD</div>
        <SearchComponents/>
      </div>
    </div>
  </NaiveIndex>
</template>

<style scoped lang="scss">
.search-page {
  box-sizing: border-box;
  padding-top: 60px;
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.search-big-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>