<template>
  <section class="py-10">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 最近文章 -->
      <div>
        <h2 class="text-2xl font-bold mb-6 flex items-center">
          <UIcon name="i-carbon-document" class="mr-2" />
          最近文章
        </h2>

        <div class="space-y-4">
          <NuxtLink
            v-for="article in recentArticles"
            :key="article.id"
            :to="article.path"
            class="block"
          >
            <UCard class="transition-all duration-300 hover:shadow-md">
              <div class="flex items-start gap-4">
                <img
                  v-if="article.cover"
                  :src="article.cover"
                  :alt="article.title"
                  class="w-24 h-16 object-cover rounded"
                />
                <div class="flex-1 min-w-0">
                  <h3 class="font-medium text-base line-clamp-1 mb-1 hover:text-primary-500">
                    {{ article.title }}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-2">
                    {{ article.summary }}
                  </p>
                  <div class="flex items-center text-xs text-gray-500">
                    <UIcon name="i-carbon-time" class="mr-1" />
                    <span>{{ article.date }}</span>
                    <UIcon name="i-carbon-view" class="ml-3 mr-1" />
                    <span>{{ article.views }}</span>
                  </div>
                </div>
              </div>
            </UCard>
          </NuxtLink>

          <div class="text-center mt-6">
            <UButton to="/articles" variant="outline">
              查看更多文章
              <template #trailing>
                <UIcon name="i-carbon-arrow-right" />
              </template>
            </UButton>
          </div>
        </div>
      </div>

      <!-- 随手小记 -->
      <div>
        <h2 class="text-2xl font-bold mb-6 flex items-center">
          <UIcon name="i-carbon-notebook" class="mr-2" />
          随手小记
        </h2>

        <div class="space-y-4">
          <UCard
            v-for="note in notes"
            :key="note.id"
            class="transition-all duration-300 hover:shadow-md"
          >
            <div class="flex items-start">
              <UAvatar :src="note.avatar" size="sm" class="mr-3 mt-1" />
              <div class="flex-1">
                <div class="flex justify-between items-center mb-2">
                  <h3 class="font-medium text-sm">{{ note.author }}</h3>
                  <span class="text-xs text-gray-500">{{ note.date }}</span>
                </div>
                <p class="text-sm mb-3">{{ note.content }}</p>
                <div class="flex items-center gap-4">
                  <UButton color="primary" variant="ghost" icon="i-carbon-thumbs-up" size="xs">
                    {{ note.likes }}
                  </UButton>
                  <UButton color="primary" variant="ghost" icon="i-carbon-chat" size="xs">
                    {{ note.comments }}
                  </UButton>
                </div>
              </div>
            </div>
          </UCard>

          <div class="text-center mt-6">
            <UButton to="/notes" variant="outline">
              查看更多小记
              <template #trailing>
                <UIcon name="i-carbon-arrow-right" />
              </template>
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  // 最近文章数据，实际应用中应从API获取
  const recentArticles = [
    {
      id: 1,
      title: "Vue 3 组合式API完全指南",
      summary: "深入探讨Vue 3组合式API的使用方法和最佳实践",
      path: "/articles/vue3-composition-api",
      date: "2023-10-15",
      views: 1528,
    },
    {
      id: 2,
      title: "TypeScript高级类型体操实战",
      summary: "通过实例讲解TypeScript类型系统的高级用法",
      path: "/articles/typescript-advanced-types",
      date: "2023-09-28",
      views: 973,
    },
    {
      id: 3,
      title: "React性能优化实战指南",
      summary: "全面解析React应用性能优化的各种技巧和方法",
      path: "/articles/react-performance",
      date: "2023-09-10",
      views: 1204,
    },
    {
      id: 4,
      title: "Nuxt 3与服务端渲染最佳实践",
      summary: "探索Nuxt 3框架的新特性和服务端渲染的实现方案",
      path: "/articles/nuxt3-ssr",
      date: "2023-08-22",
      views: 865,
    },
  ];

  // 随手小记数据，实际应用中应从API获取
  const notes = [
    {
      id: 1,
      author: "Mo Xun",
      avatar: "/avatar.jpg",
      content:
        "今天发现一个有趣的JS小技巧，使用Object.fromEntries和Object.entries可以轻松过滤对象属性",
      date: "2小时前",
      likes: 12,
      comments: 3,
    },
    {
      id: 2,
      author: "Mo Xun",
      avatar: "/avatar.jpg",
      content: "CSS变量真的很强大，结合calc()函数可以实现很多复杂的动态样式效果，推荐尝试！",
      date: "昨天",
      likes: 18,
      comments: 5,
    },
    {
      id: 3,
      author: "Mo Xun",
      avatar: "/avatar.jpg",
      content:
        "刚刚解决了一个棘手的React状态管理问题，原来是useEffect依赖数组没处理好，分享一下经验...",
      date: "2天前",
      likes: 24,
      comments: 7,
    },
  ];
</script>
