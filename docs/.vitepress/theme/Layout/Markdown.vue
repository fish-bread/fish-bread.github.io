<script setup lang="ts">
import MarkdownMinibox from "../components/Markdown/MarkdownMinibox.vue";
import { useData } from 'vitepress'
import {MarkdownListInterface} from "../Script/Markdown";
import {onMounted, onUnmounted, ref, Ref} from "vue";
import MarkdownLayout from "../components/Global/MarkdownLayout.vue";

const { frontmatter, page } = useData()
const headings = ref<HTMLHeadingElement[]>([])
const activeHeadingId = ref<string>('') // 当前活跃的标题文本
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

const daysDiff = ref<{
  days: number
  timeString: string
}>({
  days: 0,
  timeString: "",
})
//目录变色
let observer: IntersectionObserver | null = null
const setupIntersectionObserver = (element: NodeListOf<Element>) => {

  observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activeHeadingId.value = entry.target.textContent || ''
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px', // 调整触发位置
        threshold: 0
      }
  )

  element.forEach(heading => {
    observer?.observe(heading)
  })
}

onMounted(() => {
  markdownList.value[0].title = frontmatter.value.title || '无标题'
  markdownList.value[0].titleBackground = frontmatter.value.titleBackground || null
  markdownList.value[0].description = frontmatter.value.description || '无文本摘要'
  markdownList.value[0].tags = frontmatter.value.tags || []
  markdownList.value[0].Category = frontmatter.value.category || '网页'
  markdownList.value[0].updatedDate = frontmatter.value.updatedDate || '无日期'
  markdownList.value[0].writtenDate = frontmatter.value.writtenDate || '无日期'
  markdownList.value[0].url = `http://localhost:5173/${page.value.relativePath.replace(/\.md$/, '')}` || 'http://localhost:5173/404'

  //识别列表
  const elements = document.querySelectorAll('h1')
  headings.value = Array.prototype.slice.call(elements)

  //目录变色
  setupIntersectionObserver(elements)

  //检测文章时效性
  const updatedDateStr = frontmatter.value.updatedDate
  if (updatedDateStr && updatedDateStr !== '无日期') {
    const formattedDate = updatedDateStr.replace(/\//g, '-')
    const updatedDate = new Date(formattedDate)
    const now = new Date()
    const timeDiff = now.getTime() - updatedDate.getTime()
    daysDiff.value.days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

    if (daysDiff.value.days < 7) {
      daysDiff.value.timeString = '最近一周内'
    } else if (daysDiff.value.days < 30) {
      daysDiff.value.timeString = '最近一个月内'
    } else if (daysDiff.value.days < 60) {
      daysDiff.value.timeString = '超过一个月'
    } else if (daysDiff.value.days < 90) {
      daysDiff.value.timeString = '超过两个月'
    } else if (daysDiff.value.days < 180) {
      daysDiff.value.timeString = '近半年'
    } else if (daysDiff.value.days < 365) {
      daysDiff.value.timeString = '超过半年'
    } else {
      daysDiff.value.timeString = '超过一年'
    }
  }
})

onUnmounted(() => {
  // 清理 observer
  if (observer) {
    observer.disconnect()
  }
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
          <div>目录:</div>
          <div
              @click="scrollToHeading(item)"
              v-for="(item, index) in headings"
              :key="index"
              class="cursorPointer"
              :class="{ 'active-heading': activeHeadingId === item.innerText }"
          >
            {{item.innerText}}
          </div>
        </div>
        <!--正文-->
        <div class="markdown-body-text">
          <div v-if="daysDiff.days >= 15" class="update-time-text">
            文章最后更新于 {{daysDiff.days}} 天前,请注意时效性({{daysDiff.timeString}})
          </div>
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
  margin: 0 15% 0 15%;
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
  background-color: var(--markDownMiniBackgroundColor);

  .cursorPointer {
    cursor: pointer;
    padding: 5px 10px;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
    &:hover {
      color: var(--primaryColor);
    }

    // 活跃状态样式
    &.active-heading {
      color: var(--primaryColor);
      border-left: 3px solid var(--primaryColor);
      font-weight: bold;
    }
  }
}

.markdown-body-text {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: var(--markDownMiniBackgroundColor);

  .update-time-text {
    position: absolute;
    top: 5px;
    left: 5px;
    color: #cf1322;
  }
}

.vp-doc {
  margin: 0;
  width: 100%;
}
</style>