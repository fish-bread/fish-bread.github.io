import dayjs from "dayjs";
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import {onMounted, onUnmounted, ref} from "vue";
// 将状态提到函数外部，确保SSR时不会重复创建
export const data_time = ref('');
export const data_season = ref('');
export const greeting = ref('');

//注册时间
// 注册时间插件
dayjs.extend(quarterOfYear);

// 获取问候语 (纯函数，无副作用)
const getGreeting = () => {
    const hour = dayjs().hour();
    if (hour >= 5 && hour < 9) return '早上好,昨晚过的如何';
    if (hour >= 9 && hour < 11) return '上午好,要来杯茶吗';
    if (hour >= 11 && hour < 13) return '中午好,今天过去了一半了呢';
    if (hour >= 13 && hour < 18) return '下午好,您有眺望过黄昏吗';
    if (hour >= 18 && hour < 23) return '晚上好,要来杯咖啡吗';
    return '已是深夜了,快去休息吧';
};

// 设置季节 (纯函数，无副作用)
const setSeason = () => {
    const now_num = dayjs().quarter();
    data_season.value = ['春季', '夏季', '秋季', '冬季'][now_num - 1];
};

export function useDateTime() {
    // 仅在客户端执行定时器逻辑
    if (typeof window !== 'undefined') {
        onMounted(() => {
            // 初始化时间
            data_time.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
            greeting.value = getGreeting();
            setSeason();

            // 启动定时器
            const greetingInterval = setInterval(() => {
                greeting.value = getGreeting();
            }, 10 * 60 * 1000);

            const timeInterval = setInterval(() => {
                data_time.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
            }, 1000);

            onUnmounted(() => {
                clearInterval(greetingInterval);
                clearInterval(timeInterval);
            });
        });
    } else {
        // SSR模式下直接返回静态时间
        data_time.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
        greeting.value = getGreeting();
        setSeason();
    }

    return { data_time, data_season, greeting };
}
