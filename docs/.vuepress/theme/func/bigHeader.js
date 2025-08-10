//与移动有关的ref
import {ref, shallowRef} from "vue";
import {useWindowScroll} from "@vueuse/core";
//标题名
export const big_title = ref()
export const layout_header = shallowRef()
export const layout_header_title = shallowRef()
export const layout_header_left_list = shallowRef()
export const headerHeight = ref('240px')
export const { y } = useWindowScroll()