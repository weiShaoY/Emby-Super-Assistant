<script lang="ts" setup>
import { ref } from 'vue'

import { Message } from '@arco-design/web-vue'

import potPlayerSvg from '@/assets/svg/potPlayer.svg'

import copySvg from '@/assets/svg/copy.svg'

import { videoConfig } from '@/config'

const isShow = ref(false)

/**
 * 初始化函数，在主详细按钮后插入一个挂载点并设置显示标志。
 */
function init() {
  const mainDetailButtons = document.querySelector(
    'div[is=\'emby-scroller\']:not(.hide) .mainDetailButtons',
  )

  if (mainDetailButtons) {
    mainDetailButtons.insertAdjacentHTML('afterend', '<div id="mountPoint"></div>')
  }

  isShow.value = true
}

/**
 * 检查是否显示外部播放器按钮的条件。
 * @returns {boolean} 如果主详细按钮存在且视频或音频容器不隐藏，则返回true，否则返回false。
 */
function showFlag(): boolean {
  const mainDetailButtons = document.querySelector(
    'div[is=\'emby-scroller\']:not(.hide) .mainDetailButtons',
  )

  if (!mainDetailButtons)
    return false

  const videoElement = document.querySelector(
    'div[is=\'emby-scroller\']:not(.hide) .selectVideoContainer',
  )

  if (videoElement && videoElement.classList.contains('hide'))
    return false

  const audioElement = document.querySelector(
    'div[is=\'emby-scroller\']:not(.hide) .selectAudioContainer',
  )

  return !(audioElement && audioElement.classList.contains('hide'))
}

document.addEventListener('viewbeforeshow', (e: any) => {
  if (e.detail.contextPath.startsWith('/item?id=')) {
    const mutation = new MutationObserver(() => {
      if (showFlag()) {
        init()
        mutation.disconnect()
      }
    })

    mutation.observe(document.body, {
      childList: true,
      characterData: true,
      subtree: true,
    })
  }
})

/**
 * 表示媒体流信息的类型。
 */
 type MediaStream = {

   /**
    * 媒体流的唯一标识符
    * @type {string}
    */
   Id: string

   /**
    * 媒体流使用的编码格式
    * @type {string}
    */
   Codec: string

   /**
    * 指示媒体流是否为外部字幕或音轨
    * @type {boolean}
    */
   IsExternal: boolean

   /**
    * 媒体流的语言
    * @type {string}
    */
   Language: string

   /**
    * 媒体流的显示标题
    * @type {string}
    */
   DisplayTitle: string

   /**
    * 媒体流的文件路径
    * @type {string}
    */
   Path: string

   /**
    * 媒体流在媒体源中的索引
    * @type {number}
    */
   Index: number
 }

/**
 * 表示媒体源信息的类型。
 */
 type MediaSource = {

   /**
    * 媒体源的唯一标识符
    * @type {string}
    */
   Id: string

   /**
    * 媒体源的文件路径
    * @type {string}
    */
   Path: string

   /**
    * 媒体源中的媒体流列表
    * @type {MediaStream[]}
    */
   MediaStreams: MediaStream[]

   /**
    * 媒体源使用的容器格式
    * @type {string}
    */
   Container: string
 }

/**
 * 表示用户数据的类型。
 */
type UserData = {

  /**
   * 播放位置的 ticks 值
   * @type {number}
   */
  PlaybackPositionTicks: number
}

/**
 * 表示媒体项信息的类型。
 */
type ItemInfo = {

  /**
   * 媒体项的唯一标识符
   * @type {string}
   */
  Id: string

  /**
   * 媒体项的类型，如 "Series" 或 "Season"
   * @type {string}
   */
  Type: string

  /**
   * 媒体项的媒体源列表
   * @type {MediaSource[]}
   */
  MediaSources: MediaSource[]

  /**
   * 媒体项的用户数据
   * @type {UserData}
   */
  UserData: UserData
}

/**
 * 表示 Emby 的 ApiClient 的类型接口。
 */
