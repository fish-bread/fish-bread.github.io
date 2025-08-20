<script setup>
defineProps({
  setWidth: {
    type: String,
    required: true,
  },
  setHeight:{
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="sidebar-content-user-head" :style="{
    '--header-width': setWidth,
    '--header-height': setHeight
  }">
    <img src="/images/user_head/head_2.png" alt="">
  </div>
</template>

<style scoped>
:root {
  --header-height: 60px;
  --header-width: 60px;
}
.sidebar-content-user-head {
  height: var(--header-height);
  width: var(--header-width);
}
.sidebar-content-user-head img {
  border-radius: 50%;
  margin: 0;
  transition: border-radius 0.3s ease;
}
.sidebar-content-user-head:hover img {
  border-radius: 5px;
}
</style>