import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: '#52B44B', // 主要颜色
      // secondary: '#FF6347', // 次要颜色
      // accent: '#32CD32', // 强调色
    },
  },
  shortcuts: [['flex-center', 'flex justify-center items-center']],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
})
