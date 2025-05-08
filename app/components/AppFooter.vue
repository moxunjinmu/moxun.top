<template>
  <footer class="bg-gray-100 dark:bg-gray-800 py-8 mt-10">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            © {{ new Date().getFullYear() }} Mo Xun 博客 |
            <a href="https://beian.miit.gov.cn/" target="_blank" class="hover:underline"
              >备案号: 粤ICP备XXXXXXXX号</a
            >
          </p>
        </div>

        <div class="flex space-x-4">
          <UButton
            icon="i-carbon-logo-github"
            color="primary"
            variant="ghost"
            as="a"
            href="https://github.com/your-username"
            target="_blank"
          />
          <UButton
            icon="i-carbon-email"
            color="primary"
            variant="ghost"
            as="a"
            href="mailto:your-email@example.com"
            target="_blank"
          />
          <UButton icon="i-carbon-logo-wechat" color="primary" variant="ghost" />
        </div>
      </div>

      <div class="mt-4 text-center text-xs text-gray-500 dark:text-gray-500">
        基于 Nuxt 3 构建 | 网站内容遵循 CC BY-NC-SA 4.0 协议
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  // 网站底部组件
</script>
