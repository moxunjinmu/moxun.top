<template>
  <section class="py-10">
    <h2 class="text-2xl font-bold mb-6 flex items-center">
      <UIcon name="i-carbon-category" class="mr-2" />
      文章分类
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <NuxtLink
        v-for="category in categories"
        :key="category.name"
        :to="category.path"
        class="block group"
      >
        <UCard class="h-full transition-all duration-300 group-hover:shadow-lg p-4">
          <template #header>
            <div class="flex justify-center py-4 bg-primary-50 dark:bg-primary-950">
              <UIcon :name="category.icon" class="text-4xl text-primary-500" />
            </div>
          </template>

          <div class="text-center">
            <h3 class="text-lg font-medium group-hover:text-primary-500">{{ category.name }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ category.count }}篇文章</p>
          </div>
        </UCard>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
  // 分类数据，实际应用中应从API获取
  const categories = [
    {
      name: "JavaScript",
      path: "/category/javascript",
      icon: "mdi:language-javascript",
      count: 18,
    },
    {
      name: "TypeScript",
      path: "/category/typescript",
      icon: "mdi:language-typescript",
      count: 12,
    },
    { name: "Vue", path: "/category/vue", icon: "i-carbon-logo-vue", count: 24 },
    { name: "React", path: "/category/react", icon: "i-carbon-logo-react", count: 15 },
    { name: "Node.js", path: "/category/nodejs", icon: "mdi:nodejs", count: 9 },
    { name: "Java", path: "/category/java", icon: "mdi:language-java", count: 7 },
    { name: "前端工程化", path: "/category/engineering", icon: "carbon:build-image", count: 13 },
    { name: "后端开发", path: "/category/backend", icon: "i-carbon-data-base", count: 10 },
  ];
</script>
