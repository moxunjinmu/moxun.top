// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxt/ui",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  unocss: {
    // 预设
    uno: true, // 启用@unocss/preset-uno
    attributify: true, // 启用@unocss/preset-attributify
    icons: {
      // 启用@unocss/preset-icons
      extraProperties: {
        display: "inline-block",
      },
      customizations: {
        iconCustomizer(collection, icon, props) {
          // 默认图标大小
          props.width = "1.5em";
          props.height = "1.5em";
        },
      },
    },
    // 核心选项
    shortcuts: [],
    rules: [],
  },
  css: ["normalize.css"], // 全局引入normalize.css
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
});
