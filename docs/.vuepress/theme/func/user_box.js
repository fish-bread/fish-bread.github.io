import {ref, shallowRef} from "vue";
//用户头像
export const is_hide_user_box = ref(false);
//显示隐藏用户
export const change_user_box = () => {
    if (is_hide_user_box.value === true) {
        is_hide_user_box.value = false;  
    } else {
        is_hide_user_box.value = true;
    }
}
//小球滚动
export const ball = shallowRef()