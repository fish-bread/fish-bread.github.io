<script setup lang="ts">
import MarkdownMinibox from "../components/Markdown/MarkdownMinibox.vue";
import UserMinibox from "../components/Global/UserMinibox.vue";
import {data as markdownList} from '../Script/Markdown.data';
import HomeIndexLayout from "../components/Global/HomeIndexLayout.vue";
</script>

<template>
  <HomeIndexLayout>
    <template v-slot:TitleBox>
      <UserMinibox />
    </template>
    <template v-slot:contentBox>
      <MarkdownMinibox :isTransparent="false" :isOne="false" :markdownList="markdownList"/>
    </template>
  </HomeIndexLayout>
</template>

<style scoped lang="scss">
</style>