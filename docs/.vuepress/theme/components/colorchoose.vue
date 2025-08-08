<!--suppress ALL -->
<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { themes, theme_change, set_theme, calculateHoverColor } from '../func/newColor.js';
import { showPrompt} from "../func/prompt_box.js";
import { useDebounceFn } from '@vueuse/core'
// 当前主题模式
const currentMode = ref(theme_change.value);
// 临时主题设置
const tempTheme = ref({
  ...themes.value[currentMode.value]
});
// 计算属性
const themeModeText = computed(() => currentMode.value === 'light' ? '暗' : '明');
const currentThemeStyle = computed(() => ({
  '--text-color': tempTheme.value.color,
  '--bg-color': tempTheme.value.back_color,
  '--theme-color': tempTheme.value.theme_color,
  '--hover-color': calculateHoverColor(tempTheme.value.theme_color)
}));
const previewStyle = computed(() => ({
  color: tempTheme.value.color,
  backgroundColor: tempTheme.value.back_color,
  border: `2px solid ${tempTheme.value.theme_color}`
}));
// 方法
const toggleThemeMode = () => {
  theme_change.value = theme_change.value === 'light' ? 'dark' : 'light';
  themes.value[currentMode.value] = { ...tempTheme.value };
  tempTheme.value = {
    ...themes.value[theme_change.value]
  };
};
//更新主题
const updateTheme = () => {
  themes.value[currentMode.value] = {
    ...tempTheme.value,
    hover_color: calculateHoverColor(tempTheme.value.theme_color)
  };
};
//恢复默认
const resetToDefault = () => {
  const defaultThemes = {
    light: {
      color: '#000000',
      back_color: '#FFFFFF',
      theme_color: '#FFC0CB',
      scrollbar_color: '#FFFFFF',
      hover_color: calculateHoverColor('#FFC0CB')
    },
    dark: {
      color: '#FFFFFF',
      back_color: '#7a86bd',
      theme_color: '#FFC0CB',
      scrollbar_color: '#464646',
      hover_color: calculateHoverColor('#FFC0CB')
    }
  };

  themes.value = defaultThemes;
  tempTheme.value = {
    ...defaultThemes[currentMode.value]
  };
  //弹出重置提示框
  showPrompt('您成功重置了主题', 'success')
};
//保存主题
const saveTheme = useDebounceFn(() => {
  themes.value[currentMode.value] = { ...tempTheme.value };
  set_theme();
  //弹出保存提示框
  showPrompt('您成功设置了主题', 'success')
}, 200)
onMounted(() => {
  // 监听主题模式变化
  watch(theme_change, (newVal) => {
    currentMode.value = newVal;
    tempTheme.value = {
      ...themes.value[currentMode.value]
    };
  }, {
    immediate: true
  });

})
</script>

<template>
  <div class="theme-picker" :style="currentThemeStyle">
      <h3>主题颜色设置</h3>
      <div class="color-picker-group">
        <div class="color-picker">
          <label for="theme-color">主题色:</label>
          <input type="color" id="theme-color" v-model="tempTheme.theme_color" @input="updateTheme">
          <span>{{ tempTheme.theme_color }}</span>
        </div>

        <div class="color-picker">
          <label for="background-color">背景色:</label>
          <input type="color" id="background-color" v-model="tempTheme.back_color" @input="updateTheme">
          <span>{{ tempTheme.back_color }}</span>
        </div>

        <div class="color-picker">
          <label for="text-color">文字颜色:</label>
          <input type="color" id="text-color" v-model="tempTheme.color" @input="updateTheme">
          <span>{{ tempTheme.color }}</span>
        </div>
      </div>

      <div class="theme-toggle">
        <button @click="toggleThemeMode">切换到{{ themeModeText }}模式</button>
      </div>

      <div class="preview" :style="previewStyle">
        <p>这是一个预览文本，展示您选择的颜色组合效果。</p>
        <button class="preview-button">示例按钮</button>
      </div>

      <div class="actions">
        <div class="concentrate">注:(重置主题后须保存生效,保存时是明暗主题一起保存)</div>
        <button @click="resetToDefault">重置为默认</button>
        <button @click="saveTheme">保存主题</button>
      </div>
  </div>
</template>

<style scoped>
.concentrate {
  position: absolute;
  color: var(--theme-color);
  top: 35px;
  font-size: 13px;
}
.theme-picker {
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  margin: 0 auto;
  background-color: var(--bg-color);
  color: var(--text-color);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.theme-picker:hover {
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.4);
  transform: translateY(-2px);
}
h3 {
  margin-top: 0;
  color: var(--theme-color);
}

.color-picker-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.color-picker {
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-picker label {
  min-width: 80px;
}

.color-picker input[type="color"] {
  width: 50px;
  height: 30px;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.theme-toggle {
  margin-bottom: 20px;
}

.theme-toggle button {
  padding: 8px 16px;
  background-color: var(--theme-color);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.theme-toggle button:hover {
  background-color: var(--hover-color);
}

.preview {
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.preview-button {
  padding: 8px 16px;
  background-color: var(--theme-color);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.preview-button:hover {
  background-color: var(--hover-color);
}

.actions {
  display: flex;
  gap: 10px;
  position: relative;
}

.actions button {
  padding: 8px 16px;
  border: 1px solid var(--theme-color);
  background-color: transparent;
  color: var(--theme-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.actions button:hover {
  background-color: var(--theme-color);
  color: white;
}
</style>