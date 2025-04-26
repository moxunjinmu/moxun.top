import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
export default defineConfig({
  shortcuts: [
    // ...
    {
      "flex-center": "flex justify-center items-center",
    "flex-col": "flex flex-col",
    }
  ],
  theme: {
    colors: {
      // ...
      // 自定义快捷方式
    
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
