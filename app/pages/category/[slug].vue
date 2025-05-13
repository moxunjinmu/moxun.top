<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAsyncData } from '#app';
import { queryContent } from '#content';
import { useNavigationStore, type NavItem } from '~/stores/navigation';

const route = useRoute();
const slug = computed(() => route.params.slug as string);

// 定义文章类型接口
interface Article {
  _id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  content?: string;
  _type?: string;
  // 使用更具体的类型替代 any
  [key: string]: string | number | boolean | string[] | undefined;
}

// 定义标题类型接口
interface Heading {
  level: number;
  text: string;
  id: string;
}

// 状态变量
const isLoading = ref(true);
const activeArticleId = ref('');
const currentCategory = ref<string>('');
const categoryArticles = ref<Article[]>([]);
const articleContent = ref<Article | null>(null);
const articleHeadings = ref<Heading[]>([]);
const prevArticle = ref<Article | null>(null);
const nextArticle = ref<Article | null>(null);

// 从导航存储中获取当前分类信息
const navigationStore = useNavigationStore();
const currentCategoryInfo = computed(() => {
  // 扁平化导航项目以便搜索
  const flattenNavItems = (items: NavItem[]): NavItem[] => {
    return items.reduce((acc: NavItem[], item) => {
      if (item.children && item.children.length > 0) {
        return [...acc, item, ...flattenNavItems(item.children)];
      }
      return [...acc, item];
    }, []);
  };
  
  const allItems = flattenNavItems(navigationStore.navItems);
  return allItems.find(item => item.path === `/category/${slug.value}`);
});

// 获取分类文章列表
const fetchCategoryArticles = async () => {
  isLoading.value = true;
  try {
    // 尝试从本地内容获取
    const { data } = await useAsyncData(`category-${slug.value}`, () =>
      queryContent(slug.value).find()
    );
    
    if (data.value && data.value.length > 0) {
      categoryArticles.value = data.value;
    } else {
      // 如果本地没有内容，可以从API获取
      // 这里模拟一些示例文章
      categoryArticles.value = [
        {
          _id: '1',
          title: `${slug.value}的第一篇文章`,
          description: '这是一篇示例文章',
          date: '2025-05-10',
          slug: `${slug.value}-article-1`
        },
        {
          _id: '2',
          title: `${slug.value}的第二篇文章`,
          description: '这是另一篇示例文章',
          date: '2025-05-09',
          slug: `${slug.value}-article-2`
        },
        {
          _id: '3',
          title: `${slug.value}的第三篇文章`,
          description: '这是第三篇示例文章',
          date: '2025-05-08',
          slug: `${slug.value}-article-3`
        }
      ];
    }
    
    // 默认选择第一篇文章
    if (categoryArticles.value.length > 0 && !activeArticleId.value) {
      activeArticleId.value = categoryArticles.value[0]._id;
      await fetchArticleContent(activeArticleId.value);
    }
  } catch (error) {
    console.error('获取分类文章失败:', error);
  } finally {
    isLoading.value = false;
  }
};

// 获取文章内容
const fetchArticleContent = async (articleId: string) => {
  isLoading.value = true;
  try {
    const selectedArticle = categoryArticles.value.find(article => article._id === articleId);
    
    if (selectedArticle) {
      // 尝试从本地内容获取
      const { data } = await useAsyncData(`article-${articleId}`, () =>
        queryContent(slug.value, selectedArticle.slug).findOne()
      );
      
      if (data.value) {
        articleContent.value = data.value;
      } else {
        // 如果本地没有内容，使用模拟数据
        articleContent.value = {
          ...selectedArticle,
          content: `# ${selectedArticle.title}\n\n${selectedArticle.description}\n\n## 第一部分\n\n这是文章的第一部分内容。\n\n## 第二部分\n\n这是文章的第二部分内容。\n\n## 第三部分\n\n这是文章的第三部分内容。`
        };
      }
      
      // 提取文章标题作为目录
      extractHeadings(articleContent.value.content || '');
      
      // 设置上一篇和下一篇文章
      setPrevNextArticles(articleId);
    }
  } catch (error) {
    console.error('获取文章内容失败:', error);
  } finally {
    isLoading.value = false;
  }
};

// 提取文章标题作为目录
const extractHeadings = (content: string) => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/\s+/g, '-');
    
    headings.push({
      level,
      text,
      id
    });
  }
  
  articleHeadings.value = headings;
};

// 设置上一篇和下一篇文章
const setPrevNextArticles = (currentId: string) => {
  const currentIndex = categoryArticles.value.findIndex(article => article._id === currentId);
  
  if (currentIndex > 0) {
    prevArticle.value = categoryArticles.value[currentIndex - 1];
  } else {
    prevArticle.value = null;
  }
  
  if (currentIndex < categoryArticles.value.length - 1) {
    nextArticle.value = categoryArticles.value[currentIndex + 1];
  } else {
    nextArticle.value = null;
  }
};

