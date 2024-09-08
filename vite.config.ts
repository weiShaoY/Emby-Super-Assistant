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
  server: {

    // open: false, // 自动打开浏览器
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

    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        name: 'Emby超级助手',
        author: 'weiShao',
        version: '0.0.1',
        license: 'MIT',
        namespace: 'npm/vite-plugin-monkey',
        description: '为Emby在Jav网站监测是否入库,是否可更新,Emby调用带第三方播放器,为 JavDB、JavBus、JavLibrary 这三个站点添加跳转在线观看的链接',
        match: [
          '*://*.javdb.com/*',
          '*://*.javbus.com/*',
          '*/site/index.html',
          '192.168.*',
        ],

        /**
         *  此标签定义允许通过GM_xmlhttpRequest检索的域（无顶级域），包括子域
         */
        connect: [
          '192.168.0.4:*',
          '192.168.0.4:8096',
          'jable.tv',
          'missav.com',
          'missav123.com',
          'njav.tv',
          'supjav.com',
          'netflav5.com',
          'avgle.com',
          'javhhh.com',
          'bestjavporn.com',
          'javmenu.com',
          'jav.guru',
          'javmost.cx',
          'hayav.com',
          'avjoy.me',
          'javfc2.net',
          'paipancon.com',
          'ggjav.com',
          'www.av01.tv',
          '18sex.org',
          'highporn.net',
          'evojav.pro',
          '18av.mm-cg.com',
          'javgo.to',
          'javbus.com',
          'javdb.com',
          'javlibrary.com',
          'javdb008.com',
          'g64w.com',
          '*',
        ],
      },

      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-6': '#52B44B',
          'primary-5': '#07FE38',
        },
        javascriptEnabled: true,
      },
    },
  },
})
