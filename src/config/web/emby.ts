import Message from '@arco-design/web-vue/es/message'

import embySvg from '@/assets/svg/site/emby.svg'

import embyHoverSvg from '@/assets/svg/site/emby-hover.svg'

/**
 *  Emby 配置
 */
export const emby = {
  icon: embySvg,

  iconHover: embyHoverSvg,

  /**
   * Emby 服务器的 URL。
   */
  url: 'http://192.168.0.4:8096',

  /**
   * Emby 服务器用户 ID。
   */
  userId: 'bd743a8bac9247fb9f5cad8b08945906',

  /**
   * 发起请求的设备名称。
   */
  deviceName: 'Chrome Windows',

  /**
   * 发起请求设备的 ID。
   */
  deviceId: 'aa94db6f-fb2d-48d8-a6e1-6b67b3d90036',

  /**
   * Emby 客户端的版本号。
   */
  clientVersion: '4.8.8.0',

  /**
   * Emby 服务器使用的语言代码。
   */
  language: 'zh-cn',

  /**
   * 用户的认证令牌。
   */
  token: 'cf925526b6f648b695cc28d2e967e3db',

  /**
   * 发送到 Emby 服务器的查询字符串参数。
   */
  queryParams: {
    /**
     * 搜索词。
     */
    SearchTerm: '',

    /**
     * 指定返回的字段列表。
     */
    Fields:
      'BasicSyncInfo,CanDelete,PrimaryImageAspectRatio,ProductionYear,Status,EndDate',

    /**
     * 查询结果的起始索引。
     */
    StartIndex: 0,

    /**
     * 指定排序的字段。
     */
    SortBy: 'SortName',

    /**
     * 排序的顺序（升序或降序）。
     */
    SortOrder: 'Ascending',

    /**
     * 启用的图像类型。
     */
    EnableImageTypes: 'Primary,Backdrop,Thumb',

    /**
     * 每种类型的图像数量限制。
     */
    ImageTypeLimit: 1,

    /**
     * 是否递归查询子项。
     */
    Recursive: true,

    /**
     * 是否按系列分组节目。
     */
    GroupProgramsBySeries: true,

    /**
     * 返回结果的最大数量。
     */
    Limit: 50,

  },

  /**
   * 构建 Emby 请求 URL
   * @param  videoName - 视频名称
   * @returns   完整的请求 URL
   */
  buildRequestUrl(videoName: string) {
    const queryParams = {
      ...this.queryParams,
      SearchTerm: videoName,
    }

    const queryString = Object.entries(queryParams)
      .map(
        ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
      )
      .join('&')

    return `${this.url}/emby/Users/${this.userId}/Items?${queryString}`
  },

  /**
   * 处理 Emby 按钮点击事件
   * @param  videoName - 视频名称
   */
  openEmby(videoName: string) {
    /**
     *  设置超时时间为 2 秒
     */
    const timeoutDuration = 2000

    const timeoutId = setTimeout(() => {
      Message.error({
        content: '请求超时, 请检查 Emby 服务器',
        duration: 5000,
      })
    }, timeoutDuration)

    GM_xmlhttpRequest({
      method: 'GET',
      url: this.buildRequestUrl(videoName),
      headers: {
        'Accept': 'application/json',
        'X-Emby-Client': 'Emby Web',
        'X-Emby-Device-Name': this.deviceName,
        'X-Emby-Device-Id': this.deviceId,
        'X-Emby-Client-Version': this.clientVersion,
        'X-Emby-Token': this.token,
        'X-Emby-Language': this.language,
      },
      onload: (response: any) => {
        console.log('%c Line:155 🍧 response', 'color:#42b983', response)

        // 请求成功，清除超时计时器
        clearTimeout(timeoutId)

        if (response.status >= 200 && response.status < 300) {
          try {
            // 将 JSON 字符串转换为 JSON 对象
            const result = JSON.parse(response.responseText)

            if (result.Items.length === 1) {
              const id = result.Items[0].Id

              const serverId = result.Items[0].ServerId

              window.open(
                `${this.url}/web/index.html#!/item?id=${id}&serverId=${serverId}`,
                '_blank',
              )

              GM_setValue('EMBY-BTN-VALUE', '')
            }
            else {
              GM_setValue('EMBY-BTN-VALUE', videoName)
              window.open(`${this.url}/web/index.html#!/home`, '_blank')
            }
          }
          catch (e) {
            console.error('请求失败:', e)
          }
        }
        else {
          console.error(`HTTP 错误: ${response.status}`)
        }
      },
      onerror: () => {
        Message.error('请求失败, 请检查 Emby 服务器')
      },
    })
  },
}

export default emby
