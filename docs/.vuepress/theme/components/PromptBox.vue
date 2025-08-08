<script setup>
import FailSvg from "./PromptAnimation/failSvg.vue";
import SuccessSvg from "./PromptAnimation/successSvg.vue";
import {theme_change, themes} from "../func/newColor.js";
import {is_prompt, prompt_text, prompt_type} from "../func/prompt_box.js";

</script>

<template>
  <transition>
    <!--提示盒子-->
    <div v-if="is_prompt" class="prompt-box font_size" :style="{
   backgroundColor: theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
   color: theme_change === 'light' ? themes.light.color : themes.dark.color,
 }">
      <!--状态动画-->
      <success-svg v-show="prompt_type === 'success'"/>
      <fail-svg v-show="prompt_type === 'error'"/>
      <div>{{ prompt_text }}</div>
    </div>
  </transition>
</template>

<style scoped>

.prompt-box {
  box-sizing: border-box;
  position: fixed;
  border-radius: 5px;
  z-index: 10;
  height: 50px;
  padding: 5px 10px;
  left: 50%;
  transform: translateX(-50%);
  top: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease, transform 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-30px) translateX(-50%) ;
}
</style>