import { defineClientConfig } from 'vuepress/client'
import Layout from "./theme/layout/Layout.vue";
import NotFound from "./theme/layout/404.vue";
import Home from "./theme/layout/Home.vue";
import Resource from "./theme/layout/resource.vue";
import ThemeChoose from "./theme/layout/ThemeChoose.vue";
import "./theme/styles/index.css"
//调色盘样式
import 'vue-color/style.css';
import Live2d from "./theme/layout/Live2d.vue";
import {changeTitle_func} from "./theme/func/changeTitle.js";
//shiki双主题

export default defineClientConfig({
  setup() {
    changeTitle_func()
  },
  enhance({ app, router}) {
    console.log('注册客户端')
  },
  // we provide some blog layouts
  layouts: {
    Layout,
    NotFound,
    Home,
    Resource,
    ThemeChoose,
    Live2d
  },
})
