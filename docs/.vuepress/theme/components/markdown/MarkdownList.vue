<script setup lang="ts">
interface TocItem {
  id: string;
  text: string;
  tag: string;
  level: number;
}

import { ref, onMounted, onUnmounted, watch } from "vue";

const activeIndex = ref(0);
let observer: IntersectionObserver | null = null;

const props = defineProps<{
  tocList: TocItem[];
  isList: boolean;
  listTop: number;
}>();

const scrollToAnchor = (id: string, index: number) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    activeIndex.value = index;
  }
};

// 检测是否滚动到底部
const checkIfBottom = () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;
  const threshold = 50; // 距离底部的阈值

  if (scrollPosition >= pageHeight - threshold) {
    activeIndex.value = props.tocList.length - 1;
  }
};

// 设置 Intersection Observer
const setupObserver = () => {
  // 先清除旧的 observer
  if (observer) {
    observer.disconnect();
    observer = null;
  }

  // 如果没有目录项，直接返回
  if (props.tocList.length === 0) return;

  const options = {
    root: null,
    rootMargin: '-30px 0px -90% 0px',
    threshold: 0
  };

  observer = new IntersectionObserver((entries) => {
    // 找出所有进入观察区域的条目
    const visibleEntries = entries.filter(entry => entry.isIntersecting);

    if (visibleEntries.length > 0) {
      // 找出最接近顶部的条目
      const closestEntry = visibleEntries.reduce((prev, current) =>
          current.boundingClientRect.top < prev.boundingClientRect.top ? current : prev
      );

      const id = closestEntry.target.id;
      const index = props.tocList.findIndex(item => item.id === id);
      if (index !== -1) {
        activeIndex.value = index;
      }
    }

    // 每次滚动时都检查是否到达底部
    checkIfBottom();
  }, options);

  // 观察所有标题元素
  props.tocList.forEach(item => {
    const element = document.getElementById(item.id);
    if (element) observer?.observe(element);
  });
};

// 监听 tocList 变化，重新设置 observer
watch(() => props.tocList, () => {
  setupObserver();
}, { deep: true });

onMounted(() => {
  setupObserver();
  window.addEventListener('scroll', checkIfBottom);
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
  window.removeEventListener('scroll', checkIfBottom);
});
</script>

<template>
  <div v-show="isList" class="markdown-list" :style="{ top: listTop + 'px' }">
    <div class="markdown-list-header">
      <span class="header-icon">📋</span>
      <span>目录</span>
    </div>
    <ul class="markdown-list-body">
      <li
          v-for="(item, index) in tocList"
          :key="index"
          :class="['toc-item', 'header-' + item.tag, { active: activeIndex === index }]"
          :style="{ paddingLeft: `${(item.level - 1) * 16 + 5}px` }"
          @click="scrollToAnchor(item.id, index)"
      >
        <span class="item-bullet"></span>
        <span class="item-text">{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.markdown-list {
  box-sizing: border-box;
  width: 300px;
  padding: 20px 15px;
  position: fixed;
  left: 0;
  transition: top 0.2s ease;
  backdrop-filter: blur(5px);
  border-radius: 0 12px 12px 0;
  max-height: 90vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #8064a9 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #8064a9;
    border-radius: 3px;
  }
}

.markdown-list-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(128, 100, 169, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;

  .header-icon {
    font-size: 16px;
  }
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin: 0;
  padding: 0;
}

.toc-item {
  margin: 6px 0;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;

  &:hover {
    background: rgba(128, 100, 169, 0.08);
    color: #735a98;

    .item-bullet {
      opacity: 1;
      transform: scale(1);
    }
  }

  &.active {
    font-weight: bold;
    color: #8064a9;
    background: rgba(128, 100, 169, 0.1);

    .item-bullet {
      opacity: 1;
      transform: scale(1);
      background: #8064a9;
    }
  }

  .item-bullet {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #8064a9;
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .item-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

// 不同层级的样式
.header-h1 {
  font-size: 16px;
  font-weight: 600;
}

.header-h2 {
  font-size: 15px;
}

.header-h3 {
  font-size: 14px;
}

.header-h4 {
  font-size: 13px;
  color: #6c757d;
}

.header-h5 {
  font-size: 12px;
  color: #8c959d;
}

.header-h6 {
  font-size: 12px;
  color: #adb5bd;
  font-style: italic;
}
</style>