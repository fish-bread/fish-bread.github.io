<script setup>
import HomeInput from "../deepseekcomponents/homeInput.vue";
import { body_home } from "./window.js";
</script>

<template>
  <div ref="body_home" class="body-home">
    <div class="body-home-read">
      <!--top-->
      <div class="body-home-read-header">
        <div class="body-home-read-header-logo">
          what can i say?
        </div>
        <div class="body-home-read-header-title">
          扣1复活牢大,111111111111111111
        </div>
      </div>
      <!--对话-->
      <home-input></home-input>
    </div>
  </div>
</template>

<style scoped>
.body-home {
  display: flex;
  justify-content: center;
  flex: 1;
  padding-left:250px;
  transition: padding 0.3s ease;
}
.body-home-read {
  display: flex;
  box-sizing: border-box;
  padding: 0 5px 0 5px;
  max-width: 800px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}
.body-home-read-header {
  display: flex;
  flex-direction: column;
  height: 100px;
  align-items: center;
  justify-content: space-between;
}
.body-home-read-header-logo {
  font-size: 24px ;
}
</style>
