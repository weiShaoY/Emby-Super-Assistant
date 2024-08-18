/**
 *  视频相关类型
 */
namespace VideoType {

  /**
   *  标签列表的每一项
   */
  type TagArrayItem = {

    /**
     * 标签名
     */
    name: string[]

    /**
     * 标签链接
     */
    url: string
  }

  /**
   *  每个视频的类型
   */
  type Video = {

    /**
     * 视频名称 (去除扩展名)
     */
    baseName: string

    /**
     * 视频完整名称 (包含扩展名)
     */
    fullName: string

    /**
     * 视频处理后的名称 (去除扩展名，去除视频标签，转换为小写)
     */
    processedName: string

    /**
     * 视频文件标签名
     */
    tagArray: TagArrayItem []

    /**
     * 视频扩展名
     */
    extensionName: string

    /**
     * 文件的目录路径层级
     */
    directoryPath: string[]

    /**
     * 是否为中文字幕
     */
    isChinese: boolean

    /**
     *  视频大小
     */
    size: string

    /**
     *  分辨率
     */
    resolution: string

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
    tagArray: TagArrayItem[]

    /**
     *  视频标签匹配正则（注意：这里使用 `TagArrayType`）
     */
    tagRegex: RegExp

    /**
     *  种子列表排序规则数组
     */
    torrentListSortingRuleArray: torrentListSortingRuleArrayItem[]

  }

}
