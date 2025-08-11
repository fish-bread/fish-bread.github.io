// 定义主题配置
import {ref} from "vue";
//判断颜色主题 ture为明,false为暗
export const theme_change =ref('light')
/**
 * 将HEX颜色转换为HSL并调整亮度（无DOM依赖的服务器端版本）
 * @param {string} hexColor - 支持3位或6位HEX格式（带或不带#前缀）
 * @param {number} [lightnessAdjust=-0.1] - 亮度调整值（-1到1）
 * @returns {string} 调整后的HEX颜色
 */
export const calculateHoverColor = (hexColor, lightnessAdjust = -0.1) => {
    // 规范化HEX输入（移除#并扩展3位格式）
    let hex = hexColor.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }
    if (!/^[0-9a-f]{6}$/i.test(hex)) {
        throw new Error('Invalid HEX color format');
    }

    // HEX转RGB（0-1范围）
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    // RGB转HSL
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    } else {
        h = s = 0; // 灰度
    }

    // 调整亮度（限制在0-1的范围内）
    l = Math.max(0, Math.min(1, l + lightnessAdjust));

    // HSL转RGB
    let r1, g1, b1;
    if (s === 0) {
        r1 = g1 = b1 = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r1 = hue2rgb(p, q, h + 1/3);
        g1 = hue2rgb(p, q, h);
        b1 = hue2rgb(p, q, h - 1/3);
    }

    // RGB转HEX
    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.padStart(2, '0');
    };

    return `#${toHex(r1)}${toHex(g1)}${toHex(b1)}`;
};
//主题存储
export const themes = ref({
    light: {
        color: '#000000',
        back_color: '#FFFFFF',
        theme_color: '#FFC0CB',
        scrollbar_color: '#FFFFFF',
        // 计算hover颜色
        get hover_color() {
            return calculateHoverColor(this.theme_color);
        }
    },
    dark: {
        color: '#FFFFFF',
        back_color: '#7a86bd',
        theme_color: '#FFC0CB',
        scrollbar_color: '#464646',
        // 计算hover颜色
        get hover_color() {
            return calculateHoverColor(this.theme_color);
        }
    }
});

//切换颜色
export const change_theme = () => {
    // 确保 theme_change 有值
    if (!theme_change.value) {
        theme_change.value = 'light';
    }

    // 切换主题
    theme_change.value = theme_change.value === 'light' ? 'dark' : 'light';
    
    // 强制重新计算 hover_color
    themes.value = { ...themes.value };
    
    // 更新存储
    set_change_theme();

    // 更新HTML属性
    document.documentElement.setAttribute('data-theme', theme_change.value);
}
//存储主题颜色
export const set_theme = () => {
    localStorage.setItem("theme", JSON.stringify(themes.value))
    console.log('主题存储', JSON.parse(localStorage.getItem('theme')))
}
//存储主题模式
export const set_change_theme = () => {
    localStorage.setItem("theme_change", JSON.stringify(theme_change.value))
    console.log('主题明暗存储', JSON.parse(localStorage.getItem('theme_change')))
}
//读取主题
export const get_theme = () => {
    // 先尝试读取主题明暗设置
    const savedThemeChange = localStorage.getItem('theme_change');

    if (savedThemeChange) {
        theme_change.value = JSON.parse(savedThemeChange);
        console.log('读取主题明暗', theme_change.value);
    } else {
        console.log('未设置主题明暗，使用默认light模式');
        theme_change.value = 'light';
        // 立即保存默认设置到本地存储
        set_change_theme();
    }

    // 然后尝试读取主题颜色设置
    const savedThemes = localStorage.getItem('theme');
    if (savedThemes) {
        themes.value = JSON.parse(savedThemes);
        console.log('读取主题', themes.value);
    } else {
        console.log('未设置主题颜色，使用默认设置');
        // 不需要特别处理，因为 themes 已经有默认值
    }
}

/**
 * 将颜色名称/HEX/RGB转换为RGBA格式（无DOM依赖的服务器端版本）
 * @param {string} color - 支持格式：颜色名称（如"red"）、HEX（如"#ff0000"或"#f00"）、RGB（如"rgb(255,0,0)"）
 * @param {number} [alpha=1] - 透明度（0-1）
 * @returns {string} RGBA格式字符串
 * @throws {Error} 颜色格式无效时抛出错误
 */
export const hexToRGBA = (color, alpha = 1) => {
    // 预定义常见颜色名称的RGB值（可扩展）
    const colorMap = {
        red: [255, 0, 0], green: [0, 255, 0], blue: [0, 0, 255],
        white: [255, 255, 255], black: [0, 0, 0], pink: [255, 192, 203],
        yellow: [255, 255, 0], purple: [128, 0, 128], orange: [255, 165, 0]
    };

    let r, g, b;

    // 1. 处理颜色名称
    if (color.toLowerCase() in colorMap) {
        [r, g, b] = colorMap[color.toLowerCase()];
    }
    // 2. 处理HEX格式（#RGB或#RRGGBB）
    else if (/^#([0-9a-f]{3}){1,2}$/i.test(color)) {
        const hex = color.replace('#', '');
        const expandedHex = hex.length === 3 ?
            hex.split('').map(c => c + c).join('') : hex;
        r = parseInt(expandedHex.substring(0, 2), 16);
        g = parseInt(expandedHex.substring(2, 4), 16);
        b = parseInt(expandedHex.substring(4, 6), 16);
    }
    // 3. 处理RGB格式（rgb(255,255,255)）
    else if (/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i.test(color)) {
        const match = color.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
        r = parseInt(match[1]);
        g = parseInt(match[2]);
        b = parseInt(match[3]);
    } else {
        throw new Error(`Invalid color format: ${color}`);
    }

    // 验证RGB值范围
    if ([r, g, b].some(v => v < 0 || v > 255)) {
        throw new Error(`Invalid RGB value in color: ${color}`);
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
//主页特制透明颜色
export const alpha_back_color = ref();