// 切换文章
const selectArticle = async (articleId: string) => {
  if (articleId !== activeArticleId.value) {
    activeArticleId.value = articleId;
    await fetchArticleContent(articleId);
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// 监听路由变化，重新获取分类文章
watch(() => route.params.slug, async () => {
  currentCategory.value = slug.value;
  activeArticleId.value = '';
  await fetchCategoryArticles();
}, { immediate: true });

// 页面加载时获取分类文章
onMounted(async () => {
  currentCategory.value = slug.value;
  await fetchCategoryArticles();
});
</script>

<template>
  <div class="category-page">
    <!-- 分类标题 -->
    <div class="category-header mb-6">
      <h1 class="text-2xl font-bold">
        {{ currentCategoryInfo?.name || slug }} 分类
      </h1>
      <p class="text-gray-500 dark:text-gray-400">
        共 {{ categoryArticles.length }} 篇文章
      </p>
    </div>
    
    <!-- 三栏布局 -->
    <div class="category-content grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- 左侧文章列表 -->
      <div class="lg:col-span-3 category-sidebar">
        <div class="sticky top-24 overflow-y-auto max-h-[calc(100vh-150px)] p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h2 class="text-lg font-bold mb-4">文章列表</h2>
          <ul class="space-y-2">
            <li v-for="article in categoryArticles" :key="article._id">
              <button
                class="w-full text-left p-2 rounded transition-colors"
                :class="{
                  'bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-200': article._id === activeArticleId,
                  'hover:bg-gray-100 dark:hover:bg-gray-700': article._id !== activeArticleId
                }"
                @click="selectArticle(article._id)"
              >
                <div class="font-medium line-clamp-2">{{ article.title }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ article.date }}</div>
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- 中间文章内容 -->
      <div class="lg:col-span-6 category-content">
        <div v-if="isLoading" class="flex justify-center items-center h-64">
          <UIcon name="i-carbon-circle-dash" class="animate-spin text-4xl text-primary-500" />
        </div>
        
        <div v-else-if="articleContent" class="article-container bg-white dark:bg-gray-800 p-6 rounded-lg">
          <!-- 文章头部 -->
          <div class="article-header mb-6">
            <h1 class="text-2xl font-bold">{{ articleContent.title }}</h1>
            <p class="text-gray-500 dark:text-gray-400 mt-2">{{ articleContent.date }}</p>
            <p class="text-gray-700 dark:text-gray-300 mt-2">{{ articleContent.description }}</p>
          </div>
          
          <!-- 文章内容 -->
          <div class="article-body prose dark:prose-invert max-w-none">
            <!-- 如果是本地MD文件 -->
            <template v-if="articleContent._type === 'markdown'">
              <ContentRenderer :value="articleContent" />
            </template>
            <!-- 如果是API返回的MD内容 -->
            <template v-else>
              <!-- 使用安全的方式渲染Markdown内容 -->
              <ContentRendererMarkdown :value="{ body: articleContent.content || '' }" />
            </template>
          </div>
          
          <!-- 上一篇/下一篇导航 -->
          <div class="article-navigation mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-4">
            <div v-if="prevArticle" class="prev-article">
              <button 
                class="group flex flex-col items-start"
                @click="selectArticle(prevArticle._id)"
              >
                <span class="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <UIcon name="i-carbon-arrow-left" class="mr-1" /> 上一篇
                </span>
                <span class="font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-1">
                  {{ prevArticle.title }}
                </span>
              </button>
            </div>
            
            <div v-if="nextArticle" class="next-article ml-auto text-right">
              <button 
                class="group flex flex-col items-end"
                @click="selectArticle(nextArticle._id)"
              >
                <span class="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  下一篇 <UIcon name="i-carbon-arrow-right" class="ml-1" />
                </span>
                <span class="font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-1">
                  {{ nextArticle.title }}
                </span>
              </button>
            </div>
          </div>
        </div>
        
        <div v-else class="flex justify-center items-center h-64 bg-white dark:bg-gray-800 p-6 rounded-lg">
          <p class="text-gray-500 dark:text-gray-400">没有找到文章内容</p>
        </div>
      </div>
      
      <!-- 右侧目录导航 -->
      <div class="lg:col-span-3 toc-sidebar hidden lg:block">
        <div class="sticky top-24 overflow-y-auto max-h-[calc(100vh-150px)] p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h2 class="text-lg font-bold mb-4">文章目录</h2>
          <ul v-if="articleHeadings.length > 0" class="space-y-2">
            <li 
              v-for="(heading, index) in articleHeadings" 
              :key="index"
              :class="{
                'pl-0': heading.level === 1,
                'pl-2': heading.level === 2,
                'pl-4': heading.level === 3,
                'pl-6': heading.level === 4,
                'pl-8': heading.level === 5,
                'pl-10': heading.level === 6
              }"
            >
              <a 
                :href="`#${heading.id}`" 
                class="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                :class="{
                  'font-bold': heading.level === 1,
                  'font-medium': heading.level === 2,
                  'font-normal': heading.level > 2
                }"
              >
                {{ heading.text }}
              </a>
            </li>
          </ul>
          <p v-else class="text-gray-500 dark:text-gray-400">暂无目录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-body :deep(h1),
.article-body :deep(h2),
.article-body :deep(h3),
.article-body :deep(h4),
.article-body :deep(h5),
.article-body :deep(h6) {
  scroll-margin-top: 100px;
}

.article-body :deep(pre) {
  @apply bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto;
}

.article-body :deep(code) {
  @apply font-mono text-sm;
}

.article-body :deep(blockquote) {
  @apply border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic;
}

.article-body :deep(ul),
.article-body :deep(ol) {
  @apply pl-6;
}

.article-body :deep(ul) {
  @apply list-disc;
}

.article-body :deep(ol) {
  @apply list-decimal;
}

.article-body :deep(a) {
  @apply text-primary-600 dark:text-primary-400 hover:underline;
}

.article-body :deep(table) {
  @apply w-full border-collapse;
}

.article-body :deep(th),
.article-body :deep(td) {
  @apply border border-gray-300 dark:border-gray-700 p-2;
}

.article-body :deep(th) {
  @apply bg-gray-100 dark:bg-gray-800;
}
</style>
