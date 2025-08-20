<!--suppress ALL -->
<script setup>
import {onMounted, ref, shallowRef, watch} from "vue";
import { themes, theme_change } from "../func/newColor.js";

defineProps({
  resources: {
    type: Array,
    required: true
  },
  resource_big_title: {
    type: String,
    required: true
  }
})
//收起按钮
const resource_list_button = shallowRef()
const link_box_ref = shallowRef()
const is_put = ref(false)
const put_down_func = () => {
  if (is_put.value) {
    console.log('展开',is_put.value)
    is_put.value = false
  } else {
    console.log('已收起',is_put.value)
    is_put.value = true
  }
}
onMounted(() => {
  watch(
      () => is_put.value,
      (newIS) => {
        if (newIS) {
          link_box_ref.value.style.height = '100%'
          resource_list_button.value.style.transform = 'rotate(0)'
        } else {
          link_box_ref.value.style.height = ''
          resource_list_button.value.style.transform = 'rotate(180deg)'
        }
      },
  )
})
</script>

<template>
  <div ref="link_box_ref" class="link-box">
    <div class="resource-box-title">
    <div style="display: flex;align-items: center">{{ resource_big_title }}</div>
    <!--收放按钮-->
    <button @click="put_down_func" ref="resource_list_button" class="resource-box-title-svg" :style="{
'--default-fill-color': theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
'--default-hover-color':theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
}">
      <svg t="1754387765917" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10101" width="200" height="200"><path d="M690 405h-46.9c-10.2 0-19.9 4.9-25.9 13.2L512 563.6 406.8 418.2c-6-8.3-15.6-13.2-25.9-13.2H334c-6.5 0-10.3 7.4-6.5 12.7l178 246c3.2 4.4 9.7 4.4 12.9 0l178-246c3.9-5.3 0.1-12.7-6.4-12.7z" p-id="10102" fill="#2c2c2c"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" p-id="10103" fill="#2c2c2c"></path></svg>
    </button>
  </div>
    <div class="link-list">
        <a v-for="(list, index) in resources" :href="list.resource_link" :key="index" :target="list.is_blank" class="link-item" :style="{
          '--link-item-hover' : theme_change === 'light' ? themes.light.hover_color : themes.dark.hover_color,
        }">
          <span class="link-title">{{ list.resource_name }}</span>
          <span class="link-desc">{{ list.resource_introduce }}</span>
        </a>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  background-color: #ededed;
}
.resource-box-title {
  color: #2c2c2c !important;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 17px;
}

.resource-box-title-svg {
  outline: none;
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transform: rotate(180deg);
}
.link-box {
  box-sizing: border-box;
  width: 100%;
  height: 400px;
  border: 1px solid #eaecef;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  background: #ededed;
  transition: all 0.3s ease;
  overflow: hidden;
}
.link-box:hover {
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.4);
  transform: translateY(-2px);
}
.link-list {
  display: grid;
  gap: 8px;
  overflow-y: auto; /* 允许垂直滚动 */
  flex-grow: 1; /* 占据剩余空间 */
  max-height: calc(100% - 40px); /* 减去标题高度 */
}
.link-item {
  display: block;
  padding: 10px 12px;
  border-radius: 6px;
  background: white;
  color: #2c3e50;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
}
.link-item:hover {
  background: var(--link-item-hover) !important;
  color: white;
}
.link-title {
  display: block;
  font-weight: 600;
}
.link-desc {
  display: block;
  font-size: 0.85em;
  opacity: 0.8;
}
</style>