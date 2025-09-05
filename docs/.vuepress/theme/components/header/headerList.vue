<script setup lang="ts">
defineProps<{
  button_list: [{ title: string; href: string }, { title: string; href: string }, { title: string; href: string }];
}>()
</script>
<template>
  <div class="list-box">
    <router-link :to="item.href" class="cursor-pointer" v-for="(item, index) in button_list" :key="index">{{ item.title }}</router-link>
  </div>
</template>

<style scoped>
.list-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  gap: 20px;
}
</style>