<script setup lang="ts">
import {theme} from "../../func/themeChange";
import DownloadBox from './downloadBox.vue';
import {AListInter} from "../../types/types";
import {ref} from "vue";
const AppList = ref<AListInter>({
  title: '工具软件(仅限windows)',
  linkArray: [
      { href: 'http://localhost:8080/header/124017298_p0.png', h2title: '图片链接', hrefName: '图片链接', note: '备注:' },
    { href: 'http://localhost:8080/download/electron-python-1.0.0-setup.exe', h2title: '个人脚本gui', hrefName: 'electron-python-1.0.0-setup.exe', note: '备注:' },
  ]
})
</script>

<template>
  <div class="download-page" :style="{
    backgroundColor: theme === null ? '#ffffff' : '#101014'
  }">
    <DownloadBox :a-list-props="AppList" />
    <DownloadBox :a-list-props="AppList" />
  </div>
</template>

<style scoped lang="scss">
.download-page {
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>