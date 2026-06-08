<script setup lang="ts">
import MarkdownLayout from "../../components/Global/MarkdownLayout.vue";
import MarkdownMinibox from "../../components/Markdown/MarkdownMinibox.vue";
import {MarkdownListInterface } from "../../Script/Markdown";
import BackToTop from "./BackToTop.vue";

defineProps<{
  title: string,
  markdownChooseList: MarkdownListInterface[],
}>()
</script>

<template>
  <MarkdownLayout>
    <template v-slot:titleBox>
      <div class="markdown-body-head-h1">博客文章总览</div>
    </template>
    <template v-slot:contentBox>

      <div class="markdown-body-content" >
        <div class="markdown-body-content-box" :style="{
          backgroundColor: `var(--markDownMiniBackgroundColor)`,
          backdropFilter: `blur(10px)`
        }">
          <h1>
            按{{ title }}查询
          </h1>
          <slot name="content" />
        </div>
        <MarkdownMinibox v-if="markdownChooseList.length > 0" :isOne="false" :isTransparent="false" :markdownList="markdownChooseList" />
        <h2 class="search-result" v-else>没有查询到!</h2>
      </div>
    </template>
    <BackToTop />
  </MarkdownLayout>
</template>

<style scoped lang="scss">
.markdown-body-head-h1 {
  font-weight: bold;
  font-size: 30px;
}
.markdown-body-content {
  display: flex;
  flex-direction: column;
  margin: 0 20% 0 20%;
  width: 60%;
  border-radius: 10px;
  gap: 20px;

  .markdown-body-content-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    padding: 10px;
    gap: 10px;
    h1 {
      margin: 0;
    }
  }
  
  .search-result {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0;
  }
}
</style>