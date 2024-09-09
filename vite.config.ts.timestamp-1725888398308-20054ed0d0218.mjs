// vite.config.ts
import path from "node:path";
import { defineConfig } from "file:///C:/Users/16047/Desktop/Emby-%E8%B6%85%E7%BA%A7%E5%8A%A9%E6%89%8B/node_modules/.pnpm/vite@5.3.5_@types+node@22.2.0_less@4.2.0/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/16047/Desktop/Emby-%E8%B6%85%E7%BA%A7%E5%8A%A9%E6%89%8B/node_modules/.pnpm/@vitejs+plugin-vue@5.1.2_vite@5.3.5_@types+node@22.2.0_less@4.2.0__vue@3.4.35_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import monkey, { cdn, util } from "file:///C:/Users/16047/Desktop/Emby-%E8%B6%85%E7%BA%A7%E5%8A%A9%E6%89%8B/node_modules/.pnpm/vite-plugin-monkey@4.0.6_vite@5.3.5_@types+node@22.2.0_less@4.2.0_/node_modules/vite-plugin-monkey/dist/node/index.mjs";
import UnoCSS from "file:///C:/Users/16047/Desktop/Emby-%E8%B6%85%E7%BA%A7%E5%8A%A9%E6%89%8B/node_modules/.pnpm/unocss@0.61.9_postcss@8.4.40_rollup@4.20.0_vite@5.3.5_@types+node@22.2.0_less@4.2.0_/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///C:/Users/16047/Desktop/Emby-%E8%B6%85%E7%BA%A7%E5%8A%A9%E6%89%8B/node_modules/.pnpm/unplugin-auto-import@0.17.8_rollup@4.20.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/16047/Desktop/Emby-%E8%B6%85%E7%BA%A7%E5%8A%A9%E6%89%8B/node_modules/.pnpm/unplugin-vue-components@0.27.3_@babel+parser@7.25.3_rollup@4.20.0_vue@3.4.35_typescript@5.5.4_/node_modules/unplugin-vue-components/dist/vite.js";
import { vitePluginForArco } from "file:///C:/Users/16047/Desktop/Emby-%E8%B6%85%E7%BA%A7%E5%8A%A9%E6%89%8B/node_modules/.pnpm/@arco-plugins+vite-vue@1.4.5/node_modules/@arco-plugins/vite-vue/lib/index.js";
var __vite_injected_original_dirname = "C:\\Users\\16047\\Desktop\\Emby-\u8D85\u7EA7\u52A9\u624B";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    // open: false, // 自动打开浏览器
  },
  plugins: [
    AutoImport(
      {
        imports: [util.unimportPreset, "vue"],
        dts: true,
        // 生成类型定义文件
        dirs: [
          "src/composables",
          "src/store"
        ],
        vueTemplate: true
        // 启用 Vue 模板
      }
    ),
    vue(),
    UnoCSS(),
    // https://github.com/antfu/vite-plugin-components
    // 默认情况下，此插件将导入src/components路径中的组件
    Components(
      {
        dts: true
        // 生成类型定义文件
      }
    ),
    //  Arco 按需引入
    vitePluginForArco({}),
    monkey({
      entry: "src/main.ts",
      userscript: {
        icon: "https://vitejs.dev/logo.svg",
        name: "Emby\u8D85\u7EA7\u52A9\u624B",
        author: "weiShao",
        version: "0.0.1",
        license: "MIT",
        namespace: "npm/vite-plugin-monkey",
        description: "\u4E3AEmby\u5728Jav\u7F51\u7AD9\u76D1\u6D4B\u662F\u5426\u5165\u5E93,\u662F\u5426\u53EF\u66F4\u65B0,Emby\u8C03\u7528\u5E26\u7B2C\u4E09\u65B9\u64AD\u653E\u5668,\u4E3A JavDB\u3001JavBus\u3001JavLibrary \u8FD9\u4E09\u4E2A\u7AD9\u70B9\u6DFB\u52A0\u8DF3\u8F6C\u5728\u7EBF\u89C2\u770B\u7684\u94FE\u63A5",
        include: [
          "*://*.javdb.com/*",
          "*://javdb.com/*",
          "*://*.javbus.com/*",
          "*://javbus.com/*",
          "*/site/index.html",
          "*://192.168.0.*"
        ],
        // '*://192.168.0.*:8096/*',
        /**
         *  此标签定义允许通过GM_xmlhttpRequest检索的域（无顶级域），包括子域
         */
        connect: [
          "192.168.*",
          "192.168.0.4:8096",
          "jable.tv",
          "missav.com",
          "missav123.com",
          "njav.tv",
          "supjav.com",
          "netflav5.com",
          "avgle.com",
          "javhhh.com",
          "bestjavporn.com",
          "javmenu.com",
          "jav.guru",
          "javmost.cx",
          "hayav.com",
          "avjoy.me",
          "javfc2.net",
          "paipancon.com",
          "ggjav.com",
          "www.av01.tv",
          "18sex.org",
          "highporn.net",
          "evojav.pro",
          "18av.mm-cg.com",
          "javgo.to",
          "javbus.com",
          "javdb.com",
          "javlibrary.com",
          "javdb008.com",
          "g64w.com",
          "*"
        ]
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr("Vue", "dist/vue.global.prod.js")
        }
      }
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-6": "#52B44B",
          "primary-5": "#07FE38"
        },
        javascriptEnabled: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwxNjA0N1xcXFxEZXNrdG9wXFxcXEVtYnktXHU4RDg1XHU3RUE3XHU1MkE5XHU2MjRCXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwxNjA0N1xcXFxEZXNrdG9wXFxcXEVtYnktXHU4RDg1XHU3RUE3XHU1MkE5XHU2MjRCXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8xNjA0Ny9EZXNrdG9wL0VtYnktJUU4JUI2JTg1JUU3JUJBJUE3JUU1JThBJUE5JUU2JTg5JThCL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcblxuaW1wb3J0IG1vbmtleSwgeyBjZG4sIHV0aWwgfSBmcm9tICd2aXRlLXBsdWdpbi1tb25rZXknXG5cbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXG5cbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5cbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5cbmltcG9ydCB7IHZpdGVQbHVnaW5Gb3JBcmNvIH0gZnJvbSAnQGFyY28tcGx1Z2lucy92aXRlLXZ1ZSdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcblxuICAgIC8vIG9wZW46IGZhbHNlLCAvLyBcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTZENEZcdTg5QzhcdTU2NjhcbiAgfSxcblxuICBwbHVnaW5zOiBbXG4gICAgQXV0b0ltcG9ydChcbiAgICAgIHtcbiAgICAgICAgaW1wb3J0czogW3V0aWwudW5pbXBvcnRQcmVzZXQsICd2dWUnXSxcbiAgICAgICAgZHRzOiB0cnVlLCAvLyBcdTc1MUZcdTYyMTBcdTdDN0JcdTU3OEJcdTVCOUFcdTRFNDlcdTY1ODdcdTRFRjZcbiAgICAgICAgZGlyczogW1xuICAgICAgICAgICdzcmMvY29tcG9zYWJsZXMnLFxuICAgICAgICAgICdzcmMvc3RvcmUnLFxuICAgICAgICBdLFxuICAgICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSwgLy8gXHU1NDJGXHU3NTI4IFZ1ZSBcdTZBMjFcdTY3N0ZcbiAgICAgIH0sXG4gICAgKSxcblxuICAgIHZ1ZSgpLFxuXG4gICAgVW5vQ1NTKCksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdml0ZS1wbHVnaW4tY29tcG9uZW50c1xuICAgIC8vIFx1OUVEOFx1OEJBNFx1NjBDNVx1NTFCNVx1NEUwQlx1RkYwQ1x1NkI2NFx1NjNEMlx1NEVGNlx1NUMwNlx1NUJGQ1x1NTE2NXNyYy9jb21wb25lbnRzXHU4REVGXHU1Rjg0XHU0RTJEXHU3Njg0XHU3RUM0XHU0RUY2XG4gICAgQ29tcG9uZW50cyhcbiAgICAgIHtcbiAgICAgICAgZHRzOiB0cnVlLCAvLyBcdTc1MUZcdTYyMTBcdTdDN0JcdTU3OEJcdTVCOUFcdTRFNDlcdTY1ODdcdTRFRjZcbiAgICAgIH0sXG4gICAgKSxcblxuICAgIC8vICBBcmNvIFx1NjMwOVx1OTcwMFx1NUYxNVx1NTE2NVxuICAgIHZpdGVQbHVnaW5Gb3JBcmNvKHtcbiAgICB9KSxcblxuICAgIG1vbmtleSh7XG4gICAgICBlbnRyeTogJ3NyYy9tYWluLnRzJyxcbiAgICAgIHVzZXJzY3JpcHQ6IHtcbiAgICAgICAgaWNvbjogJ2h0dHBzOi8vdml0ZWpzLmRldi9sb2dvLnN2ZycsXG4gICAgICAgIG5hbWU6ICdFbWJ5XHU4RDg1XHU3RUE3XHU1MkE5XHU2MjRCJyxcbiAgICAgICAgYXV0aG9yOiAnd2VpU2hhbycsXG4gICAgICAgIHZlcnNpb246ICcwLjAuMScsXG4gICAgICAgIGxpY2Vuc2U6ICdNSVQnLFxuICAgICAgICBuYW1lc3BhY2U6ICducG0vdml0ZS1wbHVnaW4tbW9ua2V5JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdcdTRFM0FFbWJ5XHU1NzI4SmF2XHU3RjUxXHU3QUQ5XHU3NkQxXHU2RDRCXHU2NjJGXHU1NDI2XHU1MTY1XHU1RTkzLFx1NjYyRlx1NTQyNlx1NTNFRlx1NjZGNFx1NjVCMCxFbWJ5XHU4QzAzXHU3NTI4XHU1RTI2XHU3QjJDXHU0RTA5XHU2NUI5XHU2NEFEXHU2NTNFXHU1NjY4LFx1NEUzQSBKYXZEQlx1MzAwMUphdkJ1c1x1MzAwMUphdkxpYnJhcnkgXHU4RkQ5XHU0RTA5XHU0RTJBXHU3QUQ5XHU3MEI5XHU2REZCXHU1MkEwXHU4REYzXHU4RjZDXHU1NzI4XHU3RUJGXHU4OUMyXHU3NzBCXHU3Njg0XHU5NEZFXHU2M0E1JyxcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICcqOi8vKi5qYXZkYi5jb20vKicsXG4gICAgICAgICAgJyo6Ly9qYXZkYi5jb20vKicsXG4gICAgICAgICAgJyo6Ly8qLmphdmJ1cy5jb20vKicsXG4gICAgICAgICAgJyo6Ly9qYXZidXMuY29tLyonLFxuICAgICAgICAgICcqL3NpdGUvaW5kZXguaHRtbCcsXG4gICAgICAgICAgJyo6Ly8xOTIuMTY4LjAuKicsXG4gICAgICAgIF0sXG5cbiAgICAgICAgLy8gJyo6Ly8xOTIuMTY4LjAuKjo4MDk2LyonLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgXHU2QjY0XHU2ODA3XHU3QjdFXHU1QjlBXHU0RTQ5XHU1MTQxXHU4QkI4XHU5MDFBXHU4RkM3R01feG1saHR0cFJlcXVlc3RcdTY4QzBcdTdEMjJcdTc2ODRcdTU3REZcdUZGMDhcdTY1RTBcdTk4NzZcdTdFQTdcdTU3REZcdUZGMDlcdUZGMENcdTUzMDVcdTYyRUNcdTVCNTBcdTU3REZcbiAgICAgICAgICovXG4gICAgICAgIGNvbm5lY3Q6IFtcbiAgICAgICAgICAnMTkyLjE2OC4qJyxcbiAgICAgICAgICAnMTkyLjE2OC4wLjQ6ODA5NicsXG4gICAgICAgICAgJ2phYmxlLnR2JyxcbiAgICAgICAgICAnbWlzc2F2LmNvbScsXG4gICAgICAgICAgJ21pc3NhdjEyMy5jb20nLFxuICAgICAgICAgICduamF2LnR2JyxcbiAgICAgICAgICAnc3VwamF2LmNvbScsXG4gICAgICAgICAgJ25ldGZsYXY1LmNvbScsXG4gICAgICAgICAgJ2F2Z2xlLmNvbScsXG4gICAgICAgICAgJ2phdmhoaC5jb20nLFxuICAgICAgICAgICdiZXN0amF2cG9ybi5jb20nLFxuICAgICAgICAgICdqYXZtZW51LmNvbScsXG4gICAgICAgICAgJ2phdi5ndXJ1JyxcbiAgICAgICAgICAnamF2bW9zdC5jeCcsXG4gICAgICAgICAgJ2hheWF2LmNvbScsXG4gICAgICAgICAgJ2F2am95Lm1lJyxcbiAgICAgICAgICAnamF2ZmMyLm5ldCcsXG4gICAgICAgICAgJ3BhaXBhbmNvbi5jb20nLFxuICAgICAgICAgICdnZ2phdi5jb20nLFxuICAgICAgICAgICd3d3cuYXYwMS50dicsXG4gICAgICAgICAgJzE4c2V4Lm9yZycsXG4gICAgICAgICAgJ2hpZ2hwb3JuLm5ldCcsXG4gICAgICAgICAgJ2V2b2phdi5wcm8nLFxuICAgICAgICAgICcxOGF2Lm1tLWNnLmNvbScsXG4gICAgICAgICAgJ2phdmdvLnRvJyxcbiAgICAgICAgICAnamF2YnVzLmNvbScsXG4gICAgICAgICAgJ2phdmRiLmNvbScsXG4gICAgICAgICAgJ2phdmxpYnJhcnkuY29tJyxcbiAgICAgICAgICAnamF2ZGIwMDguY29tJyxcbiAgICAgICAgICAnZzY0dy5jb20nLFxuICAgICAgICAgICcqJyxcbiAgICAgICAgXSxcbiAgICAgIH0sXG5cbiAgICAgIGJ1aWxkOiB7XG4gICAgICAgIGV4dGVybmFsR2xvYmFsczoge1xuICAgICAgICAgIHZ1ZTogY2RuLmpzZGVsaXZyKCdWdWUnLCAnZGlzdC92dWUuZ2xvYmFsLnByb2QuanMnKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIGxlc3M6IHtcbiAgICAgICAgbW9kaWZ5VmFyczoge1xuICAgICAgICAgICdwcmltYXJ5LTYnOiAnIzUyQjQ0QicsXG4gICAgICAgICAgJ3ByaW1hcnktNSc6ICcjMDdGRTM4JyxcbiAgICAgICAgfSxcbiAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VCxPQUFPLFVBQVU7QUFFN1UsU0FBUyxvQkFBb0I7QUFFN0IsT0FBTyxTQUFTO0FBRWhCLE9BQU8sVUFBVSxLQUFLLFlBQVk7QUFFbEMsT0FBTyxZQUFZO0FBRW5CLE9BQU8sZ0JBQWdCO0FBRXZCLE9BQU8sZ0JBQWdCO0FBRXZCLFNBQVMseUJBQXlCO0FBZGxDLElBQU0sbUNBQW1DO0FBaUJ6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUE7QUFBQSxFQUdSO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDUDtBQUFBLE1BQ0U7QUFBQSxRQUNFLFNBQVMsQ0FBQyxLQUFLLGdCQUFnQixLQUFLO0FBQUEsUUFDcEMsS0FBSztBQUFBO0FBQUEsUUFDTCxNQUFNO0FBQUEsVUFDSjtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQSxhQUFhO0FBQUE7QUFBQSxNQUNmO0FBQUEsSUFDRjtBQUFBLElBRUEsSUFBSTtBQUFBLElBRUosT0FBTztBQUFBO0FBQUE7QUFBQSxJQUlQO0FBQUEsTUFDRTtBQUFBLFFBQ0UsS0FBSztBQUFBO0FBQUEsTUFDUDtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBR0Esa0JBQWtCLENBQ2xCLENBQUM7QUFBQSxJQUVELE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLFlBQVk7QUFBQSxRQUNWLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxRQUNULFNBQVM7QUFBQSxRQUNULFdBQVc7QUFBQSxRQUNYLGFBQWE7QUFBQSxRQUNiLFNBQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQU9BLFNBQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUVBLE9BQU87QUFBQSxRQUNMLGlCQUFpQjtBQUFBLFVBQ2YsS0FBSyxJQUFJLFNBQVMsT0FBTyx5QkFBeUI7QUFBQSxRQUNwRDtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixZQUFZO0FBQUEsVUFDVixhQUFhO0FBQUEsVUFDYixhQUFhO0FBQUEsUUFDZjtBQUFBLFFBQ0EsbUJBQW1CO0FBQUEsTUFDckI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
