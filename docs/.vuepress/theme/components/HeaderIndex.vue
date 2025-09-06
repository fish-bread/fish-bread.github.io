<script setup lang="ts">
import HeaderList from './header/headerList.vue'
import SidebarIndex from './SidebarIndex.vue'
import SunOrMoon from './header/SunOrMoon.vue'
import {theme } from "../func/themeChange"
import {TextAlignJustify20Regular} from '@vicons/fluent'
import {Github} from '@vicons/fa'
import { routerOpen } from '../func/routerIndex'
import { ref, provide } from 'vue'
import {headerListInter} from "../types/types";
//列表
const button_list:headerListInter[] = [
  { title: '搜索', href: '/posts/search.html' }, { title: '下载社区', href: '/' }, { title :'关于', href: '/posts/about.html' },
]
//依赖注入
provide('buttonList',button_list)

const isSidebar = ref<boolean>(false)
//传值
interface Props {
  positionData: 'absolute' | 'fixed' | 'relative'
  darkColor?: string
  lightColor?: string
}
const props = withDefaults(defineProps<Props>(), {
  positionData: 'relative',
  darkColor: '#000000', // 默认暗色为黑色
  lightColor: '#ffffff'  // 默认亮色为白色
})

</script>

<template>
  <SidebarIndex v-model="isSidebar"/>
  <div class="header" :style="{
    backgroundColor: theme === null ? props.lightColor : props.darkColor,
    position: props.positionData,
  }">
    <!--左-->
    <div class="head-left">
      <!--侧边栏按钮-->
      <n-tooltip   :show-arrow="false" trigger="hover">
        <template #trigger>
          <n-icon @click="isSidebar = !isSidebar" size="35" class="cursor-pointer">
            <TextAlignJustify20Regular/>
          </n-icon>
        </template>
        侧边栏
      </n-tooltip>
      <!--logo-->
      <router-link to="/" class="logo-title">FISHBREAD</router-link>
    </div>
    <!--右-->
    <div class="head-right">
      <!--链接按钮-->
      <div class="link-button">
        <!--文档-->
        <HeaderList :button_list="button_list"></HeaderList>
        <!--github-->
        <div style="display: flex; align-items: center;">
          <n-tooltip :show-arrow="false" trigger="hover">
            <template #trigger>
              <n-icon size="20" class="cursor-pointer">
                <Github @click="routerOpen('https://github.com/fish-bread')"/>
              </n-icon>
            </template>
            github
          </n-tooltip>
        </div>
        <SunOrMoon/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
%head-box-display-row {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  
}
.header {
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  padding: 5px 24px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  z-index: 10;
}
@media (max-width: 530px) {
  .head-right {
    display: none;
  }
}
.head-left {
   @extend %head-box-display-row;
   gap: 5px;
   align-items: center;
   .logo-title {
     user-select: none;
     font-size: 30px;
     font-weight: bold;
   }
 }
.head-right {
  @extend %head-box-display-row;
  gap: 10px;
  align-items: center;
  .link-button {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>