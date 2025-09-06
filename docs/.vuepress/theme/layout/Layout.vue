`<script setup lang="ts">
import NaiveIndex from "../components/naiveIndex.vue";
import MarkdownContent from "../components/markdown/MarkdownContent.vue";
import MarkdownList from "../components/markdown/MarkdownList.vue";
import {theme} from "../func/themeChange.js";
import {onMounted, ref,nextTick} from "vue";
import {useWindowSize, watchThrottled, useScroll} from "@vueuse/core";
interface TocItem {
  id: string;
  text: string;
  tag: string;
  level: number;
}
// 目录列表
const tocList = ref<TocItem[]>([]);
const isList = ref<boolean>(true)
const listTop = ref<number>(80)
// 生成目录函数
const generateToc = () => {
  const markdown = document.getElementById('write')
  // 获取所有 h1-h6 标题元素
  const headings = markdown.querySelectorAll('h1, h2, h3, h4, h5, h6');
  // 清空现有目录
  tocList.value = [];
  console.log('头',headings);
  // 遍历标题元素，提取信息
  headings.forEach((heading) => {
    // 确保标题有 ID（如果没有，可以在此处创建）
    if (!heading.id) {
      // 可以根据文本内容生成一个 ID
      heading.id = heading.textContent?.toLowerCase().replace(/\s+/g, '-') || `heading-${Math.random().toString(36).substr(2, 9)}`;
    }
    tocList.value.push({
      id: heading.id,
      text: heading.textContent || '',
      tag: heading.tagName.toLowerCase(),
      level: parseInt(heading.tagName.substring(1))
    });
  });
  console.log('列表',tocList.value);
};
onMounted(async () => {
  await nextTick()
  generateToc()
  const { width } = useWindowSize()
  const { y } = useScroll(window)
  watchThrottled(
      ()=> width.value,
      (newVal) => {
        isList.value = newVal >= 1400;
      }, {immediate: true, throttle: 100}
  )
  watchThrottled(
      () => y.value,
      (newVal) => {
        if (newVal > 60) {
          listTop.value = 0
        }
        else {
          listTop.value = 60
        }
      }, {immediate: true, throttle: 100}
  )
})
</script>

<template>
  <NaiveIndex :position="'relative'">
    <div class="container-page" :style="{
      backgroundColor: theme === null ? '#ffffff' : '#101014',
    }">
      <MarkdownContent/>
      <MarkdownList :tocList="tocList" :isList="isList" :listTop="listTop" />
    </div>
  </NaiveIndex>
</template>

<style scoped>
.container-page {
  box-sizing: border-box;
}
</style>`