type ApiClientType = {

  /**
   * 服务器信息，包括用户 ID
   * @type {{ UserId: string }}
   */
  _serverInfo: { UserId: string }

  /**
   * 服务器地址
   * @type {string}
   */
  _serverAddress: string

  /**
   * 获取访问令牌的方法
   * @type {() => string}
   */
  accessToken: () => string

  /**
   * 获取媒体项信息的方法
   * @type {(userId: string, itemId: string) => Promise<ItemInfo>}
   */
  getItem: (userId: string, itemId: string) => Promise<ItemInfo>

  /**
   * 获取下一集信息的方法
   * @type {(params: { SeriesId: string, UserId: string }) => Promise<{ Items: ItemInfo[] }>}
   */
  getNextUpEpisodes: (params: { SeriesId: string, UserId: string }) => Promise<{ Items: ItemInfo[] }>

  /**
   * 获取媒体项列表的方法
   * @type {(userId: string, params: { parentId: string }) => Promise<{ Items: ItemInfo[] }>}
   */
  getItems: (userId: string, params: { parentId: string }) => Promise<{ Items: ItemInfo[] }>
}

// 假设 ApiClient 是全局对象
declare const ApiClient: ApiClientType

/**
 * 获取播放意图，包括标题、位置和字幕信息。
 * @param {MediaSource} mediaSource - 媒体源对象。
 * @param {number} position - 播放位置的 ticks 值。
 * @returns {Promise<object>} 返回包含标题、位置和字幕信息的对象。
 */
async function getIntent(mediaSource: MediaSource, position: number) {
  const title = mediaSource.Path.split('/').pop() || ''

  const externalSubs = mediaSource.MediaStreams.filter(m => m.IsExternal)

  const subs_name = externalSubs.map(s => s.DisplayTitle)

  const subs_filename = externalSubs.map(s => s.Path.split('/').pop() || '')

  return {
    title,
    position,
    subs: '', // 暂时保留空值，需求是 android.net.Uri[] 类型
    subs_name,
    subs_filename,
    subs_enable: '', // 暂时保留空值
  }
}

/**
 * 获取电影或剧集的详细信息。
 * @returns {Promise<ItemInfo>} 返回包含电影或剧集信息的对象。
 */
async function getItemInfo(): Promise<ItemInfo> {
  const userId = ApiClient._serverInfo.UserId

  const itemId = /\?id=(\d+)/.exec(window.location.hash)?.[1] || ''

  const response = await ApiClient.getItem(userId, itemId)

  switch (response.Type) {
    case 'Series': {
      const { Items: [nextUpItem] } = await ApiClient.getNextUpEpisodes({
        SeriesId: itemId,
        UserId: userId,
      })

      return ApiClient.getItem(userId, nextUpItem.Id)
    }

    case 'Season': {
      const { Items: [firstEpisode] } = await ApiClient.getItems(userId, { parentId: itemId })

      return ApiClient.getItem(userId, firstEpisode.Id)
    }

    default:
      return response
  }
}

/**
 * 获取字幕的路径。
 * @param {MediaSource} mediaSource - 媒体源对象，包含字幕信息。
 * @returns {string} 字幕路径。
 */
function getSubPath(mediaSource: MediaSource): string {
  const selectSubtitles = document.querySelector<HTMLSelectElement>(
    'div[is="emby-scroller"]:not(.hide) select.selectSubtitles',
  )

  let subTitlePath = ''

  if (selectSubtitles && Number.parseInt(selectSubtitles.value) > 0) {
    const selectedStream = mediaSource.MediaStreams.find(
      m => m.Index === Number.parseInt(selectSubtitles.value) && m.IsExternal,
    )

    if (selectedStream) {
      subTitlePath = `/${mediaSource.Id}/Subtitles/${selectSubtitles.value}/Stream.${selectedStream.Codec}`
    }
  }
  else {
    const externalSub = mediaSource.MediaStreams.find(
      m => m.IsExternal && (m.Language === 'chi' || !subTitlePath),
    )

    if (externalSub) {
      subTitlePath = `/${mediaSource.Id}/Subtitles/${externalSub.Index}/Stream.${externalSub.Codec}`
    }
  }

  return subTitlePath
}

/**
 * 获取Emby媒体的详细信息，包括流媒体URL和字幕URL。
 * @returns {Promise<{streamUrl: string, subUrl: string, intent: object}>} 返回包含流媒体URL、字幕URL和意图的对象。
 */
async function getEmbyMediaInfo() {
  const itemInfo = await getItemInfo()

  const selectSource = document.querySelector<HTMLSelectElement>(
    'div[is="emby-scroller"]:not(.hide) select.selectSource',
  )

  const mediaSourceId = selectSource?.value || itemInfo.MediaSources[0].Id

  const mediaSource = itemInfo.MediaSources.find(m => m.Id === mediaSourceId)!

  const domain = `${ApiClient._serverAddress}/emby/videos/${itemInfo.Id}`

  const subPath = getSubPath(mediaSource)

  return {
    streamUrl: `${domain}/stream.${mediaSource.Container}?api_key=${ApiClient.accessToken()}&Static=true&MediaSourceId=${mediaSourceId}`,
    subUrl: subPath ? `${domain}${subPath}?api_key=${ApiClient.accessToken()}` : '',
    intent: await getIntent(mediaSource, Math.floor(itemInfo.UserData.PlaybackPositionTicks / 10000)),
  }
}

