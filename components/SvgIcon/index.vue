<template>
  <Icon v-if="!isExt" :class="svgClass" :name="iconName" />
  <template v-else>
    <!-- v-bind="$attrs" 这样当 进入到 这里的时候 不会丢失事件 跨组件传递 -->
    <div :style="styleExternalIcon" :class="svgClass" bg-current v-bind="$attrs"></div>
  </template>
</template>

<script setup lang="ts">
  import { isExternal } from "@/utils/validate";

  // vue3.5 是可以支持解构 保持响应式的 但是 加了 withDefaults 就会失去响应式 所以这样不能直接解构
  const props = withDefaults(
    defineProps<{
      iconName: string;
      customClass?: string;
    }>(),
    {
      customClass: "",
    },
  );

  // 判断是否 是外链
  const isExt = computed(() => isExternal(props.iconName));

  // 合成 类名将定义好的初始化 icon 进行整合传递进行来的类名
  const svgClass = computed(() => (props.customClass ? `icon ${props.customClass}` : "icon"));

  // 使用 mask 渲染 svg 图标 兼容性不是很好
  const styleExternalIcon = computed(() => ({
    mask: `url(${props.iconName}) no-repeat 50% 50%`,
    "-webkit-mask": `url(${props.iconName}) no-repeat 50% 50%`,
    "mask-size": "cover",
  }));
</script>

<style scoped></style>
