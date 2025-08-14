<script setup>
import Header from "./../components/Header.vue"
import {onMounted, watch,ref} from "vue";
import {
  big_title,
  layout_header,
  layout_header_title
} from "../func/bigHeader.js";
import {theme_change, themes} from "../func/newColor.js";
//打字机
import TypeIt from 'typeit';
let typeitInstance = null; // 保存TypeIt实例的引用
const currentBg = ref(''); // 添加背景状态
// 动态获取背景图片
const backgroundImages = ref([]);
const changeBackground = () => {
  if (backgroundImages.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * backgroundImages.value.length);
    currentBg.value = `url("${backgroundImages.value[randomIndex]}")`;
  }
};
onMounted(() => {
  // 动态导入sm_开头的图片
  if (typeof window !== 'undefined') {
    const images = import.meta.glob('../../public/images/background/sm_[0-9]*.png', { eager: true });
     backgroundImages.value = Object.keys(images).map(path => {
      return path.replace('../../public', '');
    });
    changeBackground(); // 初始化背景
  }
  console.log('currentBg', currentBg.value);
  watch(() => big_title.value, (newValue,oldValue) => {
        if (!layout_header_title.value) return;
        // 清除之前的动画实例
        if (typeitInstance) {
          typeitInstance.destroy();
        oldValue = undefined
        }
        if (newValue === undefined || newValue === null) return; 
        
        // 创建新的动画
        typeitInstance = new TypeIt(layout_header_title.value, {
          strings: `${newValue}`,
          speed: 80,
          loop: false,
          cursor: false,
          breakLines: false,
          startDelete: true,// 用于选择是否删除原本字符串还是直接替代
        }).go();
      }, { immediate: true })
})

</script>

<template>
  <!--头部-->
  <div ref="layout_header" class="layout-header font_size" :style="{ backgroundImage: currentBg, backgroundColor: theme_change === 'light' ? themes.light.back_color : themes.dark.back_color, }">
    <Header :position_name="'relative'"></Header>
    <!--显示是哪个版块-->
    <div ref="layout_header_title" class="layout-header-section" :style="{
       color: theme_change === 'light' ? themes.light.color : themes.dark.color,
    }"></div>
  </div>
</template>

<style scoped>
.layout-header {
  height: 240px;
  background: transparent no-repeat center;
  background-size: cover;
  position: fixed;
  width: 100%;
  z-index: 10;
  transition: height 0.5s ease;
  display: flex;
  flex-direction: column;
}
.layout-header-section {
  font-size: 80px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 1s ease, opacity 1.5s ease, color 0.3s ease;
}
</style>