// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/content",
  ],

  css: ["~/assets/css/main.css"],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-27",
  fonts: {
    providers: {
      // 禁用Google字体
      google: false,
      googleicons: false,
      // 使用自定义或本地字体
      // custom: '~/providers/custom'
    },
    families: [
      // 使用本地字体
      // { name: 'CustomFont', src: '/fonts/custom-font.woff2' }
    ],
  },

  // 解决tailwindcss sourcemap警告
  vite: {
    build: {
      sourcemap: true,
    },
    css: {
      devSourcemap: true,
    },
  },
  content: {
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
  },
  nitro: {
    nodeOptions: {
      noWarnings: true,
    },
  },
});
