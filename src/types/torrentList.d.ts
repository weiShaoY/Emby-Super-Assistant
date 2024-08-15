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
   *  是否高清
   */
  isHD: boolean

  /**
   *  是否有中文字幕
   */
  isChinese: boolean

  /**
   *  背景颜色
   */
  backgroundColor?: string

  /**
   *  匹配的标签名
   */
  tag?: string
}
