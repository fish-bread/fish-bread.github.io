import { useDocumentVisibility } from '@vueuse/core'
import { watch, onMounted } from "vue"
import { useRouter } from 'vue-router'

export const changeTitle_func = () => {
    if (typeof window !== 'undefined') {
        const visibility = useDocumentVisibility()
        const router = useRouter()
        let originalTitle = document.title // 保存原始标题
        let timeoutId = null // 用于存储定时器ID
        let isInternalNavigation = false // 标记是否是内部跳转

        // 更新原始标题的函数
        const updateOriginalTitle = () => {
            originalTitle = document.title || 'FishBread的博客'
        }

        // 显示欢迎消息然后恢复标题
        const showWelcomeBack = () => {
            // 如果是内部跳转，则不显示欢迎消息
            if (isInternalNavigation) {
                isInternalNavigation = false
                return
            }

            // 先清除可能存在的上一个定时器
            if (timeoutId) clearTimeout(timeoutId)

            // 显示欢迎消息
            document.title = '欢迎回来!'

            // 1秒后恢复原标题
            timeoutId = setTimeout(() => {
                document.title = originalTitle
            }, 1000)
        }

        // 监听可见性变化
        watch(visibility, (newVal) => {
            if (newVal === 'hidden') {
                document.title = '我会在这里等你...'
            } else {
                showWelcomeBack()
            }
        })

        // 监听路由变化
        router.beforeEach((to, from) => {
            // 如果from和to都存在，说明是内部跳转
            if (from && to) {
                isInternalNavigation = true
            }
        })

        router.afterEach(() => {
            updateOriginalTitle()
            // 只有不是内部跳转时才显示欢迎回来
            if (!isInternalNavigation) {
                showWelcomeBack()
            }
            isInternalNavigation = false // 重置标记
        })

        // 初始化时设置一次
        onMounted(() => {
            updateOriginalTitle()
        })
    }
}