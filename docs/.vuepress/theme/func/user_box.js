import {ref, shallowRef} from "vue";
//用户头像
export const user_img = shallowRef() 
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
//用户点击头像
export const user_click_img = () => {
    
}
//鼠标进入用户头像
export const user_enter_img = () => {
    const imgElement = user_img.value.querySelector('img');
    imgElement.style.opacity = '0'; // 先淡出
    setTimeout(() => {
        imgElement.src = imgElement.src.includes('head_1')
            ? '/images/user_head/head_2.png'
            : '/images/user_head/head_1.png';
        imgElement.style.opacity = '1'; // 再淡入
    }, 200); // 200ms 的过渡时间
    //候选 user_img.value.style.transform = "scale(1.1)";
     user_img.value.style.transform = "rotate(360deg)";
} 
//鼠标离开用户头像
export const user_leave_img = () => {
    const imgElement = user_img.value.querySelector('img');
    imgElement.style.opacity = '0'; // 先淡出
    setTimeout(() => {
        imgElement.src = imgElement.src.includes('head_1')
            ? '/images/user_head/head_2.png'
            : '/images/user_head/head_1.png';
        imgElement.style.opacity = '1'; // 再淡入
    }, 200); // 200ms 的过渡时间
    //候选 user_img.value.style.transform = "scale(1)";
     user_img.value.style.transform = "rotate(0)";
}