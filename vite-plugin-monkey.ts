export type MonkeyOption = {

  /**
   * userscript 入口文件路径
   */
  entry: string
  userscript?: MonkeyUserScript
  format?: Format

  /**
   * vite-plugin-monkey/dist/client 的别名
   * @default '$'
   * @example
   * // vite-env.d.ts 用于类型提示
   *
   * // 如果你使用默认值 `$`
   * /// <reference types="vite-plugin-monkey/client" />
   *
   * // 如果你使用其他别名
   * declare module other_alias {
   *   export * from 'vite-plugin-monkey/dist/client';
   * }
   */
  clientAlias?: string
  server?: {

    /**
     * 当 userscript 注释发生变化时，在默认浏览器中自动打开安装 URL
     *
     * 并将 `viteConfig.server.open ??= monkeyConfig.server.open`
     * @default
     * process.platform == 'win32' 或者 process.platform == 'darwin' // 如果平台是 Windows/Mac
     */
    open?: boolean

    /**
     * 名称前缀，用于区分 server.user.js 和 build.user.js 在 monkey 扩展安装列表中的位置，如果你不想要前缀，可以设置为 false
     * @default 'server:'
     */
    prefix?: string | ((name: string) => string) | false

    /**
     * 将 GM_api 挂载到 unsafeWindow，不推荐这样做，你应该通过 ESM 导入使用 GM_api，或者使用 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)
     * @default false
     * @example
     * // 如果设置为 true，你可以使用 `vite-plugin-monkey/global` 进行类型提示
     * // vite-env.d.ts
     * /// <reference types="vite-plugin-monkey/global" />
     */
    mountGmApi?: boolean
  }
  build?: {

    /**
     * 构建打包后的 userscript 文件名
     *
     * 它应该以 '.user.js' 结尾
     * @default (package.json.name ?? 'monkey') + '.user.js'
     */
    fileName?: string

    /**
     * 构建打包后的 userscript 注释文件名，这个文件仅包含注释
     *
     * 它可以被 userscript.updateURL 使用，在检查更新时，只需下载这个小文件，而不是下载整个脚本
     *
     * 它应该以 '.meta.js' 结尾，如果设置为 false，则不会生成此文件
     *
     * 如果设置为 true，则等于 fileName.replace(/\\.user\\.js$/, '.meta.js')
     *
     * @default false
     */
    metaFileName?: string | boolean | ((fileName: string) => string)

    /**
     * 此配置可以是数组或对象，数组为 Object.entries(object)
     *
     * 如果值是字符串或函数，则它或其返回值为 exportVarName
     *
     * 如果值是数组，第一个 [项或其返回值] 为 exportVarName，后面的项都是 [require URL]
     *
     * 如果模块未被导入，插件不会将 require URL 添加到 userscript
     *
     * @example
     * { // 映射结构
     *  vue: 'Vue',
     *  // 如果这样设置
     *  // 你需要手动设置 userscript.require = ['https://unpkg.com/vue@3.0.0/dist/vue.global.js']，当 `vite build`
     *
     *  vuex: ['Vuex', (version, name) => `https://unpkg.com/${name}@${version}/dist/vuex.global.js`],
     *  // 插件会自动将此 URL 添加到 userscript.require
     *
     *  'prettier/parser-babel': [
     *    'prettierPlugins.babel',
     *    (version, name, importName) => {
     *      // name == `prettier`
     *      // importName == `prettier/parser-babel`
     *      const subpath = `${importName.split('/').at(-1)}.js`;
     *      return `https://cdn.jsdelivr.net/npm/${name}@${version}/${subpath}`;
     *    },
     *  ],
     *  // 有时 importName 与包名不同
     * }
     * @example
     * [ // 数组结构，此示例来自 [playground/ex-vue-demi](https://github.com/lisonge/vite-plugin-monkey/tree/main/playground/ex-vue-demi)
     *   [
     *     'vue',
     *     cdn
     *       .jsdelivr('Vue', 'dist/vue.global.prod.js')
     *       .concat('https://unpkg.com/vue-demi@latest/lib/index.iife.js')
     *       .concat(
     *         await util.fn2dataUrl(() => {
     *           window.Vue = Vue;
     *         }),
     *       ),
     *   ],
     *   ['pinia', cdn.jsdelivr('Pinia', 'dist/pinia.iife.prod.js')],
     *   [
     *     'element-plus',
     *     cdn.jsdelivr('ElementPlus', 'dist/index.full.min.js'),
     *   ],
     * ]
     */
    externalGlobals?: ExternalGlobals

    /**
     * 根据最终代码包，自动将 GM_* 或 GM.* 注入到 userscript 注释 grant 中
     *
     * 代码树摇减（Tree Shaking）后，如果代码中包含 `GM_xxx`，则添加 \@grant GM_xxx 到 userscript
     * @default true
     */
    autoGrant?: boolean

    /**
     * @deprecated 请在 vite>=4.2.0 中使用 [viteConfig.build.cssMinify](https://vitejs.dev/config/build-options.html#build-cssminify)
     *
     * 现在 minifyCss 将不再工作
     */
    minifyCss?: boolean

    /**
     * @example
     * {  // resourceName 的默认值为 pkg.importName
     *   'element-plus/dist/index.css': pkg => `https://unpkg.com/${pkg.name}@${pkg.version}/${pkg.resolveName}`,
     *   'element-plus/dist/index.css': {
     *     resourceName: pkg => pkg.importName,
     *     resourceUrl: pkg => `https://unpkg.com/${pkg.name}@${pkg.version}/${pkg.resolveName}`,
     *     loader: pkg => { // 有默认加载器，支持 [css, json, 以及 vite 支持的资源, ?url, ?raw] 文件/名称后缀
     *        const css = GM_getResourceText(pkg.resourceName);
     *        GM_addStyle(css);
     *        return css;
     *     },
     *     nodeLoader: pkg => {
     *        return [
     *          `export default (()=>{`,
     *          `const css = GM_getResourceText(${JSON.stringify(pkg.resourceName)});`,
     *          `GM_addStyle(css);`,
     *          `return css;`,
     *          `})();`
     *        ].join('');
     *     },
     *   },
     *   'element-plus/dist/index.css': [
     *      (version, name, importName, resolveName) => importName,
     *      (version, name, importName, resolveName) => `https://unpkg.com/${name}@${version}/${resolveName}`,
     *       // 用于兼容 externalGlobals cdn 函数，如果 (version/name/importName/resolveName) 为空，插件将使用其自己的默认值
     *   ],
     *   'element-plus/dist/index.css': cdn.jsdelivr(),
     * }
     */
    externalResource?: ExternalResource

    /**
     * 当使用动态导入时，插件将使用 systemjs 构建你的代码
     *
     * `cdn.jsdelivr()[1]` 示例 -> [dynamic-import.user.js](https://github.com/lisonge/vite-plugin-monkey/blob/7645b185605faf9b48c43116db5ea01726188e03/playground/dynamic-import/dist/dynamic-import.user.js)
     *
     * `'inline'` 示例 -> [test-v3.user.js](https://github.com/lisonge/vite-plugin-monkey/blob/7645b185605faf9b48c43116db5ea01726188e03/playground/test-v3/dist/test-v3.user.js)
     *
     * @default
     * cdn.jsdelivr()[1]
     */
    systemjs?: 'inline' | ModuleToUrlFc

    /**
     * @default
     * const defaultFc = () => {
     *   return (e: string) => {
     *     if (typeof GM_addStyle == 'function') {
     *       GM_addStyle(e);
     *       return;
     *     }
     *     const o = document.createElement('style');
     *     o.textContent = e;
     *     document.head.append(o);
     *   };
     * };
     * @example
     * const defaultFc1 = () => {
     *   return (e: string) => {
     *     const o = document.createElement('style');
     *     o.textContent = e;
     *     document.head.append(o);
     *   };
     * };
     * const defaultFc2 = (css: string) => {
     *   const t = JSON.stringify(css);
     *   return `(()=>{
     *     const o = document.createElement('style');
     *     o.textContent = ${t};
     *     document.head.append(o);
     *   })()`;
     * };
     */
    styleLoader?: (() => (css: string) => void) | string | ((css: string) => string)

    /**
     * 模块转换前，用于转换 ESM 模块
     * @example
     * import.meta.glob(`./dir/*.{html,htm}`) // ESM modules
     * 此插件将自动匹配 .user.js 后缀的入口文件，并根据 import.meta.glob 动态加载所有匹配的模块
     * plugins: [
     *   monkeyOption({
     *     preProcessorModule: (code) => {
     *       return code.replace('import.meta.glob', 'import.meta.monkeyGlob');
     *     },
     *   }),
     * ]
     */
    preProcessorModule?: (code: string) => string

    /**
     * 模块转换后，用于转换最终代码
     * @example
     * // 一种自定义外部模块加载逻辑
     * plugins: [
     *   monkeyOption({
     *     postProcessorModule: (code, meta) => {
     *       if (meta.isServer) {
     *         code = code.replace('import', `return new Promise(() => require`) + ')';
     *       }
     *       return code;
     *     },
     *   }),
     * ]
     */
    postProcessorModule?: (code: string, meta: PostProcessMeta) => string
  }
}
