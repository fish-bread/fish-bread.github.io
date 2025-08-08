import {ref} from "vue";

export const is_prompt = ref(false);

let timer = null;
let throttleTimer = null;
export const prompt_text = ref(""); // 存储提示文本
export const prompt_type = ref("success"); // 'success'或'error'
// 动画显示模式
export const showPrompt = (text, type = "success") => {
    // 节流处理
    if (throttleTimer) return;

    throttleTimer = setTimeout(() => {
        throttleTimer = null;
    }, 300);

    // 清除之前的定时器
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }

    // 设置提示内容和类型
    prompt_text.value = text;
    prompt_type.value = type;

    // 显示提示
    is_prompt.value = true;

    // 2秒后隐藏提示
    timer = setTimeout(() => {
        is_prompt.value = false;
        timer = null;
    }, 2500);
}