import {
  addToHistory,
  currentMessage,
  TextDeepSeek, history, nowSessionHistoryId, updateCurrentHistory,
} from "./deepseekText.js";
import {newTitle, userToken} from "./window.js";

export const intoDeepSeek = async () => {
  const userMessage = TextDeepSeek.value.trim()
  if (!userMessage) return
  newTitle.value = true

  let sessionId = nowSessionHistoryId.value

  // 如果没有当前会话或需要新会话，则创建新历史记录
  if (!sessionId) {
    // 立即显示用户消息
    currentMessage.value = {
      user: userMessage,
      assistant: '思考中...'
    }
    // 添加到历史记录
    sessionId = addToHistory(userMessage, '')
  }  else {
    // 更新当前显示
    currentMessage.value.user = userMessage
    currentMessage.value.assistant = '思考中...'
    // 更新历史记录（添加新消息而不是替换）
    updateCurrentHistory(userMessage, '思考中...')
  }
  
    const apiKey = userToken.value
  const url = 'https://api.deepseek.com/v1/chat/completions'

  try {
    // 构建消息历史，包括之前的对话
    const messages = [
      { role: "user", content: "一步一步分析下面的问题，用中文回答" }
    ]

    // 添加之前的对话历史
    const currentSession = history.value.find(item => item.history_id === sessionId)
    if (currentSession) {
      if (currentSession.user) {
        messages.push({ role: "user", content: currentSession.user })
      }
      if (currentSession.assistant && currentSession.assistant !== '思考中...') {
        messages.push({ role: "assistant", content: currentSession.assistant })
      }
    }

    // 添加当前消息
    messages.push({ role: "user", content: userMessage })
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: messages,
        model: 'deepseek-chat',
        stream: true,
      }),
    })

    if (!response.ok) throw new Error(`API请求失败: ${response.status},未设置密钥或服务器报错`)
    if (!response.body) throw new Error('响应体为空')

    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let fullResponse = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n')

      for (const line of lines) {
        if (line.startsWith('data:')) {
          const data = line.slice(5).trim()

          if (data === '[DONE]') {
            // 更新完整历史记录
            const sessionIndex = history.value.findIndex(item => item.history_id === sessionId)
            if (sessionIndex !== -1) {
              history.value[sessionIndex].assistant = fullResponse
            }
            TextDeepSeek.value = '' // 清空输入框
            break
          }

          try {
            const jsonData = JSON.parse(data)
            if (jsonData.choices && jsonData.choices[0].delta.content) {
              fullResponse += jsonData.choices[0].delta.content
              // 实时更新当前显示和对应历史记录
              currentMessage.value.assistant = fullResponse
              const sessionIndex = history.value.findIndex(item => item.history_id === sessionId)
              if (sessionIndex !== -1) {
                history.value[sessionIndex].assistant = fullResponse
              }
            }
          } catch (error) {
            console.error('JSON解析失败:', error)
          }
        }
      }
      // 更新最后一条AI消息的内容
      const sessionIndex = history.value.findIndex(item => item.history_id === sessionId)
      if (sessionIndex !== -1) {
        const messages = history.value[sessionIndex].messages
        // 找到最后一条AI消息并更新
        for (let i = messages.length - 1; i >= 0; i--) {
          if (messages[i].role === 'assistant') {
            messages[i].content = fullResponse
            break
          }
        }
      }
    }
  } catch (error) {
    console.error('请求失败:', error)
    currentMessage.value.assistant = '请求失败: ' + error.message
    // 更新失败状态到历史记录
    const sessionIndex = history.value.findIndex(item => item.history_id === sessionId)
    if (sessionIndex !== -1) {
      const messages = history.value[sessionIndex].messages
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].role === 'assistant') {
          messages[i].content = currentMessage.value.assistant
          break
        }
      }
    }
  }
}