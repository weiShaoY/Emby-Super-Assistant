/**
 *  在线播放相关类型
 */
namespace OnlinePlayType {

  /**
   * 用于解析 DOM 查询的配置对象类型。
   * 该类型定义了如何在网页上查询视频链接和标题的规则。
   */
  type DomQuery_parser = {

    /**
     * 指定搜索结果列表中的索引，部分网站的第一个结果可能是广告。
     * 特别指定：适用于 GGJAV 网站。
     */
    listIndex?: number

    /**
     * 指定视频代码格式是否使用空格分隔。
     * 大部分视频代码格式为 `xxx-000`，但部分网站使用 `xxx 000` 作为分隔符。
     * 特别指定：原用于 GGJAV 网站的情况。
     */
    spaceCode?: boolean

    /**
     * a 标签的 href 属性查询字符串
     */
    linkQuery: string

    /**
     * 在标题中检测是否包含「字幕」等文本
     */
    titleQuery: string
  }

  /**
   * 用于定义解析视频、字幕、泄露资源信息的 DOM 查询配置对象。
   * 适用于需要从页面中提取特定资源信息的场景。
   */
  type DomQuery_get = {

    /**
     * 检查页面是否提供视频播放资源。
     * 特别指定：适用于 JAVMENU，收录视频但未提供在线播放资源。
     * 特别指定：适用于 njav，资源不存在但仍返回 404 状态码。
     */
    videoQuery?: string

    /**
     * 查询字幕信息的选择器
     *
     */
    subQuery?: string

    /**
     * 查询泄露资源信息的选择器
     *
     */
    leakQuery?: string
  }

  /**
   * 定义基础的站点信息，包括站点名称、图标、主机名及其他自定义配置。
   */
  type SiteItemBase = {

    /**
     *  是否显示
     */
    isVisible: boolean

    /**
     * 站点名称
     */
    name: string

    /**
     *  图标
     */
    icon?: string

    /**
     * [已废弃] 用户自定义的禁用选项，已经不再使用。
     */
    // disable: boolean;

    /**
     * 在指定的 LibItem.name 下不显示该站点。
     * 特别指定：用于防止在 matchList 中出现自己检索自己站点的情况。
     */
    disableLibItemName?: string

    /**
     * 站点的主机名
     */
    hostname: string

    /**
     * 站点的 URL 地址
     */
    url: string

    /**
     * 部分站点的代码格式不同，可使用自定义格式化函数对视频代码进行处理。
     * @param {string} preCode - 预处理前的视频代码。
     * @returns {string} - 返回格式化后的代码。
     */
    codeFormater?: (preCode: string) => string
  }

  /**
   * 用于定义 `GET` 类型请求的站点配置对象。
   * 该类型的站点通过 `GET` 请求获取页面内容。
   */
  export type SiteItem_get = {

    /**
     * 获取类型为 "get"，表示直接通过 `GET` 请求获取页面内容。
     */
    fetchType: 'get'

    /**
     * 用于页面内容解析的 DOM 查询对象。
     * 通过 DOM 查询提取页面中的视频、字幕或泄露资源信息。
     */
    domQuery: DomQuery_get
  } & SiteItemBase

  /**
   * 用于定义需要解析搜索结果的 `parser` 类型请求的站点配置对象。
   * 该类型站点的页面内容通过解析搜索结果页获取。
   */
  type SiteItem_parser = {

    /**
     * 获取类型为 "parser"，表示需要解析搜索结果页。
     */
    fetchType: 'parser'

    /**
     * 用于搜索结果解析的 DOM 查询对象
     */
    domQuery: DomQuery_parser
  } & SiteItemBase

  /**
   * 用于定义 `POST` 类型请求的站点配置对象。
   * 该类型站点通过发送 `POST` 请求获取页面内容。
   */
  type SiteItem_post = {

    /**
     * 获取类型为 "post"，表示需要发送 POST 请求获取内容。
     */
    fetchType: 'post'

    /**
     * POST 请求的参数对象
     * 键值对形式，用于指定发送到服务器的表单数据或其他请求参数。
     */
    postParams: Record<string, any>

    /**
     * 用于搜索结果解析的 DOM 查询对象
     * 通过 DOM 查询对象提取搜索结果中的视频链接及标题信息。
     */
    domQuery: DomQuery_parser
  } & SiteItemBase

  /**
   * 站点项的类型，可以是 "get"、"parser" 或 "post" 三种类型之一。
   */
  export type SiteItem = SiteItem_get | SiteItem_parser | SiteItem_post

}
