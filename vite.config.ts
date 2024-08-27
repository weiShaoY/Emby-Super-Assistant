import path from 'node:path'

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

import monkey, { cdn, util } from 'vite-plugin-monkey'

import UnoCSS from 'unocss/vite'

import AutoImport from 'unplugin-auto-import/vite'

import Components from 'unplugin-vue-components/vite'

import { vitePluginForArco } from '@arco-plugins/vite-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    AutoImport(
      {
        imports: [util.unimportPreset, 'vue'],
        dts: true, // 生成类型定义文件
        dirs: [
          'src/composables',
          'src/store',
        ],
        vueTemplate: true, // 启用 Vue 模板
      },
    ),

    vue(),

    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',

        match: [
          '*://*.javdb.com/*',
          '*://*.javbus.com/*',
          '*/web/index.html',
          '192.168.*',
        ],
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),

    UnoCSS(),

    // https://github.com/antfu/vite-plugin-components
    // 默认情况下，此插件将导入src/components路径中的组件
    Components(
      {
        dts: true, // 生成类型定义文件
      },
    ),

    //  Arco 按需引入
    vitePluginForArco({
    }),
  ],
})
