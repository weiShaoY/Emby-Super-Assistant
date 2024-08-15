/**
 *  视频相关类型
 */
namespace VideoType {

  /**
   *  每个视频的类型
   */
  type Video = {

    /**
     * 视频名称 (去除扩展名)
     */
    videoName: string

    /**
     * 视频完整名称 (包含扩展名)
     */
    videoFullName: string

    /**
     * 视频处理后的名称 (去除扩展名，去除视频标签，转换为小写)
     */
    videoProcessedName: string

    /**
     * 视频文件标签名
     */
    videoTagName: string []

    /**
     * 视频扩展名
     */
    videoExtensionName: string

    /**
     * 目录结构
     */
    directoryStructure: string[]

    /**
     * 是否为中文字幕
     */
    isChineseSubtitle: boolean

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

  /**
   *  标签列表的每一项
   */
  type tagMatchArrayItem = {

    /**
     * 标签名
     */
    name: string

    /**
     * 标签链接
     */
    url: string
  }

  /**
   * 完整的视频配置类型
   */
  type VideoConfig = {

    /**
     * 视频扩展名数组（注意：这个数组在 `tagRegex` 的定义中并未直接使用）
     * @type {string[]}
     */
    extensionArray: string[]

    /**
     * 视频标签名数组
     * @type {string[]}
     */
    tagArray: string[]

    /**
     *  视频标签匹配正则（注意：这里使用 `TagArrayType`）
     */
    tagRegex: RegExp

    /**
     *  种子列表排序规则数组
     */
    torrentListSortingRuleArray: torrentListSortingRuleArrayItem[]

    /**
     *  标签匹配数组
     */
    tagMatchArray: tagMatchArrayItem[]
  }

}
