<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1 container mx-auto px-4 py-8">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
  // 默认布局，包含导航栏和主体内容区域
</script>
