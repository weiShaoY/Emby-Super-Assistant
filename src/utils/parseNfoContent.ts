/**
 * 解析的 NFO 文件数据
 */
type ParsedNfoData = {

  /**
   * 电影标题
   * @type {string}
   */
  title?: string

  /**
   * 原始标题
   * @type {string}
   */
  originalTitle?: string

  /**
   * 剧情简介
   * @type {string}
   */
  plot?: string

  /**
   * 概述
   * @type {string}
   */
  outline?: string

  /**
   * 原始剧情
   * @type {string}
   */
  originalPlot?: string

  /**
   * 标语
   * @type {string}
   */
  tagline?: string

  /**
   * 首映日期
   * @type {string}
   */
  premiered?: string

  /**
   * 发行日期
   * @type {string}
   */
  releaseDate?: string

  /**
   * 发行日期（备用）
   * @type {string}
   */
  release?: string

  /**
   * 编号
   * @type {string}
   */
  num?: string

  /**
   * 评分
   * @type {number}
   */
  rating?: number

  /**
   * 评论评分
   * @type {number}
   */
  criticRating?: number

  /**
   * 年份
   * @type {number}
   */
  year?: number

  /**
   * 时长（分钟）
   * @type {number}
   */
  runtime?: number

  /**
   * 系列
   * @type {string}
   */
  series?: string

  /**
   * 集合名称
   * @type {string}
   */
  set?: string

  /**
   * 制片厂
   * @type {string}
   */
  studio?: string

  /**
   * 制作人
   * @type {string}
   */
  maker?: string

  /**
   * 出版商
   * @type {string}
   */
  publisher?: string

  /**
   * 标签
   * @type {string}
   */
  label?: string

  /**
   * 标签数组
   * @type {string[]}
   */
  tags?: string[]

  /**
   * 类型数组
   * @type {string[]}
   */
  genres?: string[]

  /**
   * 海报URL
   * @type {string}
   */
  poster?: string

  /**
   * 封面URL
   * @type {string}
   */
  cover?: string

  /**
   * 网址
   * @type {string}
   */
  website?: string

  /**
   * 排序标题
   * @type {string}
   */
  sortTitle?: string

  /**
   * 电影评级
   * @type {string}
   */
  movieRatings?: string

  /**
   * 自定义评级
   * @type {string}
   */
  customRating?: string

  /**
   * 国家代码
   * @type {string}
   */
  countryCode?: string

  /**
   * 是否锁定数据
   * @type {boolean}
   */
  lockData?: boolean

  /**
   * 演员列表
   * @type {string[]}
   */
  actors?: string[]

  /**
   * 导演
   * @type {string}
   */
  director?: string

  /**
   * 分辨率
   * @type {string}
   */
  resolution?: string
}

/**
 * 使用 DOMParser 解析 nfo 文件内容为 XML 文档
 * @param {string} nfoContent - nfo 文件的内容
 * @returns {ParsedNfoData} 解析后的数据对象
 */
function parseNfoContent(nfoContent: string): ParsedNfoData {
  /**
   * 创建一个 DOMParser 实例用于解析 XML
   * @type {DOMParser}
   */
  const parser = new DOMParser()

  /**
   * 将 nfoContent 解析为 XML Document
   * @type {Document}
   */
  const xmlDoc = parser.parseFromString(nfoContent, 'application/xml')

  /**
   * Helper 函数，用于获取 XML 节点的文本内容
   * @param {string} tagName - XML 标签名称
   * @returns {string} XML 节点的文本内容，如果为空则返回空字符串
   */
  const getTextContent = (tagName: string): string => {
    /**
     * 获取指定标签的元素
     * @type {Element|null}
     */
    const element = xmlDoc.querySelector(tagName)

    /**
     * 返回元素的文本内容或空字符串
     * @type {string}
     */
    return element?.textContent ?? ''
  }

  /**
   * 从标签数组中提取分辨率信息
   * @param {string[]} tags - 标签数组
   * @returns {string} 解析出的分辨率信息
   */
  const extractResolution = (tags: string[]): string => {
    // 定义常见分辨率格式的正则表达式
    const resolutionPattern = /\b\d{3,4}P\b|\b4K\b|\bHD\b|\bSD\b/i

    // 查找匹配的标签
    const resolutionTag = tags.find(tag => resolutionPattern.test(tag))

    // 返回匹配的分辨率信息或空字符串
    return resolutionTag || ''
  }

  /**
   * 解析 XML 中的相关信息，并返回解析后的数据对象
   * @type {ParsedNfoData}
   */
  const parsedData: ParsedNfoData = {
    plot: getTextContent('plot'),
    outline: getTextContent('outline'),
    originalPlot: getTextContent('originalplot'),
    tagline: getTextContent('tagline'),
    premiered: getTextContent('premiered'),
    releaseDate: getTextContent('releasedate'),
    release: getTextContent('release'),
    num: getTextContent('num'),
    title: getTextContent('title'),
    originalTitle: getTextContent('originaltitle'),
    sortTitle: getTextContent('sorttitle'),
    movieRatings: getTextContent('mpaa'),
    customRating: getTextContent('customrating'),
    countryCode: getTextContent('countrycode'),
    lockData: getTextContent('lockdata') === 'true',
    actors: Array.from(xmlDoc.querySelectorAll('actor > name')).map(el => el.textContent ?? ''),
    director: getTextContent('director'),
    rating: Number.parseFloat(getTextContent('rating')) || undefined,
    criticRating: Number.parseFloat(getTextContent('criticrating')) || undefined,
    year: Number.parseInt(getTextContent('year')) || undefined,
    runtime: Number.parseInt(getTextContent('runtime')) || undefined,
    series: getTextContent('series'),
    set: getTextContent('set > name'),
    studio: getTextContent('studio'),
    maker: getTextContent('maker'),
    publisher: getTextContent('publisher'),
    label: getTextContent('label'),
    tags: Array.from(xmlDoc.querySelectorAll('tag')).map(el => el.textContent ?? ''),
    genres: Array.from(xmlDoc.querySelectorAll('genre')).map(el => el.textContent ?? ''),
    poster: getTextContent('poster'),
    cover: getTextContent('cover'),
    website: getTextContent('website'),
    resolution: extractResolution(Array.from(xmlDoc.querySelectorAll('tag')).map(el => el.textContent ?? '')),

  }

  return parsedData
}

export default parseNfoContent
