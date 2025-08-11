<script setup>
import Header from "../components/Header.vue";
import {theme_change, themes} from "../func/newColor.js";
import HomeBody from "../components/deepseekcomponents/homeBody.vue";
import HomeLeft from "../components/deepseekcomponents/homeLeft.vue";
import HomeTitle from "../components/deepseekcomponents/homeTitle.vue";
import {is_user_setting, newTitle, userToken} from "../components/deepseekcomponents/window.js";
</script>

<template>
  <div class='background' :style="{
    backgroundColor: theme_change === 'light' ? themes.light.back_color : themes.dark.back_color,
    color: theme_change === 'light' ? themes.light.color : themes.dark.color,
  }">
    <Header></Header>
    <div ref="homeAll" class="home_all" >
      <home-left></home-left>
      <home-body v-show="!newTitle"></home-body>
      <home-title v-show="newTitle"></home-title>
      <div v-show="is_user_setting" class="user_box">
        <div :style="{
          backgroundColor: theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
        }" class="user_box_in">
          <div class="user_box_in_token">
            <div>用户token:</div>
            <input v-model="userToken"></input>
          </div>
          <div style="display: flex;flex-direction: column; align-items: center; gap: 10px">
            注意:本页面仅供展示,请勿输入拥有大量剩余token的api密钥<br>
            本网站不会保存你的apikey,当然,也不会提供加密
            <button style="width: 50px" @click="is_user_setting = false">返回</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user_box_in_token {
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  gap: 10px;
}
.user_box_in_token input {
  flex: 1;
}
.user_box_in {
  box-sizing: border-box;
  width: 500px;
  height: 180px;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}
.user_box {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.header {
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.4);
  background-color: rgba(237, 237, 238, 0.6);
  backdrop-filter: blur(5px);
  position: fixed;
}
.background {
  height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.home_all {
  padding-top: 60px;
  width: 100%;
  display: flex;
  height: calc(100vh - 60px);
  flex-direction: row;
}
</style>