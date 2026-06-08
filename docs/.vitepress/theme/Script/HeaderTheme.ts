import {computed, Ref} from 'vue'
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()

export const headerStyle = computed(() => {
    const isTop = y.value === 0

    if (isTop) {
        return {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(0px)'
        }
    } else {
        const scrollAmount = Math.min(y.value, 200)
        const opacity = scrollAmount / 200 * 0.3
        const blurAmount = Math.min(scrollAmount / 20, 10)
        return {
            backgroundColor: `rgba(36, 36, 36, ${opacity})`,
            backdropFilter: `blur(${blurAmount}px)`
        }
    }
})