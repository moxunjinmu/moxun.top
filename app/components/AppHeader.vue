<template>
  <header class="border-b border-gray-200 dark:border-gray-700">
    <div class="container px-4 py-3 mx-auto">
      <div class="flex justify-between items-center">
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
          <UButton
            icon="i-carbon-search"
            color="primary"
            variant="ghost"
            @click="openSearch"
          />

          <!-- Github链接 -->
          <UButton
            icon="i-carbon-logo-github"
            color="primary"
            variant="ghost"
            as="a"
            href="https://github.com/moxunjinmu"
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
          <UButton icon="i-carbon-user" color="primary" variant="soft">
            登录
          </UButton>

          <!-- 移动端菜单按钮 -->
          <UButton
            :icon="isMenuOpen ? 'i-carbon-close' : 'i-carbon-menu'"
            color="primary"
            variant="ghost"
            class="lg:hidden"
            @click="toggleMobileMenu"
          />
        </div>
      </div>
    </div>
  </header>

  <!-- 移动端菜单 -->
  <Transition
    :css="false"
    @enter="onMenuEnter"
    @leave="onMenuLeave"
  >
    <div
      v-if="isMenuOpen"
      class="fixed top-[112px] left-0 right-0 bottom-0 z-50 bg-white dark:bg-gray-900 lg:hidden overflow-y-auto border-t border-gray-200 dark:border-gray-700 origin-top"
      :class="[menuOpacity]"
      @click.self="isMenuOpen = false"
    >
      <div class="container px-4 py-4 mx-auto min-h-full">
        <UNavigationMenu
          :items="navigationItems"
          orientation="vertical"
          class="text-lg"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useNavigationStore, type NavItem } from "~/stores/navigation";
import { useAppColorMode } from "~/composables/useAppColorMode";
// 定义导航项目的结果类型
interface NavItemResult {
  label: string;
  to?: string;
  href?: string;
  target?: string;
  children?: NavItemResult[];
}
// 菜单状态
const isMenuOpen = ref(false);

// 主题切换
const { isDark, toggleColorMode } = useAppColorMode();

// 菜单透明度状态
const menuOpacity = ref("opacity-0");

// 菜单进入动画
const onMenuEnter = (el, done) => {
  // 先设置初始状态
  el.style.opacity = '0';
  el.style.transform = 'scaleY(0.8)';
  el.style.transformOrigin = 'top';
  
  // 使用 GSAP 或原生 JS 实现动画
  // 先执行形状变化
  setTimeout(() => {
    el.style.transition = 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)';
    el.style.transform = 'scaleY(1)';
    
    // 形状变化完成后执行透明度变化
    setTimeout(() => {
      el.style.transition = 'opacity 200ms ease-out';
      el.style.opacity = '1';
      
      // 完成动画
      setTimeout(done, 200);
    }, 300);
  }, 50);
};

// 菜单离开动画
const onMenuLeave = (el, done) => {
  // 先执行透明度变化
  el.style.transition = 'opacity 150ms ease-in';
  el.style.opacity = '0';
  
  // 透明度变化完成后执行形状变化
  setTimeout(() => {
    el.style.transition = 'transform 250ms cubic-bezier(0.4, 0.0, 0.2, 1)';
    el.style.transform = 'scaleY(0.7)';
    
    // 完成动画
    setTimeout(done, 250);
  }, 150);
};

// 切换移动端菜单
const toggleMobileMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  
  // 当菜单打开时，禁止页面滚动
  if (isMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    // 延迟恢复滚动，等待动画完成
    setTimeout(() => {
      document.body.style.overflow = "";
    }, 400);
  }
};

// 搜索功能
const openSearch = () => {
  // 实现搜索功能
  alert("搜索功能待实现");
};

// 导航数据
const navigationStore = useNavigationStore();
const navigationItems = computed(() => {
  return navigationStore.navItems.map((item: NavItem) => {
    const mapNavItem = (navItem: NavItem) => {
      const result: NavItemResult = {
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
