<template>
  <header class="border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- 左侧头像 -->
        <div class="flex items-center">
          <UAvatar src="/avatar.jpg" alt="头像" size="lg" class="mr-3" />
          <h1 class="text-xl font-bold">Mo Xun</h1>
        </div>

        <!-- 中间导航菜单 -->
        <nav class="hidden lg:block">
          <UNavigationMenu :items="navigationItems" />
        </nav>

        <!-- 右侧功能区 -->
        <div class="flex items-center space-x-4">
          <!-- 搜索按钮 -->
          <UButton icon="i-carbon-search" color="primary" variant="ghost" @click="openSearch" />

          <!-- Github链接 -->
          <UButton
            icon="i-carbon-logo-github"
            color="primary"
            variant="ghost"
            as="a"
            href="https://github.com/your-username"
            target="_blank"
          />

          <!-- 主题切换 -->
          <UButton
            :icon="isDark ? 'i-carbon-moon' : 'i-carbon-sun'"
            color="primary"
            variant="ghost"
            @click="toggleColorMode"
          />

          <!-- 登录按钮 -->
          <UButton icon="i-carbon-user" color="primary" variant="soft"> 登录 </UButton>

          <!-- 移动端菜单按钮 -->
          <USlideover>
            <UButton
              icon="i-carbon-menu"
              color="primary"
              variant="ghost"
              class="lg:hidden"
              @click="isMenuOpen = !isMenuOpen"
            />
            <template #content>
              <div class="p-2">
                <h2 class="text-xl font-bold mb-2">导航菜单</h2>
                <UNavigationMenu :items="navigationItems" orientation="vertical" />
              </div>
            </template>
          </USlideover>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { ref, computed } from "vue";
  import { useNavigationStore } from "~/stores/navigation";
  import { useAppColorMode } from "~/composables/useAppColorMode";

  // 菜单状态
  const isMenuOpen = ref(false);

  // 主题切换
  const { isDark, toggleColorMode } = useAppColorMode();

  // 搜索功能
  const openSearch = () => {
    // 实现搜索功能
    alert("搜索功能待实现");
  };

  // 导航数据
  const navigationStore = useNavigationStore();
  const navigationItems = computed(() => {
    return navigationStore.navItems.map((item: any) => {
      const mapNavItem = (navItem: any) => {
        const result: any = {
          label: navItem.name,
          to: navItem.path,
          href: navItem.external ? navItem.path : undefined,
          target: navItem.external ? "_blank" : undefined,
        };
        if (navItem.path) delete result.href;

        if (navItem.children?.length) {
          result.children = navItem.children.map(mapNavItem);
        }

        return result;
      };

      return mapNavItem(item);
    });
  });
</script>
