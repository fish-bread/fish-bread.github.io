<script setup lang="ts">
import {data as markdownList} from '../Script/Markdown.data'
import { Ref, ref } from "vue";
import {MarkdownListInterface} from "../Script/Markdown";
import MarkdownSearchLayout from "../components/Global/MarkdownSearchLayout.vue";
const markdownChooseList: Ref<MarkdownListInterface[]> = ref([])
const inputTitle: Ref<string> = ref("")
const changeMarkdownChooseTags = (targetTitle: string) => {
  markdownChooseList.value = markdownList.filter((item: MarkdownListInterface) => {
    return item.title.toLowerCase().indexOf(targetTitle.toLowerCase()) !== -1
  })
}
</script>

<template>
  <MarkdownSearchLayout
      title="标题"
      :markdownChooseList="markdownChooseList"
  >
    <template v-slot:content>
      <div class="input-search-outbox">
        <div class="input-search-inbox">
          <input placeholder="请输入标题" v-model="inputTitle" @keydown.enter="changeMarkdownChooseTags(inputTitle)"></input>
          <button @click="changeMarkdownChooseTags(inputTitle)">搜索</button>
        </div>
      </div>
    </template>
  </MarkdownSearchLayout>
</template>

<style scoped lang="scss">
.input-search-outbox {
  width: 60%;
  gap: 10px;
  border:  var(--primaryColor) solid 3px;

  .input-search-inbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 0 0 0 5px;
  }

  button {
    padding: 3px;
    background-color:  var(--primaryColor);
    cursor: pointer;
  }

  input {
    flex: 1;
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>