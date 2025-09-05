<script setup>
import NaiveIndex from '../components/naiveIndex.vue'
import HomeBox from "../components/home/homeBox.vue";
</script>

<template>
 <NaiveIndex :position="'absolute'" :dark-color="'rgba(16, 16, 20, 0.5)'" :light-color="'rgba(255 ,255 ,255 ,0.5)'">
   <!--home页面内容-->
   <HomeBox></HomeBox>
 </NaiveIndex>
</template>

<style scoped>

</style>