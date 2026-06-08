<!-- MarkdownMinibox.vue -->
<script setup lang="ts">
import MarkdownMiniboxTags from "./MarkdownMiniboxTags.vue";
import type { MarkdownListInterface } from "../../Script/Markdown"
import {RouterOutFunc} from "../../Script/RouterFunc";
import { computed, ref } from "vue";
const prop = defineProps<{
  markdownList: MarkdownListInterface[]
  isOne: boolean
  isTransparent: boolean
}>()
//分页相关
const currentPage = ref(1)
//每页显示数量
const pageSize = ref(5) 

//计算总页数
const totalPages = computed(() => {
  return Math.ceil(prop.markdownList.length / pageSize.value)
})

//获取当前页的数据
const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return prop.markdownList.slice(start, end)
})

//切换页码
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    //滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

//上一页
const prevPage = () => {
  goToPage(currentPage.value - 1)
}

//下一页
const nextPage = () => {
  goToPage(currentPage.value + 1)
}
//首页
const firstPage = () => {
  goToPage(1)
}

//末页
const endPage = () => {
  goToPage(totalPages.value)
}

//生成页码数组
const pageNumbers = computed(() => {
      const page = [];
      const maxVisible = 5;
      //当页面数不够
      if (totalPages.value <= maxVisible) {
        for (let i = 1; i <= totalPages.value; i++) {
          page.push(i)
        }
      }
     //页面数大于5页
      else {
        //当页面在前5页
        if (currentPage.value <= 3) {
          for (let i = 1; i <= 5; i++) {
            page.push(i)
          }
        }
        //当页面在后5页
        else if (currentPage.value >= totalPages.value - 2) {
          for (let i = totalPages.value - 4; i <= totalPages.value; i++) {
            page.push(i)
          }
        }
        //当页面在中间5页
        else
          for (let i = currentPage.value - 2; i <= currentPage.value + 2; i++) {
            page.push(i)
          }
      }
      return page
    }
  )


</script>

<template>
  <div class="markdown-minibox-container">
    <!--文章列表-->
    <div
        class="home-page-markdown-minibox"
        :style="{
        height: item.titleBackground === null ? '240px' : '430px', 
        backgroundColor: isTransparent !== true ? `var(--markDownMiniBackgroundColor)` : ``,
        backdropFilter: isTransparent !== true ? `blur(10px)` : ``
      }"
        v-for="(item, index) in paginatedList"
        :key="index"
    >
      <div class="home-page-markdown-minibox-title"
           :style="{
            flex: item.titleBackground === null ? null : 1,
            height: item.titleBackground === null ? null : '100%'
          }">
        <div class="home-page-markdown-minibox-titleBackground" :style="{
          backgroundImage: `url(${item.titleBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }" v-if="item.titleBackground !== null">
          <div class="home-page-markdown-minibox-h1 cursorPointer" @click="RouterOutFunc(item.url)">{{ item.title }}</div>
        </div>
        <div class="home-page-markdown-minibox-titleBackground" v-else>
          <div class="home-page-markdown-minibox-h1 cursorPointer" @click="RouterOutFunc(item.url)">{{ item.title }}</div>
        </div>
      </div>

      <div class="home-page-markdown-minibox-description"
           :style="{
            flex: item.titleBackground !== null ? null : 1,
            height: item.titleBackground !== null ? null : '100%'
          }">&nbsp;&nbsp;&nbsp;&nbsp;{{ item.description }}</div>

      <div class="home-page-markdown-minibox-bottom">
        <div class="home-page-markdown-minibox-bottom-box">
          <MarkdownMiniboxTags :title="'标签'">
            <template v-slot>
              <div class="home-page-markdown-minibox-bottom-tag" v-for="(tag, tagIndex) in item.tags" :key="tagIndex">{{ tag }}</div>
            </template>
          </MarkdownMiniboxTags>
          <MarkdownMiniboxTags :title="'分类'">
            <template v-slot>
              <div>{{ item.Category }}</div>
            </template>
          </MarkdownMiniboxTags>
        </div>
        <div class="home-page-markdown-minibox-bottom-box">
          <MarkdownMiniboxTags :title="'更新日期'">
            <template v-slot>
              <div>{{ item.updatedDate }}</div>
            </template>
          </MarkdownMiniboxTags>
          <MarkdownMiniboxTags :title="'撰写日期'">
            <template v-slot>
              <div>{{ item.writtenDate }}</div>
            </template>
          </MarkdownMiniboxTags>
        </div>
      </div>
    </div>

    <!--分页组件-->
    <div class="pagination" v-if="!isOne && totalPages > 1">
      <button
          class="pagination-btn"
          @click="firstPage"
          :disabled="currentPage === 1"
      >
        &laquo; 首页
      </button>
      
      <button
          class="pagination-btn"
          @click="prevPage"
          :disabled="currentPage === 1"
      >
        &laquo; 上一页
      </button>

      <button
          v-for="page in pageNumbers"
          :key="page"
          class="pagination-btn"
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <button
          class="pagination-btn"
          @click="nextPage"
          :disabled="currentPage === totalPages"
      >
        下一页 &raquo;
      </button>
      
      <button
          class="pagination-btn"
          @click="endPage()"
          :disabled="currentPage === totalPages"
      >
        末页 &raquo;
      </button>
    </div>

    <!--显示当前页码信息-->
    <div class="pagination-info" v-if="!isOne">
      第 {{ currentPage }} / {{ totalPages }} 页 | 共 {{ markdownList.length }} 篇文章
    </div>
  </div>
</template>

<style scoped lang="scss">
@mixin flex-between-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
@mixin flex-between-center-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.markdown-minibox-container {
  width: 100%;
}

.home-page-markdown-minibox {
  @include flex-between-center;
  width: 100%;
  padding: 30px 30px;
  border-radius: 10px;
  margin-bottom: 20px;

  .home-page-markdown-minibox-h1 {
    color: var(--primaryColor);
    font-weight: bold;
    font-size: 30px;
  }

  .home-page-markdown-minibox-title {
    width: 100%;

    .home-page-markdown-minibox-titleBackground {
      @include flex-between-center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }

  .home-page-markdown-minibox-description {
    padding: 10px 10px;
    width: 100%;
  }

  .home-page-markdown-minibox-bottom {
    @include flex-between-center-row;
    justify-content: space-between;
    width: 100%;

    .home-page-markdown-minibox-bottom-box {
      @include flex-between-center-row;
      gap: 10px;
    }

    .home-page-markdown-minibox-bottom-tag {
      background-color: var(--primaryColor);
      border-radius: 5px;
      padding: 5px 10px;
      font-size: 12px;
      font-weight: bold;
    }
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.pagination-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: white;
  color: #333;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;

  &:hover:not(:disabled) {
    background-color: var(--primaryColor);
    border-color: var(--primaryColor);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.active {
    background-color: var(--primaryColor);
    border-color: var(--primaryColor);
  }
}

.pagination-info {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}
</style>