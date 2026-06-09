<script setup lang="ts">
defineProps<{
  width: string
  height: string
}>()
</script>

<template>
  <div class="icon cursorPointer" :style="{
    width: `${width}px`,
    height: `${height}px`
  }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>