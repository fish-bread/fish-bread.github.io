<script setup>
import HomeInput from "../deepseekcomponents/homeInput.vue";
import { currentMessage, history, nowSessionHistoryId } from "./deepseekText.js";
import {body_title, isBack} from "./window.js";
import {theme_change, themes} from "../../func/newColor.js";
import { computed } from 'vue'

// 获取当前会话的完整历史消息
const currentSessionMessages = computed(() => {
  if (!nowSessionHistoryId.value) return []

  const currentSession = history.value.find(item => item.history_id === nowSessionHistoryId.value)
  return currentSession?.messages || []
})
</script>

<template>
  <div ref="body_title" class="body-title">
    <div class="body-home-read">
      <div class="chat-history" :style="{
        '--user-back-color': theme_change === 'light' ? themes.light.theme_color : themes.dark.theme_color,
        '--assistant-back-color': theme_change === 'light' ? themes.light.hover_color : themes.dark.hover_color,
      }">
        <!-- 显示当前会话的所有消息 -->
        <div class="message-container">
          <template v-for="(message, index) in currentSessionMessages" :key="index">
            <div
                v-if="message.content"
                :class="[message.role === 'user' ? 'user-message' : 'assistant-message']"
            >
              {{ message.content }}
            </div>
          </template>
        </div>
      </div>
      <home-input :class="{'fixed': isBack}"></home-input>
    </div>
  </div>
</template>

<style scoped>
.body-home-read-bottom {
  position: fixed;
  bottom: 20px;
  right: 50%;
  transform: translateX(calc(50% + 150px));
  width: 700px;
  transition: transform 0.3s ease;
}
.fixed {
  transform: translateX(calc(50%)) !important;
}
.body-title {
  display: flex;
  flex-direction: column;
  padding-left:250px;  
  flex: 1;
  transition: padding 0.3s ease;
}

.body-home-read {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0 5px 0 5px;
  width: 100%;
}

.chat-history {
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message-container {
  display: flex;
  flex-direction: column;
  gap: 10px; /* 用户消息和AI消息之间的间距 */
}

.user-message {
  align-self: flex-end; /* 用户消息靠右 */
  background-color: var(--user-back-color); /* 用户消息背景色 */
  padding: 12px 16px;
  border-radius: 15px;
  max-width: 70%;
  word-break: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.assistant-message {
  align-self: flex-start; /* AI消息靠左 */
  background-color: var(--assistant-back-color); /* AI消息背景色 */
  padding: 12px 16px;
  border-radius: 15px;
  max-width: 70%;
  word-break: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}
</style>
