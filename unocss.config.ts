import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
export default defineConfig({
  shortcuts: [
    // ...
    {
      "flex-center": "flex justify-center items-center",
      "flex-col": "flex flex-col",
      btn: "px-4 py-2 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700",
    },
  ],
  theme: {
    colors: {
      // ...
      // 自定义快捷方式
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
