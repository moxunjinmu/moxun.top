<template>
  <div>
    <!-- 自我介绍部分 -->
    <ProfileIntro />

    <!-- 文章分类 -->
    <CategoryGrid />

    <!-- 最近文章和随手小记 -->
    <RecentContent />
  </div>
</template>

<script setup lang="ts">
  import ProfileIntro from "~/components/home/ProfileIntro.vue";
  import CategoryGrid from "~/components/home/CategoryGrid.vue";
  import RecentContent from "~/components/home/RecentContent.vue";

  definePageMeta({
    layout: "default",
  });
</script>
