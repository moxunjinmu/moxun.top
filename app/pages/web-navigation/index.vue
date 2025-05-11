<template>
  <div class="navigation-container">
    <div class="page-title">
      <h1>前端导航</h1>
      <div class="search-box">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="搜索工具、框架或库..." 
          class="search-input"
        >
        <button v-if="searchQuery" class="clear-button" @click="searchQuery = ''">✕</button>
      </div>
      <div class="page-tabs">
        <a 
          v-for="tab in tabs" 
          :key="tab.id" 
          :href="tab.url" 
          class="tab-item"
          :class="{ 'active': activeTab === tab.id }"
          @click.prevent="scrollToSection(tab.url, tab.id)"
        >
          {{ tab.name }}
        </a>
      </div>
    </div>

    <section 
      v-for="section in filteredSections" 
      :id="section.id"
      :key="section.id" 
      class="nav-section"
    >
      <h2 class="section-title">
        <span class="hash-tag">#</span> {{ section.title }}
      </h2>
      <div class="card-container">
        <a 
          v-for="(card, index) in section.cards" 
          :key="card.id" 
          :href="card.url" 
          target="_blank" 
          rel="noopener noreferrer"
          class="nav-card"
          :style="{ '--card-index': index }"
        >
          <div class="card-icon">
            <img v-if="card.icon" :src="card.icon" :alt="card.name" @error="handleImageError">
            <div v-else class="icon-placeholder" :style="{ backgroundColor: getRandomColor(card.name) }">
              {{ card.name.charAt(0).toUpperCase() }}
            </div>
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ card.name }}</h3>
            <p v-if="card.description" class="card-description">{{ card.description }}</p>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const searchQuery = ref('');
const activeTab = ref(1);

// 滚动到指定部分
function scrollToSection(hash, tabId) {
  activeTab.value = tabId;
  if (hash === '#') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  
  const element = document.querySelector(hash);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// 监听滚动事件来更新活动标签
function handleScroll() {
  const scrollPosition = window.scrollY;
  
  // 如果在顶部，激活第一个标签
  if (scrollPosition < 100) {
    activeTab.value = 1;
    return;
  }
  
  // 检查每个部分的位置
  for (const section of sections) {
    const element = document.getElementById(section.id);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        const matchingTab = tabs.find(tab => tab.url === `#${section.id}`);
        if (matchingTab) {
          activeTab.value = matchingTab.id;
        }
        break;
      }
    }
  }
}

// 在组件挂载时添加滚动监听器和键盘快捷键
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('keydown', handleKeydown);
  handleScroll(); // 初始检查
});

// 处理键盘快捷键
function handleKeydown(event) {
  // 按下 / 键时聚焦搜索框
  if (event.key === '/' && document.activeElement.tagName !== 'INPUT') {
    event.preventDefault();
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }
  
  // ESC 键清空搜索框
  if (event.key === 'Escape' && searchQuery.value) {
    searchQuery.value = '';
  }
}

// 在组件卸载时移除监听器
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('keydown', handleKeydown);
});

const tabs = [
  { id: 1, name: '本页目录', url: '#' },
  { id: 2, name: 'AI 助手', url: '#ai-assistant' },
  { id: 3, name: '常用工具', url: '#common-tools' },
  { id: 4, name: 'Vue 生态', url: '#vue-ecosystem' },
  { id: 5, name: 'React 生态', url: '#react-ecosystem' },
  { id: 6, name: 'JS框架类库', url: '#js-frameworks' },
  { id: 7, name: 'CSS', url: '#css' },
  { id: 8, name: '前端学习资料', url: '#frontend-learning' },
  { id: 9, name: '小程序类型', url: '#mini-programs' },
  { id: 10, name: 'Node 相关', url: '#node-related' },
  { id: 11, name: '可视化方案', url: '#visualization' },
  { id: 12, name: '编译构建部署', url: '#build-deploy' },
  { id: 13, name: '静态站点生成器', url: '#static-site-generators' },
  { id: 14, name: '图标库', url: '#icon-libraries' },
  { id: 15, name: '社区', url: '#community' },
  { id: 16, name: '视频时间', url: '#video-time' }
];

// 过滤部分和卡片基于搜索查询
const filteredSections = computed(() => {
  if (!searchQuery.value) {
    return sections;
  }
  
  const query = searchQuery.value.toLowerCase();
  return sections.map(section => {
    // 过滤符合搜索条件的卡片
    const filteredCards = section.cards.filter(card => 
      card.name.toLowerCase().includes(query) || 
      (card.description && card.description.toLowerCase().includes(query))
    );
    
    // 如果有符合条件的卡片，返回带有过滤卡片的部分
    if (filteredCards.length > 0) {
      return { ...section, cards: filteredCards };
    }
    
    // 如果部分标题符合条件，返回完整部分
    if (section.title.toLowerCase().includes(query)) {
      return section;
    }
    
    // 否则返回带有空卡片数组的部分
    return { ...section, cards: [] };
  }).filter(section => section.cards.length > 0);
});

