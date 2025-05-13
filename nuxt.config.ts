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
});
