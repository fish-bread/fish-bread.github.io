<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <!--标签和书签和日期通用-->
  <div class="home-page-markdown-minibox-bottom-tagsBox">
    <div style="font-weight: bold">{{ title }}:&nbsp</div>
    <div class="home-page-markdown-minibox-bottom-tags">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-page-markdown-minibox-bottom-tagsBox {
  display: flex;
  flex-direction: row;
  align-items: center;

  .home-page-markdown-minibox-bottom-tags {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
}
</style>