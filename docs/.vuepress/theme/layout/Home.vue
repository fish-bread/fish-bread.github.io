<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import '../styles/search-box.css'
import '../styles/home_client.css'
import {onMounted, ref } from "vue";
import Userbox from "../components/userbox.vue";
import Returntop from "../components/returntop.vue";
import Homedown from "../components/homedown.vue";
import HomeLinkBox from "../components/homeLinkBox.vue";
import {theme_change, themes} from '../func/newColor.js'
// 动态导入 /docs/.vuepress/public/images/background/ 下的所有图片
const backgroundImages = ref([]);

// 2. 当前背景图（响应式变量）
const currentBg = ref('')
// 3. 随机切换背景函数
const changeBackground = () => {
  if (backgroundImages.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * backgroundImages.value.length);
    currentBg.value = `url("${backgroundImages.value[randomIndex]}")`;
  }
  console.log('切换图片',currentBg.value)
}
onMounted(() => {
  //动态导入图片
  if (typeof window !== 'undefined') {
    // Vite 动态导入语法
    const images = import.meta.glob('../../public/images/background/[0-9]*.png', { eager: true });
    backgroundImages.value = Object.keys(images).map(path => {
      // 提取文件名并拼接为正确的公开路径
      return path.replace('../../public', '');
    });
    changeBackground(); // 初始化背景
  }
})
//模块链接
const module_links = ref([
  {link_title: '前端探索', link_name: '个人前端探索经历', link_img: '/images/background/link_1.png', link_href: '/posts/Issues/Issues_index.html'},
  {link_title: 'vue相关', link_name: '有关于vue的探索',  link_img: '/images/background/link_2.png', link_href: '/posts/Vue/vue.html' },
  {link_title: '脚本相关',  link_name: '有关于脚本的探索',  link_img: '/images/background/link_3.png', link_href: '/posts/Puppeteer/puppeteer.html' },
  {link_title: 'koa相关', link_name: '有关于koa的探索' , link_img: '/images/background/link_4.png', link_href: '/posts/Koa/koa.html' },
  {link_title: '资源收集', link_name: '个人搜集的资源',  link_img: '/images/background/link_5.png', link_href: '/posts/Resource/resource.html' }
])
</script>

<template>
  <!--背景图片不动款-->
  <div ref="back" class="back" :style="{ 
    backgroundImage: currentBg,
    backgroundColor: theme_change === 'light' ? themes.light.back_color : themes.dark.back_color,
  }"></div>
    <!--返回顶部按钮-->
    <returntop></returntop>
    <!--移动到下面-->
    <homedown></homedown>
    <div class="home-in-box home-box font_size" 
         :style="{
      '--home-box-color-hover': theme_change === 'light' ? themes.light.color : themes.dark.color, 
         }">
      <Header></Header>
      <!--首页显示-->
      <userbox></userbox>
      <!--列表展示-->
      <div class="home-content home-box" :style="{
        '--home-box-back_color': theme_change === 'light' ? themes.light.back_color : themes.dark.back_color, 
      }" >
        <div class="home-markdown">
          <!--链接盒子-->
          <home-link-box :module_links="module_links"></home-link-box>
        </div>
      </div>
      <!--底部-->
      <Footer></Footer>
    </div>
</template>

<style scoped>
.header {
  position: absolute;
  z-index: 20;
}
.back {
  box-sizing: border-box;
  position: fixed;
  background: no-repeat center center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
.home-in-box {
  width: 100%;
  height: 100%;
  background-color: transparent;
}
.home-content {
  width: 100%;
  background-color: white;
  box-sizing:  border-box;
  overflow: auto;
  padding: 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background-color 0.3s ease, color 0.3s ease;;
}
.home-markdown {
  box-sizing: border-box;
  height: 100%;
  width: 80%;
  padding: 20px 0;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  /*background-color: aquamarine;*/
}

</style>