const sections = [
  {
    id: 'ai-assistant',
    title: 'AI 助手',
    cards: [
      { id: 1, name: 'yeschat(20美4.0)', icon: '/icons/yeschat.png', url: 'https://yeschat.ai', description: '智能 AI 聊天助手' },
      { id: 2, name: 'ChatGPT', icon: '/icons/chatgpt.png', url: 'https://chat.openai.com', description: 'OpenAI 开发的聊天机器人' },
      { id: 3, name: 'Poe(半上墙)', icon: '/icons/poe.png', url: 'https://poe.com', description: 'AI 聊天平台' },
      { id: 4, name: 'Notion AI (笔记)', icon: '/icons/notion.png', url: 'https://notion.so', description: 'AI 增强的笔记工具' },
      { id: 5, name: 'Midjourney (绘画)', icon: '/icons/midjourney.png', url: 'https://midjourney.com', description: 'AI 图像生成工具' },
      { id: 6, name: 'Beautiful.ai (PPT)', icon: '/icons/beautiful-ai.png', url: 'https://beautiful.ai', description: 'AI 驱动的演示文稿创建工具' }
    ]
  },
  {
    id: 'common-tools',
    title: '常用工具',
    cards: [
      { id: 1, name: 'Can I use', icon: '/icons/caniuse.png', url: 'https://caniuse.com', description: '前端 API 兼容性查询' },
      { id: 2, name: 'TinyPNG', icon: '/icons/tinypng.png', url: 'https://tinypng.com', description: '在线图片压缩工具' },
      { id: 3, name: '开发者武器库', icon: '/icons/devtools.png', url: 'https://devtool.tech', description: '开发者武器库，助开发者专业的日常工具箱' },
      { id: 4, name: '在线工具', icon: '/icons/online-tools.png', url: 'https://tool.lu', description: '开发人员的工具箱' },
      { id: 5, name: 'Json 中文网', icon: '/icons/json.png', url: 'https://json.cn', description: 'JSON 在线解析和格式化验证' }
    ]
  },
  {
    id: 'vue-ecosystem',
    title: 'Vue 生态',
    cards: [
      { id: 1, name: 'Vue 3', icon: '/icons/vue3.png', url: 'https://v3.vuejs.org', description: '渐进式 JavaScript 框架' },
      { id: 2, name: 'Vue 2', icon: '/icons/vue2.png', url: 'https://v2.vuejs.org', description: '渐进式 JavaScript 框架' },
      { id: 3, name: 'Vue Router', icon: '/icons/vue-router.png', url: 'https://router.vuejs.org', description: 'Vue.js 的官方路由' },
      { id: 4, name: 'Pinia', icon: '/icons/pinia.png', url: 'https://pinia.vuejs.org', description: 'Vue 的状态管理库' }
    ]
  }
];

// 根据名称生成随机颜色作为图标背景
function getRandomColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 60%)`;
}

// 处理图片加载错误
function handleImageError(event) {
  // 将图片源替换为占位图标
  event.target.src = '/icons/placeholder-icon.svg';
  // 添加错误类以应用特殊样式
  event.target.classList.add('icon-error');
}
</script>

<style scoped>
.navigation-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: var(--font-sans, system-ui, sans-serif);
  min-height: 100vh;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-title {
  margin-bottom: 2rem;
  position: sticky;
  top: 0;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 1rem 0;
  z-index: 10;
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.page-title h1 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.page-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.tab-item {
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #555;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
}

.tab-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #000;
}

.tab-item.active {
  color: var(--color-green-600, #00a155);
  font-weight: 500;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background-color: var(--color-green-500, #00c16a);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.tab-item.active:hover::after {
  width: 30px;
}

.nav-section {
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
  display: flex;
  align-items: center;
}

.hash-tag {
  color: var(--color-green-500, #00c16a);
  margin-right: 0.5rem;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.nav-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  animation: cardAppear 0.5s ease-out;
  animation-fill-mode: both;
  animation-delay: calc(var(--card-index, 0) * 0.05s);
}

@keyframes cardAppear {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.nav-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-color: var(--color-green-200, #b3f5d1);
}

.nav-card:active {
  transform: translateY(-1px);
  transition: transform 0.1s ease;
}

.card-icon {
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  overflow: hidden;
  flex-shrink: 0;
}

.card-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.icon-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 1.25rem;
}

.icon-error {
  filter: grayscale(0.5);
  opacity: 0.8;
  background-color: #f5f5f5;
  padding: 4px;
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 0.9375rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.card-description {
  font-size: 0.75rem;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 搜索框样式 */
.search-box {
  position: relative;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: var(--color-green-400, #00dc82);
  box-shadow: 0 0 0 2px rgba(0, 220, 130, 0.1);
}

.clear-button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.clear-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #666;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .card-container {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  
  .page-tabs {
    gap: 0.5rem;
  }
  
  .tab-item {
    padding: 0.375rem 0.625rem;
    font-size: 0.8125rem;
  }
}

@media (max-width: 480px) {
  .card-container {
    grid-template-columns: 1fr;
  }
  
  .navigation-container {
    padding: 1.5rem 0.75rem;
  }
  
  .page-tabs {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }
  
  .page-tabs::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  .tab-item {
    display: inline-block;
  }
  
  .page-title h1 {
    font-size: 1.5rem;
  }
  
  .search-box {
    max-width: 100%;
  }
  
  .section-title {
    font-size: 1.125rem;
  }
}
</style>
