import type { DomQuery_get, DomQuery_parser, SiteItem } from './siteList' // 导入类型定义

import { gmGet, isCaseInsensitiveEqual, isErrorCode, regEnum } from './' // 导入辅助函数和正则枚举

// 定义 fetch 请求的结果类型
export type FetchResult = {
  isSuccess: boolean // 请求是否成功
  targetLink: string // 目标链接
  hasSubtitle: boolean // 是否有字幕
  hasLeakage: boolean // 是否有码泄露
}

/**
 * 针对视频播放页进行解析，寻找字幕等信息
 * @param {string} responseText - 页面响应文本
 * @param {DomQuery_get} queries - 包含字幕、泄露、视频查询选择器的对象
 * @returns {object} - 包含是否成功、是否有字幕、是否有码泄露的对象
 */
function videoPageParser(responseText: string, { subQuery, leakQuery, videoQuery }: DomQuery_get) {
  const doc = new DOMParser().parseFromString(responseText, 'text/html') // 将响应文本解析为 HTML 文档

  const subNode = subQuery ? doc.querySelector<HTMLElement>(subQuery) : '' // 查找字幕节点

  const subNodeText = subNode ? subNode.innerHTML : '' // 获取字幕节点的内容

  const leakNode = leakQuery ? doc.querySelector<HTMLElement>(leakQuery) : null // 查找泄露节点

  const linkNodeText = leakNode ? leakNode.innerHTML : '' // 获取泄露节点的内容

  /**
   * 部分网站收录视频，但是未提供播放资源，所以需要使用 videoQuery 进一步检测是否存在在线播放。
   * videoQuery 为 undefined 时，不需要查找 video
   */
  const videoNode = videoQuery ? doc.querySelector<HTMLElement>(videoQuery) : true // 查找视频节点

  return {
    isSuccess: !!videoNode, // 判断是否存在视频节点
    hasSubtitle: regEnum.subtitle.test(subNodeText), // 判断是否存在字幕信息
    hasLeakage: regEnum.leakage.test(linkNodeText), // 判断是否存在泄露信息
  }
}

/**
 * 针对 fetcher==="parser" 时的搜索结果页进行解析，寻找是否存在视频资源。
 * linkQuery & titleQuery 都是必须，
 * linkQuery 有结果且 titleQuery 有结果包含 code，返回 isSuccess。
 * 再检查下 title 中是否含有字幕信息等
 * @param {string} responseText - 页面响应文本
 * @param {DomQuery_parser} queries - 包含链接、标题查询选择器的对象
 * @param {string} siteHostName - 网站的主机名
 * @param {string} CODE - 视频代码
 * @returns {object} - 包含是否成功、目标链接、是否有码泄露、是否有字幕的对象
 */
function serachPageParser(
  responseText: string,
  { linkQuery, titleQuery, listIndex = 0 }: DomQuery_parser,
  siteHostName: string,
  CODE: string,
) {
  const doc = new DOMParser().parseFromString(responseText, 'text/html') // 将响应文本解析为 HTML 文档

  const linkNode = linkQuery ? doc.querySelectorAll<HTMLAnchorElement>(linkQuery)[listIndex] : null // 查找指定索引的链接节点

  const titleNode = titleQuery ? doc.querySelectorAll(titleQuery)[listIndex] : null // 查找指定索引的标题节点

  const titleNodeText = titleNode ? titleNode?.outerHTML : '' // 获取标题节点的 HTML 内容

  const codeRegex = /[a-z]{3,5}-\d{3,5}/i // 定义匹配代码的正则表达式

  const matchCode = titleNodeText.match(codeRegex) // 在标题中匹配代码

  const isSuccess
    = linkNode && titleNode && matchCode && isCaseInsensitiveEqual(matchCode[0], CODE) // 判断链接和标题是否存在且代码匹配

  if (isSuccess) {
    // const targetLinkText = linkNode.href.replace(linkNode.hostname, siteHostName) // 替换目标链接的主机名

    const targetLinkText = linkNode.href.replace(linkNode.host, siteHostName) // 替换目标链接的主机名

    // if (siteHostName.includes('javdb')) {

    // }

    return {
      isSuccess: true, // 成功标志
      targetLink: targetLinkText, // 目标链接
      hasLeakage: regEnum.leakage.test(titleNodeText), // 判断标题中是否有泄露信息
      hasSubtitle: regEnum.subtitle.test(titleNodeText), // 判断标题中是否有字幕信息
    }
  }
  else {
    return { targetLink: '', isSuccess: false, hasSubtitle: false, hasLeakage: false } // 返回失败状态
  }
}

/**
 * 处理 fetch 请求，根据站点类型执行不同的解析逻辑
 * @param {SiteItem} siteItem - 站点对象
 * @param {string} targetLink - 目标链接
 * @param {string} CODE - 视频代码
 * @returns {Promise<FetchResult>} - 返回 FetchResult 的 Promise 对象
 */
export async function handleFetch(siteItem: SiteItem, targetLink: string, CODE: string): Promise<FetchResult> {
  try {
    const response = await gmGet({ url: targetLink }) // 发送 GET 请求获取页面内容

    if (isErrorCode(response.status)) {
      // 请求 404，大概是对应网站没有资源
      throw new Error(String(response.status)) // 如果返回状态码是错误的，则抛出异常
    }

    if (siteItem.fetchType === 'get') {
      // 直接 get 网页，成功，需要进一步解析 videoPage，获取字幕等信息

      return {
        ...videoPageParser(response.responseText, siteItem.domQuery), // 解析视频播放页
        targetLink, // 返回目标链接
      }
    }
    else {
      return {
        ...serachPageParser(response.responseText, siteItem.domQuery, siteItem.hostname, CODE), // 解析搜索结果页
      }
    }
  }
  catch (error) {
    console.error(error)
    return {
      isSuccess: false, // 请求失败
      targetLink, // 返回原始目标链接
      hasSubtitle: false, // 无字幕
      hasLeakage: false, // 无泄露
    }
  }
}

/**
 * jable 有些域名是带 -c，尝试使用新的链接进行请求
 * @param {SiteItem} siteItem - 站点对象
 * @param {string} targetLink - 目标链接
 * @param {string} CODE - 视频代码
 * @returns {Promise<FetchResult>} - 返回 FetchResult 的 Promise 对象
 */
export async function handleFetchJavBle(siteItem: SiteItem, targetLink: string, CODE: string): Promise<FetchResult> {
  const res = await handleFetch(siteItem, targetLink, CODE) // 首先尝试原始链接

  const newLink = `${targetLink.slice(0, -1)}-c/` // 修改链接为带 "-c" 的格式

  return res.isSuccess ? res : await handleFetch(siteItem, newLink, CODE) // 如果原始链接失败，尝试新的链接
}
