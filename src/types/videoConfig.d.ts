/**
 * 视频匹配配置类型命名空间
 */
namespace VideoConfigType {

  /**
   * 视频扩展名数组（注意：这个数组在 `tagRegex` 的定义中并未直接使用）
   * @type {string[]}
   */
  type ExtensionArrayType = string[]

  /**
   * 视频标签名数组
   * @type {string[]}
   */
  type TagArrayType = string[]

  /**
   * 视频标签匹配正则（注意：这里使用 `TagArrayType`）
   */
  type TagRegexType = RegExp

  /**
   * 视频排序规则数组中的单个规则
   */
  type TorrentListRuleItemType = {

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
    extensionArray: ExtensionArrayType

    /**
     * 视频标签名数组
     * @type {string[]}
     */
    tagArray: TagArrayType

    /**
     *  视频标签匹配正则（注意：这里使用 `TagArrayType`）
     */
    tagRegex: TagRegexType

    /**
     *  视频排序规则数组
     */
    torrentListRuleArray: TorrentListRuleItemType[]
  }

}
