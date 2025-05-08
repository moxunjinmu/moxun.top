import { ref, computed } from 'vue'

// 创建一个全局的颜色模式状态
const colorMode = ref('light')

export function useAppColorMode() {
  // 获取当前是否为暗色模式
  const isDark = computed(() => colorMode.value === 'dark')
  
  // 切换颜色模式
  const toggleColorMode = () => {
    colorMode.value = isDark.value ? 'light' : 'dark'
    
    // 更新HTML元素的class以应用主题
    if (process.client) {
      document.documentElement.classList.toggle('dark', isDark.value)
      localStorage.setItem('color-mode', colorMode.value)
    }
  }
  
  // 初始化颜色模式
  const initColorMode = () => {
    if (process.client) {
      // 尝试从localStorage获取用户偏好
      const savedMode = localStorage.getItem('color-mode')
      // 或者使用系统偏好
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      colorMode.value = savedMode || (systemPrefersDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', isDark.value)
    }
  }
  
  return {
    colorMode,
    isDark,
    toggleColorMode,
    initColorMode
  }
} 