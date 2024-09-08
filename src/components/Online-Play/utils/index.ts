import type { LibItem } from './libSites' // 导入类型定义 LibItem

import { SP_PREFIX } from './siteList' // 导入常量 SP_PREFIX

import { GM_xmlhttpRequest } from '$' // 从 Tampermonkey 引入 GM_xmlhttpRequest 方法

/**
 * 比较两个字符串是否相等，不区分大小写
 * @param {string} str1 - 第一个字符串
 * @param {string} str2 - 第二个字符串
 * @returns {boolean} - 如果相等返回 true，否则返回 false
 */
export function isCaseInsensitiveEqual(str1: string, str2: string) {
  return str1.toLowerCase() === str2.toLowerCase() // 将两个字符串都转换为小写再比较
}

/**
 * 检查响应代码是否表示错误
 * @param {number} resCode - 响应代码
 * @returns {boolean} - 如果是 404 或 403，返回 true，否则返回 false
 */
export function isErrorCode(resCode: number) {
  return [404, 403].includes(resCode) // 判断响应代码是否在错误代码列表中
}

/**
 * 定义常用的正则表达式枚举
 */
export const regEnum = {
  subtitle: /(中文|字幕|subtitle)/, // 用于匹配字幕的正则表达式
  leakage: /(无码|無碼|泄漏|Uncensored)/, // 用于匹配无码、泄露等信息的正则表达式
}

/**
 * 获取视频的代码
 * @param {LibItem} libItem - 站点的配置项
 * @returns {string} - 返回提取的视频代码
 */
export function getCode(libItem: LibItem): string {
  const { codeQueryStr } = libItem.querys // 获取站点配置中的代码查询字符串

  const codeNode = document.querySelector<HTMLElement>(codeQueryStr) // 在文档中查询代码节点

  if (!codeNode)
    return '' // 如果没有找到代码节点，返回空字符串

  const codeText
    = libItem.name === 'javdb'
      ? (codeNode.dataset.clipboardText as string) // 如果站点名为 "javdb"，则从 data-clipboard-text 属性中获取代码文本
      : codeNode?.textContent?.replace('复制', '') // 否则，从节点的 innerText 中去除 "复制" 字符

  if (codeText?.includes('FC2'))
    return codeText.split('-')[1] // 如果代码文本包含 "FC2"，返回代码的后半部分
  if (codeText?.startsWith(SP_PREFIX))
    return codeText.substring(3) // 如果代码文本以 SP_PREFIX 开头，去除前缀后返回代码

  return codeText || '' // 返回提取的代码文本
}

// 定义 GM_xmlhttpRequest 的响应接口类型
type TResponse = {
  readonly responseHeaders: string // 响应头字符串
  readonly readyState: 0 | 1 | 2 | 3 | 4 // 请求的就绪状态
  readonly response: any // 响应的主体数据
  readonly responseText: string // 响应的文本数据
  readonly responseXML: Document | null // 响应的 XML 文档
  readonly status: number // HTTP 状态码
  readonly statusText: string // 状态码的文本描述
  readonly finalUrl: string // 最终请求的 URL
}

/**
 * 发送 GET 请求
 * @param {object} params - 请求参数对象
 * @param {string} params.url - 请求的 URL
 * @returns {Promise<TResponse>} - 返回包含响应的 Promise 对象
 */
export function gmGet({ url }: { url: string }): Promise<TResponse> {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'GET', // 请求方法为 GET
      url, // 设置请求 URL
      onload: response => resolve(response), // 请求成功时，解析并返回响应
      onerror: error => reject(error), // 请求失败时，拒绝并返回错误
    })
  })
}

/**
 * 发送 POST 请求
 * @param {object} params - 请求参数对象
 * @param {string} params.url - 请求的 URL
 * @param {Record<string, any>} [params.data] - 请求的数据
 * @returns {Promise<TResponse>} - 返回包含响应的 Promise 对象
 */
export function gmPost({
  url,
  data,
}: {
  url: string
  data?: Record<string, any>
}): Promise<TResponse> {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'POST', // 请求方法为 POST
      data: new URLSearchParams(data).toString(), // 将数据转换为 URL 编码的字符串
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // 设置请求头为表单提交格式
      url, // 设置请求 URL
      onload: response => resolve(response), // 请求成功时，解析并返回响应
      onerror: error => reject(error), // 请求失败时，拒绝并返回错误
    })
  })
}
