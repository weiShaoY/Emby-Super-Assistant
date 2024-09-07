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

    return {
      emby,
    }
  },

)

export default useEmbyStore
