import dayjs from "dayjs";
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import {onMounted, onUnmounted, ref} from "vue";
dayjs.extend(quarterOfYear)

export function useDateTime() {
    const data_time = ref('');
    const data_season = ref('');
    const greeting = ref(''); // 新增问候语

    // 获取问候语
    const getGreeting = () => {
        const hour = dayjs().hour();
        if (hour >= 5 && hour < 9) {
            return '早上好,昨晚过的如何';
        } else if (hour >= 9 && hour < 11) {
            return '上午好,要来杯茶吗';
        } else if (hour >= 11 && hour < 13) {
            return '中午好,今天过去了一半了呢';
        } else if (hour >= 13 && hour < 18) {
            return '下午好,您有眺望过黄昏吗';
        } else if (hour >= 18 && hour < 23) {
            return '晚上好,要来杯咖啡吗';
        } else {
            return '已是深夜了,快去休息吧';
        }
    };
    
    // 设置时间
    const set_time_setInterval = () => {
        data_time.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
        greeting.value = getGreeting(); // 更新问候语
        
        // 每10分钟更新问候语
        const greetingInterval = setInterval(() => {
            greeting.value = getGreeting();
        }, 10 * 60 * 1000); // 10分钟 = 600,000ms

        // 每秒更新时间
        const timeInterval = setInterval(() => {
            data_time.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
        }, 1000);

        return () => {
            clearInterval(timeInterval);
            clearInterval(greetingInterval);
        };
    };

    // 设置季节
    const set_season = () => {
        const now_num = dayjs().quarter();
        data_season.value = ['春季', '夏季', '秋季', '冬季'][now_num - 1];
    };

    onMounted(() => {
        const timer = set_time_setInterval();
        set_season();

        onUnmounted(() => {
            clearInterval(timer);
        });
    });

    return { data_time, data_season,greeting };
}