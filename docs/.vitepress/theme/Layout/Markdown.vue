<script setup lang="ts">
import MarkdownMinibox from "../components/Markdown/MarkdownMinibox.vue";
import { useData } from 'vitepress'
import {MarkdownListInterface} from "../Script/Markdown";
import {onMounted, ref, Ref} from "vue";
import MarkdownLayout from "../components/Global/MarkdownLayout.vue";
const { frontmatter, page } = useData()
const headings = ref<HTMLHeadingElement[]>([])
const markdownList: Ref<MarkdownListInterface[]> = ref([{
  title: '无标题',
  titleBackground: null,
  description: '无文本摘要',
  tags: [],
  Category: '网页',
  writtenDate: '无日期',
  updatedDate: '无日期',
  url: 'http://localhost:5173/404'
}])
onMounted(() => {
  markdownList.value[0].title = frontmatter.value.title || '无标题'
  markdownList.value[0].titleBackground = frontmatter.value.titleBackground || null
  markdownList.value[0].description = frontmatter.value.description || '无文本摘要'
  markdownList.value[0].tags = frontmatter.value.tags || []
  markdownList.value[0].Category  = frontmatter.value.category || '网页'
  markdownList.value[0].updatedDate = frontmatter.value.updatedDate || '无日期'
  markdownList.value[0].writtenDate = frontmatter.value.writtenDate ||  '无日期'
  markdownList.value[0].url = `http://localhost:5173/${page.value.relativePath.replace(/\.md$/, '')}`   || 'http://localhost:5173/404'
  //识别列表
  const elements = document.querySelectorAll('h1')
  headings.value = Array.prototype.slice.call(elements)
  console.log(headings.value)
})
const scrollToHeading = (element: HTMLElement) => {
  const elementPosition = element.getBoundingClientRect().top + window.scrollY
  const offsetPosition = elementPosition - 60

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}
</script>

<template>
  <MarkdownLayout>
    <template v-slot:titleBox>
      <div class="markdown-body-head-h1">FISHBREAD的博客</div>
    </template>
    <template v-slot:contentBox>
      <div class="markdown-body-all">
        <!--导航-->
        <div class="markdown-body-Sidebar" >
          <div @click="scrollToHeading(item)" v-for="(item, index) in headings" :key="index" class="cursorPointer">{{item.innerText}}</div>
        </div>
        <!--正文-->
        <div class="markdown-body-text">
          <MarkdownMinibox :markdownList="markdownList" :isTransparent="true" :isOne="true"/>
          <main class="vp-doc" >
            <Content />
          </main>
        </div>
      </div>
    </template>
  </MarkdownLayout>
</template>

<style scoped lang="scss">
.markdown-body-head-h1 {
  font-weight: bold;
  font-size: 30px;
}

.markdown-body-all {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 20% 0 20%;
  border-radius: 10px;
  gap: 20px;
}

.markdown-body-Sidebar {
  position: sticky;
  top: 80px;
  display: flex;
  flex-direction: column;
  width: 240px;
  padding: 10px;
  flex-shrink: 0;
  border-radius: 10px;
  align-self: flex-start;
  gap: 10px;
  background-color: var(--markDownMiniBackgroundColor)
}

.markdown-body-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: var(--markDownMiniBackgroundColor)
}
.vp-doc {
  margin: 0;
  width: 100%;
}

</style>