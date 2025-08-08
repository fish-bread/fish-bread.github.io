//判断客户端
import {ref, shallowRef, watch} from "vue";
import {useWindowSize, watchThrottled} from "@vueuse/core";
export const is_mobile = ref()
export const vue_device_detect = async () => {
    const isMobile = await import('vue-device-detect')
    is_mobile.value = isMobile.isMobile
    console.log('是否为手机',is_mobile.value)
}

//文档
//单次文档列表
export const single_markdown_list = ref([])
export const markdown_body = ref()
//判断窗体
//判断窗体宽度
export const link_imgs = ref([])
export const layout_header_left  = shallowRef()
export const is_left_hide = ref(false)
export const markdown_box = shallowRef()
export const markdown_link_ref =  shallowRef()
export const header =  shallowRef()
//隐藏左边
export const hide_left_button = shallowRef()
const { width } = useWindowSize();
//样式变化
export const window_size_func = () => {
    //监听窗体宽度
    watchThrottled(
        () => width.value, // 监听的依赖
        (newX) => {
            if (!link_imgs.value ) return;
            console.log('屏幕宽度', newX)
            //主页图片
            link_imgs.value.forEach(el => {
                if (!el) return;
                el.style.display = newX <= 1280 ? 'none' : 'flex';
            });
            //头部链接列表
            if (!markdown_link_ref.value)  return
            markdown_link_ref.value.style.display = newX <= 750 ? 'none' : 'flex';
            //文档列表
            if (!layout_header_left.value && !markdown_box.value) return;
            layout_header_left.value.style.transform = newX <= 1280 ? 'translateX(-270px)': '';
            layout_header_left.value.style.transform = newX <= 1280 ? is_left_hide.value = true: is_left_hide.value = false;
            markdown_box.value.style.paddingLeft = newX <= 1280 ? "30px": "300px";
            hide_left_button.value.style.right = newX <= 1280 ? '0' : '10px';
            hide_left_button.value.style.transform = newX <= 1280 ? 'rotate(180deg)' : 'rotate(0)';
        },
        { throttle: 500,immediate: true }
    )
}

