<template>
  <div class="content">
  </div>
</template>
<script setup>

const route = useRoute()

// 当访问 /posts/1 时，route.params.id 将为 1
console.log(route.params.id)
console.log("组件加载完成...");



</script>

<style lang="less" scoped>

</style>