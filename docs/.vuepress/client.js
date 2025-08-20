import  { defineClientConfig } from 'vuepress/client'
import Layout from "./theme/layout/Layout.vue";
import NotFound from "./theme/layout/404.vue";
import Home from "./theme/layout/Home.vue";
import Resource from "./theme/layout/resource.vue";
import ThemeChoose from "./theme/layout/ThemeChoose.vue";
import DeepSeek from "./theme/layout/deepseek.vue";
import "./theme/styles/index.css"
import  './theme/styles/color.css'
//调色盘样式
import 'vue-color/style.css';
import Live2d from "./theme/layout/Live2d.vue";
import {onMounted} from "vue";
import {all_watch} from "./theme/func/clientchoose.js";
export default defineClientConfig({ 
  enhance({ app, router}) {
    console.log('注册客户端')
    //注册全局组件
  },
  setup() {
      onMounted(async () => {
          await all_watch()
      })
  },
  //用于直接注册并启用在根组件
  rootComponents: [
  ],
  // we provide some blog layouts
  layouts: {
    Layout,
    NotFound,
    Home,
    Resource,
    ThemeChoose,
    Live2d,
    DeepSeek
  },
})
