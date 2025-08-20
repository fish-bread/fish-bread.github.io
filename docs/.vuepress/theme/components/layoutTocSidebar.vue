<script setup>
import {ref, onMounted, nextTick} from 'vue'
import { useRoute } from 'vue-router'
import {watchThrottled} from "@vueuse/core";
import {is_mobile, is_toc_sidebar, toc_sidebar} from "../func/clientchoose.js";
const headings = ref([])
const props = defineProps({
  headerHeight: {
    type: String,
    required: true,
  }
})

const route = useRoute()

// 提取文档标题
const extractHeadings = () => {
  const article = document.querySelector('.markdown-body')
  if (!article) return []

  return Array.from(article.querySelectorAll('h1, h2, h3'))
      .filter(el => el.id) // 只选择有id的标题
      .map(el => ({
        id: el.id,
        text: el.textContent,
        level: parseInt(el.tagName.substring(1))
      }))
}

// 滚动到对应标题（考虑header高度）
const scrollToHeading = (id) => {
  const heading = document.getElementById(id)
  if (heading) {
    const offset = parseFloat(props.headerHeight) || 60
    const offsetPx = `${offset}px`
    const elementPosition = heading.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

// 监听路由变化和DOM更新
onMounted(() => {
  headings.value = extractHeadings()
  //监听路由
  watchThrottled(() => route.path, () => {
    // 等待DOM更新完成
    nextTick()
    headings.value = extractHeadings()
  }, {
    immediate: true,throttle: 300,
  })
})


</script>

<template>
  <transition>
    <div v-show="is_toc_sidebar" ref="toc_sidebar" class="toc-sidebar" :class="{'toc-sidebar-mobile': is_mobile}" >
      <div class="toc-title">目录</div>
      <ul class="toc-list">
        <li
            v-for="heading in headings"
            :key="heading.id"
            :class="`toc-item toc-level-${heading.level}`"
            @click="scrollToHeading(heading.id)"
        >
          {{ heading.text }}
        </li>
      </ul>
    </div>
  </transition>
</template>

<style scoped>
.toc-sidebar-mobile {
  display: none;
}
.toc-sidebar {
  position: fixed;
  box-sizing: border-box;
  overflow-y: auto;
  padding: 10px 10px 10px 10px;
  background: var(--toc-bg, transparent);
  border-radius: 4px;
  /*border-left: solid 1px #2c2c2c;*/
  min-width: 300px;
  height: 100%;
  right: 0;
}

.toc-title {
  font-weight: bold;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #2c2c2c;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  padding: 5px 0;
  transition: all 0.2s;
}

.toc-item:hover {
  color: var(--toc-hover-color, #42b983);
}

.toc-level-1 {
  font-weight: bold;
  padding-left: 0;
}

.toc-level-2 {
  padding-left: 15px;
  font-size: 0.9em;
}

.toc-level-3 {
  padding-left: 30px;
  font-size: 0.85em;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>