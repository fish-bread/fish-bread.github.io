<script setup lang="ts">
import NaiveIndex from "../components/naiveIndex.vue";
import DownloadIndex from "../components/download/downloadIndex.vue";
</script>

<template>
  <NaiveIndex :position="'relative'">
    <!--关于页面内容-->
    <DownloadIndex  />
  </NaiveIndex>
</template>

<style scoped>

</style>