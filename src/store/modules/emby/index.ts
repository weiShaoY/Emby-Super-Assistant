import { Message } from '@arco-design/web-vue'

import { ref } from 'vue'

import { defineStore } from 'pinia'

const useEmbyStore = defineStore(
  'emby',
  () => {
    const emby = ref({
      /**
       * Emby 服务器的 URL。
       */
      url: 'http://192.168.0.4',

      /**
       * Emby 服务器的端口号。
       */
      port: '8096',

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
        SearchTerm: '',
        Fields:
          'BasicSyncInfo,CanDelete,PrimaryImageAspectRatio,ProductionYear,Status,EndDate',
        StartIndex: 0,
        SortBy: 'SortName',
        SortOrder: 'Ascending',
        EnableImageTypes: 'Primary,Backdrop,Thumb',
        ImageTypeLimit: 1,
        Recursive: true,
        GroupProgramsBySeries: true,
        Limit: 50,
      },
    })

    /**
     * 构建 Emby 请求 URL
     * @param  videoName - 视频名称
     * @returns   完整的请求 URL
     */
    function buildRequestUrl(videoName: string) {
      const queryParams = {
        ...emby.value.queryParams,
        SearchTerm: videoName,
      }

      const queryString = Object.entries(queryParams)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
        )
        .join('&')

      return `${emby.value.url}:${emby.value.port}/emby/Users/${emby.value.userId}/Items?${queryString}`
    }

    /**
     *  搜索 Emby 服务器上的视频。
     *  @param  videoName - 视频名称
     */
    function embySearch(videoName: string) {
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

      console.log('%c Line:107 🍷 buildRequestUrl(videoName)', 'color:#e41a6a', buildRequestUrl(videoName))
      GM_xmlhttpRequest({
        method: 'GET',
        url: buildRequestUrl(videoName),
        headers: {
          'Accept': 'application/json',
          'X-Emby-Client': 'Emby Web',
          'X-Emby-Device-Name': emby.value.deviceName,
          'X-Emby-Device-Id': emby.value.deviceId,
          'X-Emby-Client-Version': emby.value.clientVersion,
          'X-Emby-Token': emby.value.token,
          'X-Emby-Language': emby.value.language,
        },
        onload: (response: any) => {
          console.log('%c Line:121 🍬 response', 'color:#ffdd4d', response)

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
                `${emby.value.url}:${emby.value.port}/web/index.html#!/item?id=${id}&serverId=${serverId}`,
                '_blank',
                )

                GM_setValue('EMBY-BTN-VALUE', '')
              }
              else {
                GM_setValue('EMBY-BTN-VALUE', videoName)
                window.open(`${emby.value.url}:${emby.value.port}/web/index.html#!/home`, '_blank')
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
    }

    return {
      emby,
      embySearch,
    }
  },

)

export default useEmbyStore
