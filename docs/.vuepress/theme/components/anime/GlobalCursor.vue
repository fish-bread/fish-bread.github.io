<template>
  <!-- 这个组件不需要模板内容，仅用于初始化光标 -->
</template>

<script setup>
import { onMounted } from "vue";
import { setANICursor, setANICursorWithGroupElement } from "ani-cursor.js";

// 光标配置对象（根据您的实际文件路径调整）
const cursorConfig = {
  default: "/images/cursors/信浓-鼠标指针/default.ani",
  pointer: "/images/cursors/信浓-鼠标指针/link.ani",
  text: "/images/cursors/信浓-鼠标指针/text.ani",
  wait: "/images/cursors/信浓-鼠标指针/busy.ani",
  disabled: "/images/cursors/信浓-鼠标指针/disabled.ani"
};
// 3. 文本输入相关
const textElements = [
  "input",
  "textarea",
  "p", "span",
  "h1", "h2", "h3", "h4", "h5", "h6"
];
// 等待状态元素（可根据需要调整）
const waitElements = [
  ".loading",
];
onMounted(() => {
  try {
      // body
      setANICursor(
          "body",
          cursorConfig.default,
          "default",
      );
      // 链接/按钮状态
      setANICursorWithGroupElement(
          ["a, button, svg"],
          cursorConfig.pointer,
          "pointer",
      );
      // 文本
      setANICursorWithGroupElement(
          textElements,
          cursorConfig.text,
          'text',
      );
      // 禁用状态
      setANICursorWithGroupElement(
          ["[disabled], :disabled"],
          cursorConfig.disabled,
          "not-allowed"
      );
      // 新增：等待状态
      setANICursorWithGroupElement(
          waitElements,
          cursorConfig.wait,
          "wait"
      );
      console.log("自定义光标初始化完成");
  } catch (error) {
    console.error("光标初始化失败:", error);
    // 回退到系统默认光标
    document.body.style.cursor = "auto";
  }
});
</script>