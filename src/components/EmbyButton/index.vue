<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type { CSSProperties } from 'vue'

import { embyConfig } from '@/config'

import { GM_getValue, GM_setValue, GM_xmlhttpRequest } from '$'

const props = defineProps({
  /**
   *  @description  视频名称
   */
  videoName: {
    type: String,
    required: true,
  },

  /**
   *  是否显示视频名称
   */
  isShowVideoName: {
    type: Boolean,
    default: false,
  },

  /**
   *  按钮宽度
   */
  width: {
    type: [String, Number],
    default: '100%',
  },

  /**
   *  按钮高度
   */
  height: {
    type: [String, Number],
    default: '100%',
  },

  /**
   *  圆角
   */
  radius: {
    type: [String, Number],
    default: 10,
  },

  /**
   *  按钮类名
   */
  class: {
    type: String,
    default: '',
  },

  /**
   *  按钮样式
   */
  style: {
    type: Object as () => CSSProperties,
    default: () => ({
    }),
  },

})

function embyBtnHandler(event: MouseEvent) {
  event.preventDefault()

  // 可以在这里添加其他逻辑

  /**
   * 构建 Emby 请求 URL
   * @param  embyConfig - Emby 配置
   * @returns {string} - 完整的请求 URL
   */
  const buildEmbyRequestUrl = (embyConfig: any) => {
    const queryParams = {
      ...embyConfig.queryParams,
      SearchTerm: props.videoName,
    }

    const queryString = Object.entries(queryParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
      )
      .join('&')

    return `${embyConfig.url}/emby/Users/${embyConfig.userId}/Items?${queryString}`
  }

  GM_xmlhttpRequest({
    method: 'GET',
    url: buildEmbyRequestUrl(embyConfig),
    headers: {
      'Accept': 'application/json',
      'X-Emby-Client': 'Emby Web',
      'X-Emby-Device-Name': embyConfig.deviceName,
      'X-Emby-Device-Id': embyConfig.deviceId,
      'X-Emby-Client-Version': embyConfig.clientVersion,
      'X-Emby-Token': embyConfig.token,
      'X-Emby-Language': embyConfig.language,
    },
    onload: (response: any) => {
      if (response.status >= 200 && response.status < 300) {
        try {
          // 将 JSON 字符串转换为 JSON 对象
          const result = JSON.parse(response.responseText)

          if (result.Items.length === 1) {
            const id = result.Items[0].Id

            const serverId = result.Items[0].ServerId

            window.open(
              `${embyConfig.url}/web/index.html#!/item?id=${id}&serverId=${serverId}`,
              '_blank',
            )

            GM_setValue('EMBY-BTN-VALUE', '')
          }
          else {
            GM_setValue('EMBY-BTN-VALUE', props.videoName)
            window.open(`${embyConfig.url}/web/index.html#!/home`, '_blank')
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
    onerror: (error: any) => {
      console.error('Request failed:', error)
    },
  })
}

const mounted = ref(false)

onMounted(async () => {
  mounted.value = true
})
</script>

<template>
  <div
    class="relative z-1 h-25 w-40 flex translate-x-0 cursor-pointer items-center justify-center overflow-hidden border-3 border-[#52B54B] bg-transparent text-lg font-bold before:absolute before:left-0 before:top-0 before:z-[-1] before:h-full before:w-full before:translate-x--100% !bg-white before:bg-[#52B54B] !text-[#52B54B] before:transition-all-600 before:content-[''] hover:before:translate-x-0 !hover:text-white"
    :class="props.class"
    :style="{
      borderRadius: `${radius}px`,
      height: typeof height === 'number' ? `${height}px` : `${height}`,
      width: typeof width === 'number' ? `${width}px` : `${width}`,
      ...style,
    }"
    @click="embyBtnHandler"
  >

    {{ isShowVideoName ? videoName : 'Emby' }}
  </div>
</template>

<style lang="less" scoped></style>
