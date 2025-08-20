//判断客户端
import {ref, shallowRef, watchEffect,} from "vue";
import {useWindowSize, watchThrottled} from "@vueuse/core";
import {get_theme, theme_change, themes} from "./newColor.js";
export const is_mobile = ref()
export const vue_device_detect = async () => {
    const isMobile = await import('vue-device-detect')
    is_mobile.value = isMobile.isMobile
    console.log('是否为手机',is_mobile.value)
}

//文档
export const is_Sidebar = ref(false)
export const is_left_hide = ref(false)
export const sidebar = ref()
export const show_sidebar = () => {
    is_Sidebar.value = !is_Sidebar.value
    is_left_hide.value = !is_left_hide.value
}
//单次文档列表
export const single_markdown_list = ref([])
export const markdown_body = ref()
//判断窗体
//判断窗体宽度
export const link_imgs = ref([])
export const markdown_box = shallowRef()
export const markdown_link_ref =  shallowRef()
export const header =  shallowRef()
//文档快捷
export const toc_sidebar =  shallowRef()
export const is_toc_sidebar =ref(true)
//隐藏左边
export const hide_left_button = shallowRef()
const { width } = useWindowSize();
//样式变化
export const window_size_func = () => {
    // 监听窗体宽度
    watchThrottled(
        () => width.value,
        (newX) => {
            console.log('屏幕宽度', newX)

            // 1. 主页图片处理（独立判断）
            if (link_imgs.value) {
                link_imgs.value.forEach(el => {
                    if (el) {
                        el.style.display = newX <= 1280 ? 'none' : 'flex';
                    }
                });
            }
            // 2. 头部链接列表处理（独立判断）
            if (markdown_link_ref.value) {
                markdown_link_ref.value.style.display = newX <= 750 ? 'none' : 'flex';
            }

            if (markdown_box.value) {
                markdown_box.value.style.paddingLeft = newX <= 1280 ? "5px" : "300px";
                markdown_box.value.style.paddingRight = newX <= 1280 ? "5px" : "300px";
            }

            if (markdown_body.value) {
                markdown_body.value.style.padding = newX <= 1280 ? "0 0 150px 0" : "0 5% 150px 5%";
            }
            // 4. 独立的状态更新（无需DOM操作）
            is_toc_sidebar.value = newX > 1280;
        },
        { throttle: 500, immediate: true }
    )
}
//一键监听
export const all_watch = async () => {
    //读取窗体设置
    window_size_func()
    //读取新主题
    get_theme()
    //读取客户端
    await vue_device_detect()
    //监听并更新滚动条颜色
    watchEffect(()=> {
        if (theme_change.value === 'light') {
            document.documentElement.style.setProperty('--scrollbar-track-color', themes.value.light.scrollbar_color);
        }
        else if (theme_change.value === 'dark') {
            document.documentElement.style.setProperty('--scrollbar-track-color', themes.value.dark.scrollbar_color);
        }
    })
} 

