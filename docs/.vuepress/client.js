import  { defineClientConfig } from 'vuepress/client'
import Layout from "./theme/layout/Layout.vue";
import NotFound from "./theme/layout/404.vue";
import Home from "./theme/layout/Home.vue";
import Search from "./theme/layout/Search.vue";
import About from "./theme/layout/About.vue";
import "./theme/styles/index.css"
import "./theme/styles/searchBox.css"
import {searchLocalTheme} from "./theme/func/themeChange.js";
import {onMounted} from "vue";
import naive from 'naive-ui'
export default defineClientConfig({ 
  enhance({app, router, siteData}) {
    console.log('注册客户端')
      app.use(naive)
      //备用方案
      /*if (!__VUEPRESS_SSR__) {
          // 同步导入而不是动态导入
          import('naive-ui').then(module => {
              const naive = module.default || module
              app.use(naive)
          })
      }*/
  },
  setup() {
      onMounted(() => {
          searchLocalTheme()
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
    Search,
    About
  },
})
