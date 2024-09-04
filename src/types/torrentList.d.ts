/**
 *  种子列表 每一项的类型
 */
type TorrentType = {

  /**
   *  磁链
   */
  url: string

  /**
   *  文件名
   */
  name: string

  /**
   *  文件大小
   */
  size: number

  /**
   *  更新时间
   */
  time: string

  /**
   *  背景颜色
   */
  backgroundColor?: string

  /**
   * 视频标签名数组
   * @type {string[]}
   */
  tagArray: VideoType.VideoTagArrayItem[]

  /**
   *  种子网站
   */
  web: string
}

  /**
   * 种子列表排序规则数组的每一项
   */
  type torrentListSortingRuleArrayItem = {

    /**
     * 匹配名称
     */
    name: string

    /**
     * 匹配上的背景颜色
     */
    backgroundColor: string
  }
