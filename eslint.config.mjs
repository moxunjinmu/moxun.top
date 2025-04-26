// @ts-check
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";

import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    ignores: [
      "node_modules",
      "dist",
      "public",
      "*.min.js",
      "auto-imports.d.ts",
      ".nuxt",
      ".output",
      ".vscode",
      "pnpm-lock.yaml",
      "**/fixtures", // 忽略特定路径下的文件（如 fixtures 目录）
    ],
    rules: {
      quotes: ["error", "double"], // 强制使用双引号
      "quote-props": ["error", "as-needed"], // 强制对象的属性名使用引号
      semi: ["error", "always"], // 要求使用分号
      indent: [
        "error",
        2,
        {
          SwitchCase: 1, // 为switch case语句设置缩进级别，1表示额外缩进一级
        },
      ], // 使用两个空格进行缩进
      "no-multiple-empty-lines": ["error", { max: 1 }], // 不允许多个空行
      "no-trailing-spaces": "error", // 不允许行尾有空格
      // 精细化控制：允许双否，但禁止其他冗余转换（如 Boolean(variable)）
      "no-extra-boolean-cast": [
        "error",
        {
          enforceForInnerExpressions: false, // 不检查逻辑操作符中的布尔转换
        },
      ],

      // TypeScript 规则
      "@typescript-eslint/no-explicit-any": "off", // 禁用 no-explicit-any 规则，允许使用 any 类型
      "@typescript-eslint/no-empty-function": "off", // 允许空函数
      "@typescript-eslint/explicit-function-return-type": "off", // 不强制要求函数必须明确返回类型
      "@typescript-eslint/no-empty-interface": "off", // 禁用 no-empty-interface 规则，允许空接口声明
      "@typescript-eslint/no-empty-object-type": "off", // 允许空对象类型

      // Vue 规则
      "vue/multi-word-component-names": "off", // 关闭多单词组件名称的限制
      "vue/html-indent": ["error", 2], // Vue 模板中的 HTML 缩进使用两个空格
      "vue/no-v-html": "off", // 允许使用 v-html (根据实际项目需要)
      "vue/quote-props": ["error", "as-needed"], //
      // 修复多根元素问题 - Vue 3允许多根元素
      "vue/no-multiple-template-root": "off",
      "vue/attribute-hyphenation": ["error", "never"], // 禁止使用连字符命名的属性
    },
  },
  eslintPluginPrettierRecommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
]);
