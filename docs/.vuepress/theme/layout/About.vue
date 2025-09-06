<script setup lang="ts">
import NaiveIndex from "../components/naiveIndex.vue";
import AboutBox from "../components/about/AboutBox.vue";
</script>

<template>
  <NaiveIndex :position="'relative'">
    <!--关于页面内容-->
    <AboutBox/>
  </NaiveIndex>
</template>

<style scoped>

</style>