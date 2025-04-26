<template>
  <div>根页面111</div>
  <div class="p-4 bg-gray-100">
    <h1 class="text-2xl font-bold btn">Hello UnoCSS</h1>
  </div>
  <div>
    <div class="i-ant-design-aim-outlined" />
    <!-- 亮色模式下的太阳，暗色模式下的月亮，来自 Carbon -->
    <button class="i-carbon-sun dark:i-carbon-moon" />
    <!-- 来自 Material Design 图标库的橙色警报 -->
    <div class="i-mdi-alarm text-orange-400" />
    <SvgIcon iconName="ant-design-aim-outlined" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
