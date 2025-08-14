import {onMounted, ref} from "vue";
import { useElementBounding } from '@vueuse/core'
import { markdown_link_ref } from "./clientchoose.js";
export const moveUnderline = (index) => {
        const box = boxRefs.value[index]
        if (!box || !underlineRef.value) return

        const { left, width } = useElementBounding(box)
        const { left: parentLeft } = useElementBounding(markdown_link_ref)

        underlineRef.value.style.transform = `translateX(${left.value - parentLeft.value}px)`
        underlineRef.value.style.width = `${width.value}px`
}
//导航栏refs
export const is_link_hover = ref(false)
export const underlineRef = ref()
export const boxRefs = ref([])
export const setBoxRef = (el, index) => {
    if (el) boxRefs.value[index] = el
}