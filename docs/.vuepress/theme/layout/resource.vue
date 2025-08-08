<script setup>
import Header from "../components/Header.vue";
import ResourceBox  from "../components/rosourcebox.vue";
import {themes, theme_change } from "../func/newColor.js";
import { ref } from "vue";
import Returntop from "../components/returntop.vue";
const resource_list = ref([
  { resource_name: 'live2d', resource_introduce: 'vue3的web-live2d项目',resource_link: 'https://github.com/fish-bread/vue-live2d',is_blank: '_blank'  },
  { resource_name: 'puppeteer',resource_introduce: 'vue3的puppeteer项目', resource_link: 'https://github.com/fish-bread/puppeteer-bilibili-pixiv',is_blank: '_blank'  },
  { resource_name: 'deepseek-vue',resource_introduce: 'vue3的deepseek项目', resource_link: 'https://github.com/fish-bread/deepSeek-nodejs',is_blank: '_blank'  },
  { resource_name: 'electron-vue-QQ',resource_introduce: 'electron-vue3的仿写qq的项目', resource_link: 'https://github.com/fish-bread/electron-vue-koa-qq',is_blank: '_blank'  },
  { resource_name: 'overwolf-native-vue3-js',resource_introduce: '借鉴@Ben-Guthrie/overwolf-vue3-sample-app的js复写的项目', resource_link: 'https://github.com/fish-bread/overwolf-native-vue3-js',is_blank: '_blank'  },
])
const resource_project = ref([
  {resource_name: 'live2d项目预览(占用资源较多)',resource_introduce: 'vue3的里live2d项目预览', resource_link: '/posts/Resource/live2d.html',is_blank: undefined},
  {resource_name: 'deepseek项目预览(未完工)',resource_introduce: 'vue3的里deepseek项目预览', resource_link: '/posts/Resource/deepseek.html',is_blank: undefined},
  {resource_name: 'puppeteer项目预览(未完工)',resource_introduce: 'vue3的里puppeteer项目预览', resource_link: '/posts/Resource/puppeteer.html',is_blank: undefined},
  {resource_name: 'vue音乐盒项目预览(未完工)',resource_introduce: 'vue3音乐盒项目预览', resource_link: '/postsResource/music.html',is_blank: undefined},
])
const resource_link_list = ref([
  {resource_name: '图片网站(未完工)',resource_introduce: '图片网站', resource_link: 'https://cn.vuejs.org/',is_blank: '_blank'},
  {resource_name: '视频网站(未完工)',resource_introduce: '视频网站', resource_link: 'https://cn.vuejs.org/',is_blank: '_blank'},
  { resource_name: '音乐网站(未完工)',resource_introduce: '音乐网站', resource_link: 'https://cn.vuejs.org/' ,is_blank: '_blank'}
])
const resource_big_title = ref([
  { resource_title: '个人项目' },
  { resource_title: '项目预览' },
  { resource_title: '资源链接' },
])
</script>

<template>
  <returntop></returntop>
  <div class="page-back font_size" :style="{
    backgroundColor: theme_change === 'light' ? themes.light.back_color : themes.dark.back_color,
    color: theme_change === 'light' ? themes.light.color : themes.dark.color
  }">
    <Header></Header>
    <!--盒子页面-->
    <div class="page-box">
      <div style="display: flex;flex-direction: row; gap: 30px">
      </div>
      <!--文档-->
      <resource-box :resources="resource_list" :resource_big_title="resource_big_title[0].resource_title">
      </resource-box>
      <resource-box :resources="resource_project" :resource_big_title="resource_big_title[1].resource_title">
      </resource-box>
      <resource-box :resources="resource_link_list" :resource_big_title="resource_big_title[2].resource_title">
      </resource-box>
    </div>
  </div>
</template>

<style scoped>
.header {
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.4);
}
.page-back {
  width: 100%;
  height: auto;
  position: relative;
  transition: background-color 0.3s ease, color 0.3s ease; 
}
.page-box {
  box-sizing: border-box;
  padding: 80px 10% 100px 10%;
  display: flex;
  gap: 30px;
  flex-direction:  column;
}
</style>