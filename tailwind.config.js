/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app/**/*.{js,ts,vue}",
    "./content/**/*.{md,yml,json,yaml,toml,csv}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      // 添加回灰色系列颜色
      colors: {
        gray: {
          50: 'rgb(250 250 250)',
          100: 'rgb(244 244 245)',
          200: 'rgb(228 228 231)',
          300: 'rgb(212 212 216)',
          400: 'rgb(161 161 170)',
          500: 'rgb(113 113 122)',
          600: 'rgb(82 82 91)',
          700: 'rgb(63 63 70)',
          800: 'rgb(39 39 42)',
          900: 'rgb(24 24 27)',
          950: 'rgb(9 9 11)',
        },
        // 添加主色调
        primary: {
          50: 'var(--color-green-50)',
          100: 'var(--color-green-100)',
          200: 'var(--color-green-200)',
          300: 'var(--color-green-300)',
          400: 'var(--color-green-400)',
          500: 'var(--color-green-500)',
          600: 'var(--color-green-600)',
          700: 'var(--color-green-700)',
          800: 'var(--color-green-800)',
          900: 'var(--color-green-900)',
          950: 'var(--color-green-950)',
        },
      },
      // 添加排版相关配置
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  safelist: [
    'bg-white',
    'bg-gray-50',
    'bg-gray-100',
    'bg-gray-200',
    'bg-gray-300',
    'bg-gray-400',
    'bg-gray-500',
    'bg-gray-600',
    'bg-gray-700',
    'bg-gray-800',
    'bg-gray-900',
    'dark:bg-gray-700',
    'dark:bg-gray-800',
    'dark:bg-gray-900',
    'text-gray-300',
    'text-gray-400',
    'text-gray-500',
    'text-gray-600',
    'text-gray-700',
    'dark:text-gray-300',
    'dark:text-gray-400',
    'border-gray-200',
    'border-gray-300',
    'dark:border-gray-700',
    'hover:bg-gray-100',
    'dark:hover:bg-gray-700',
  ],
}
