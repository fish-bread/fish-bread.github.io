<script setup lang="ts">
import {data as markdownList} from '../Script/Markdown.data'
import {onMounted, Ref, ref, watch} from "vue";
import {MarkdownListInterface, CategoryInterface} from "../Script/Markdown";
import MarkdownSearchLayout from "../components/Global/MarkdownSearchLayout.vue";
const markdownChooseList: Ref<MarkdownListInterface[]> = ref([])
const markdownChooseCategory: Ref<CategoryInterface> = ref('未分类')
const markdownChooseCategoryList: Ref<CategoryInterface[]> = ref([
  "TS", "unity", "未分类",
])
onMounted(() => {
  markdownChooseList.value = markdownList.filter((item: MarkdownListInterface) => item.Category === markdownChooseCategory.value)
  console.log(`markdown${markdownChooseList.value}`)
})
watch(markdownChooseCategory, 
    (newValue, oldValue) => {
      markdownChooseCategory.value = newValue;
      markdownChooseList.value = markdownList.filter((item: MarkdownListInterface) => item.Category === markdownChooseCategory.value)
})
const changeMarkdownChooseCategory = (category: CategoryInterface) => {
  markdownChooseCategory.value = category
}
</script>

<template>
  <MarkdownSearchLayout 
      title="类别"
      :markdownChooseList="markdownChooseList"
  >
    <template v-slot:content>
      <div class="markdown-body-content-box-tags-box">
        <div
            v-for="(item, index) in markdownChooseCategoryList"
            :key="index"
            class="markdown-body-content-box-tags cursorPointer"
            :class="{
                   'markdown-body-content-box-tags-active':markdownChooseCategory === item,
                }"
            @click="changeMarkdownChooseCategory(item)"
        >
          {{item}}
        </div>
      </div>
    </template>
  </MarkdownSearchLayout>
</template>

<style scoped lang="scss">
.markdown-body-content-box-tags-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  .markdown-body-content-box-tags {

    padding: 3px;
    border-radius: 5px;
  }
  .markdown-body-content-box-tags-active {
    background-color: var(--primaryColor);
  }
}
</style>