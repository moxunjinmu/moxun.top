// https://content.nuxt.com/get-started/configuration
export default defineContentConfig({
  // 启用内容驱动的文档系统
  documentDriven: true,

  // 定义内容集合
  sources: {
    // 默认集合
    content: {
      driver: "fs",
      base: "./content",
    },
    // 自定义集合 - 博客
    blog: {
      driver: "fs",
      base: "./app/content/blog",
    },
    // 自定义集合 - Vue
    vue: {
      driver: "fs",
      base: "./app/content/vue",
    },
  },
});
