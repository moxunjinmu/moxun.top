<template>
  <section class="py-12 bg-gray-50 dark:bg-gray-900 rounded-xl my-6">
    <div class="flex flex-col md:flex-row items-center max-w-4xl mx-auto px-6">
      <div class="w-full md:w-1/3 mb-8 md:mb-0 flex justify-center">
        <UAvatar
          src="/avatar.jpg"
          alt="个人头像"
          size="2xl"
          class="border-4 border-white dark:border-gray-800 shadow-xl"
        />
      </div>
      <div class="w-full md:w-2/3">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">👋 你好，我是 Mo Xun</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          资深前端工程师和全栈开发者，热爱探索web技术的边界。专注于构建高性能、用户友好的应用程序，
          擅长Vue、React生态系统，同时熟练掌握Node.js和Java后端技术。
        </p>
        <div class="flex flex-wrap gap-2">
          <UBadge color="primary" variant="soft">Vue.js</UBadge>
          <UBadge color="primary" variant="soft">React</UBadge>
          <UBadge color="primary" variant="soft">TypeScript</UBadge>
          <UBadge color="primary" variant="soft">Node.js</UBadge>
          <UBadge color="primary" variant="soft">Nuxt</UBadge>
          <UBadge color="primary" variant="soft">Java</UBadge>
        </div>
        <div class="mt-6 flex space-x-3">
          <UButton
            icon="i-carbon-logo-github"
            to="https://github.com/your-username"
            target="_blank"
          >
            GitHub
          </UButton>
          <UButton
            icon="i-carbon-email"
            to="mailto:your-email@example.com"
            variant="outline"
          >
            联系我
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 个人介绍组件
</script> 