<script setup>
import HomeIndex from "./Layout/HomeIndex.vue";
import NotFound from "./Layout/404.vue";
import Markdown from "./Layout/Markdown.vue";
import {useData} from "vitepress";
import MarkdownSearchClassification from "./Layout/MarkdownSearchClassification.vue";
import MarkdownSearchTags from "./Layout/markdownSearchTags.vue";
import MarkdownSearchTitle from "./Layout/MarkdownSearchTitle.vue";
const { page,frontmatter } = useData()
</script>

<template>
  <HomeIndex v-if="frontmatter.home === true" />
  <Markdown v-if="frontmatter.layout === 'markdown'" />
  <MarkdownSearchClassification v-if="frontmatter.layout === 'markdownSearchClassification'" />
  <MarkdownSearchTags v-if="frontmatter.layout === 'markdownSearchTags'" />
  <MarkdownSearchTitle  v-if="frontmatter.layout === 'markdownSearchTitle'"></MarkdownSearchTitle>
  <NotFound v-if="page.isNotFound" />
</template>