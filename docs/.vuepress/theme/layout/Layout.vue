<script setup>
//markdown样式表
//import '../styles/github-markdown.css'
import '../styles/spring.css'
//其他引入
import Returntop from "../components/returntop.vue";
import {computed, nextTick, onMounted, ref, watch, watchEffect} from "vue";
import { useRoute } from "vue-router";
import { watchThrottled} from "@vueuse/core"; //实用函数
import {
  layout_header_left,
  markdown_box,
  single_markdown_list
} from '../func/clientchoose.js'
import {markdown_list} from "../func/markdown_list.js";
const router = useRoute();

import { themes, theme_change } from '../func/newColor.js'
//获取当前路径,并设置标题
const path_name = ref()

//获取路由
import { useRoutes } from 'vuepress/client'
import {
  big_title, headerHeight, layout_header,
  layout_header_left_list, layout_header_title, y,
} from "../func/bigHeader.js";
import BigHeader from "../components/bigHeader.vue";
import LayoutLeft from "../components/layoutLeft.vue";
import LayoutMarkdown from "../components/layoutMarkdown.vue";
const routes = useRoutes()
const routePaths = computed(() => Object.keys(routes.value))
//设置文档
const set_router = () => {
  //分开路由,合并文档列表 // 初始化分类对象
  const categories = {
    Vue: [],
    Koa: [],
    Puppeteer: [],
    Issues: []
  };
  //遍历路由路径并进行分类
  routePaths.value.forEach(path => {
    //匹配 /posts/分类/ 的路径，支持中文和特殊字符
    const match = path.match(/^\/posts\/(Vue|Koa|Puppeteer|Issues)\/([^\/]+)\.html$/);
    if (match) {
      const category = match[1];
      const fileNameWithExt = match[2];

      //解码URL编码的中文字符（如 %E4%B8%AD%E6%96%87 -> 中文）
      const decodedFileName = decodeURIComponent(fileNameWithExt);

      //生成可读的文件名（去除.html，替换下划线/连字符为空格，首字母大写等）
      const readableName = decodedFileName
          .replace(/[-_]/g, ' ')  // 将下划线和连字符替换为空格
          .replace(/\b\w/g, c => c.toUpperCase())  // 每个单词首字母大写
          .replace(/\.html$/, '');  // 移除.html后缀（如果有）

      //添加到对应的分类中
      categories[category].push({
        markdown_name: readableName,
        markdown_link: path
      });
    }
  });
  
  //转换为 markdown_list 格式
  markdown_list.value = [
    {
      markdown_title: 'VUE', //vue文档
      markdown_title_list: categories.Vue
    },
    {
      markdown_title: 'KOA', //koa文档
      markdown_title_list: categories.Koa
    },
    {
      markdown_title: 'PUPPETEER', //puppeteer文档
      markdown_title_list: categories.Puppeteer
    },
    {
      markdown_title: 'ISSUES', // 代码日记文档
      markdown_title_list: categories.Issues
    }
  ];
  console.log('生成的文档列表:', markdown_list.value);
}
onMounted(() => {
  //设置路由及文档列表
  set_router()
  //监听标题
  watchEffect(() => {
    const keywords = ["Koa", "Vue", "Puppeteer", "Issues"];
    // 正则表达式：严格匹配第二个层级的目录名，并提取内容
    const pattern = /^\/posts\/(Koa|Vue|Puppeteer|Issues)\//;
    const match = router.path.match(pattern);
    if (match && match[1]) {
      path_name.value = match[1]; // 提取匹配的关键字（如 "Koa"）
      console.log('提取内容:', path_name.value); // 输出 "Koa"
      switch (path_name.value) {
        case "Koa":
          big_title.value = 'KOA';
          break;
        case "Puppeteer":
          big_title.value = 'PUPPETEER';
          break
        case "Vue":
          big_title.value = 'VUE';
          break;
        case "Issues": // 添加新的case
          big_title.value = 'ISSUES';
          break;
      }

    } else {
      path_name.value = null; // 未匹配时设为 null
    }
  });
  //监听文档路径变化
  watchThrottled(
      () => big_title.value,
      (newTitle) => {
        const newList = markdown_list.value.find(el => el.markdown_title === newTitle)
        single_markdown_list.value = newList.markdown_title_list;
        console.log('list', single_markdown_list.value);
      }, { throttle: 100,immediate: true })
  console.log('读取路由',routePaths.value)
});
</script>

<template>
  <div  class="markdown-typesetting font_size" :style="{
    color: theme_change === 'light' ? themes.light.color : themes.dark.color, 
  backgroundColor: theme_change === 'light' ? themes.light.back_color : themes.dark.back_color
  }" >
    <returntop></returntop>
    <!--头部-->
    <big-header></big-header>
    <!--左边-->
    <layout-left></layout-left>
    <!--文档-->
    <layout-markdown></layout-markdown>
  </div>
</template>

<style scoped>
.markdown-typesetting {
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>