/** 当前匹配的站点对象类型定义 */
export type LibItem = {

  /**
   * 站点名称
   */
  name: 'javdb' | 'javbus' | 'javlib'

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
    name: 'javdb',
    enable: true,
    href: /^https?:\/\/(\w*\.)?javdb(\d)*\.com\/v.*$/,
    querys: {
      panelQueryStr: '.video-meta-panel>.columns.is-desktop .panel.movie-panel-info',
      codeQueryStr: `[data-clipboard-text]`,
    },
    method() {
      // // 针对 javdb 站点的一些样式调整 // 查找视频封面元素
      // const columnVideoCover = document.querySelector<HTMLElement>('.column-video-cover')

      // // 调整视频封面宽度
      // if (columnVideoCover) {
      //   columnVideoCover.style.width = '60%'
      // }

      // /**
      //  *  查找面板元素
      //  */
      // const panel = document.querySelector<HTMLElement>(
      //   '.video-meta-panel>.columns.is-desktop>.column:not(.column-video-cover)',
      // )

      // // 为面板元素添加自定义类名
      // panel?.classList.add('db-panel')
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
      /**
       * 查找面板元素
       */
      const panel = document.querySelector<HTMLElement>('#video_info')

      // 为面板元素添加自定义类名
      panel?.classList.add('lib-panel')
    },
  },
]
