<script setup lang="ts">
interface TocItem {
  id: string;
  text: string;
  tag: string;
  level: number;
}
import { ref } from "vue";
// 当前激活的目录项索引
const activeIndex = ref(0);
// 滚动到指定锚点
const scrollToAnchor = (id: string, index: number) => {
  const element = document.getElementById(id);
  if (element) {
    // 平滑滚动到元素位置[1,7](@ref)
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    // 设置当前激活的目录项
    activeIndex.value = index;
  }
};
defineProps<{
  tocList: TocItem[];
  isList: boolean;
  listTop: number;
}>()
</script>

<template>
  <div v-show="isList" class="markdown-list" :style="{ top: listTop + 'px' }">
    <div class="markdown-list-header">目录</div>
    <ul class="markdown-list-body">
      <li
          v-for="(item, index) in tocList"
          :key="index"
          :class="['toc-item', 'header-' + item.tag, { active: activeIndex === index }]"
          :style="{ paddingLeft: `${(item.level - 1) * 16 + 5}px` }"
          @click="scrollToAnchor(item.id, index)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.markdown-list {
  box-sizing: border-box;
  width: 300px;
  padding: 30px 5px 5px 20px;
  position: fixed;
  left: 0;
  transition: top 0.2s ease;
}
.markdown-list-header {
  font-size: 18px;
  font-weight: bold;
}
ul {
  list-style: none;
  margin: 0 0 0 10px;
  padding:0 0 0 0;
  cursor: default;
}
li {
  margin: 0;
  padding: 0;
}
.toc-item {
  margin: 4px 0;
  padding: 1px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    color: #735a98;
  }

  &.active {
    font-weight:bold;
    color: #8064a9;
  }
}
// 不同层级的样式
.header-h1 {
  font-size: 16px;
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