/**
 * 将播放位置转换为时分秒格式的字符串。
 * @param {number} position - 播放位置的 ticks 值。
 * @returns {string} 格式为 "hh:mm:ss" 的时间字符串。
 */
function formatPlaybackTime(position: number): string {
  const seconds = Math.floor(position % 60).toString()
    .padStart(2, '0')

  const minutes = Math.floor((position / 60) % 60).toString()
    .padStart(2, '0')

  const hours = Math.floor(position / 3600)

  return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`
}

/**
 * 打开 PotPlayer 播放。
 */
async function embyOpenPotPlayer() {
  const mediaInfo = await getEmbyMediaInfo()

  const { streamUrl, subUrl, intent } = mediaInfo

  const potPlayerUrl = `potplayer://${encodeURI(streamUrl)} /sub=${encodeURI(subUrl)} /current /title="${intent.title}" /seek=${formatPlaybackTime(intent.position)}`

  window.open(potPlayerUrl, '_blank')
}

/**
 *  复制视频链接到剪切板。
 */
async function embyCopyUrl() {
  const { streamUrl } = await getEmbyMediaInfo()

  const textarea = document.createElement('textarea')

  textarea.value = streamUrl
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)

  Message.success('视频名称 已复制到剪切板')
}

/**
 *  复制视频位置到剪切板
 */

/**
 *  在Javdb搜索当前影片
 */
async function embyOpenJavdb() {
  const mediaInfo = await getEmbyMediaInfo()

  const videoName = mediaInfo.intent.title

  // 提取最后一个反斜杠之后到第一个点之间的部分
  const result = videoName
    .substring(
      videoName.lastIndexOf('\\') + 1,
      videoName.indexOf('.', videoName.lastIndexOf('\\')),
    )
    .toLowerCase()
    .replace(videoConfig.tagRegex, '')

  window.open(`https://javdb.com/search?q=${result}&f=all`, '_blank')
}

/**
 *  判断是否为来自Javdb的视频
 */

function checkIfReferredFromJavdb() {
  const videoName = GM_getValue('EMBY-BTN-VALUE')

  if (!videoName) {
    return
  }

  onMounted(() => {
    const observer = new MutationObserver(() => {
      const inputElement = document.querySelector(
        'input[is="emby-input"][type="search"]',
      ) as any

      if (inputElement) {
        inputElement.value = videoName

        inputElement.dispatchEvent(
          new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            charCode: 13,
          }),
        )

        // 停止观察
        observer.disconnect()
        GM_setValue('EMBY-BTN-VALUE', '')
      }
    })

    // 开始观察 DOM 变化
    observer.observe(document.body, { childList: true, subtree: true })
  })
}

checkIfReferredFromJavdb()
</script>

<template>
  <Teleport
    v-if="isShow"
    to="#mountPoint"
  >
    <div
      class="flex gap-2"
    >
      <button
        class="btnPlay btnMainPlay raised detailButton emby-button detailButton-primary detailButton-stacked"
        @click="embyOpenPotPlayer"
      >
        <i
          class="m-r-2 h-6 w-6 bg-cover bg-no-repeat"
          :style="{
            backgroundImage: `url(${potPlayerSvg})`,
          }"
        />

        <span> PotPlayer </span>
      </button>

      <button
        class="btnPlay btnMainPlay raised detailButton emby-button detailButton-primary detailButton-stacked"
        @click="embyCopyUrl"
      >
        <i
          class="m-r-2 h-6 w-6 bg-cover bg-no-repeat"
          :style="{
            backgroundImage: `url(${copySvg})`,
          }"
        />

        <span> 复制视频链接 </span>
      </button>

      <button
        class="btnPlay btnMainPlay raised detailButton emby-button detailButton-primary detailButton-stacked"
        @click="embyOpenJavdb"
      >
        <i
          class="m-r-2 h-6 w-6 bg-cover bg-no-repeat"
          :style="{
            backgroundImage: `url(https://www.javdb.com/favicon.ico)`,
          }"
        />

        <span> Javdb </span>
      </button>
    </div>
  </Teleport>
</template>

<style lang="less" scoped></style>
