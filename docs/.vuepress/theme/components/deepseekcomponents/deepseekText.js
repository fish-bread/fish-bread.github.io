import { ref } from 'vue'
import {newTitle} from "./window.js";
export const TextDeepSeek = ref() // 用户输入的文本
export const currentMessage = ref({ user: '', assistant: '' }); // 当前对话的用户提问和AI回答
export const history = ref([]) // 存储所有会话历史
export const nowSessionHistoryId = ref()

// 修改历史记录结构，每条历史记录包含messages数组
export const addToHistory = (userMsg, assistantMsg) => {
  const sessionId = Date.now().toString()
  history.value.push({
    history_id: sessionId,
    messages: [
      { role: 'user', content: userMsg },
      { role: 'assistant', content: assistantMsg }
    ],
    timestamp: new Date()
  })
  nowSessionHistoryId.value = sessionId
  return sessionId
}

// 更新历史记录，添加新消息而不是替换
export const updateCurrentHistory = (userMsg, assistantMsg) => {
  const sessionId = nowSessionHistoryId.value
  if (!sessionId) return

  const sessionIndex = history.value.findIndex(item => item.history_id === sessionId)
  if (sessionIndex !== -1) {
    // 添加新消息到messages数组
    history.value[sessionIndex].messages.push(
        { role: 'user', content: userMsg },
        { role: 'assistant', content: assistantMsg }
    )
  }
}

// 选择历史记录的方法
export const selectHistory = (historyId) => {
  newTitle.value = true
  nowSessionHistoryId.value = historyId
  const selected = history.value.find(item => item.history_id === historyId)
  if (selected) {
    // 只显示最后一条消息在currentMessage中（保持原有功能）
    const lastUserMsg = selected.messages.filter(m => m.role === 'user').pop()
    const lastAssistantMsg = selected.messages.filter(m => m.role === 'assistant').pop()
    currentMessage.value = {
      user: lastUserMsg?.content || '',
      assistant: lastAssistantMsg?.content || ''
    }
  }
}