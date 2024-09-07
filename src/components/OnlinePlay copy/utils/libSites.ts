/** 当前匹配的站点对象类型定义 */
export type LibItem = {

  /**
   * 站点名称
   */
  name: 'javdb' | 'javbus' | 'javlib' | 'emby'

  /**
   * 是否启用该站点
   */
  enable: boolean

  /**
   * 匹配站点 URL 的正则表达式
   */
  href: RegExp

  /**
   * 选择器查询对象
   */
  querys: {

    /**
     * 面板元素的选择器
     */
    panelQueryStr: string

    /**
     * 代码元素的选择器
     */
    codeQueryStr: string
  }

  /**
   * 针对该站点的自定义适配方法
   */
  method: () => void
}

/**
 *  需要匹配的图书馆站点列表
 */
export const libSites: LibItem[] = [
  {
    name: 'emby',
    enable: true,
    href: /^https?:\/\/192\.168\.0\.4:8096\/.*$/,
    querys: {
      panelQueryStr: '.movie>div.info',
      codeQueryStr: `span[style="color:#CC0000;"]`,
    },
    method() {
    },
  },
  {
    name: 'javdb',
    enable: true,
    href: /^https?:\/\/(\w*\.)?javdb(\d)*\.com\/v.*$/,
    querys: {
      panelQueryStr: '.video-meta-panel>.columns.is-desktop .panel.movie-panel-info',
      codeQueryStr: `[data-clipboard-text]`,
    },
    method() {

    },
  },
  {
    name: 'javbus',
    enable: true,
    href: /^https?:\/\/(\w*\.)?(javbus|seejav|javsee)*\.(com|cc|me|life|bid).*$/,
    querys: {
      panelQueryStr: '.movie>div.info',
      codeQueryStr: `span[style="color:#CC0000;"]`,
    },
    method() {
    },
  },
  {
    name: 'javlib',
    enable: true,
    href: /^http.*\/cn\/\?v=jav.*$/,
    querys: {
      panelQueryStr: '#video_jacket_info #video_info',
      codeQueryStr: `#video_id td.text`, // 代码元素的选择器
    },
    method() {

    },
  },
]
