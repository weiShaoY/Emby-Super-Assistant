<script lang="ts" setup>
import { ref } from 'vue'

import { Message } from '@arco-design/web-vue'

import potPlayerSvg from '@/assets/svg/potPlayer.svg'

import copySvg from '@/assets/svg/copy.svg'

import folderSvg from '@/assets/svg/folder.svg'

import { config } from '@/config'

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
 *  打开文件夹
 */
async function embyOpenFolder() {
  const { intent } = await getEmbyMediaInfo()

  const directoryPath = intent.title.substring(0, intent.title.lastIndexOf('\\'))

  config.quicker.openFolder(directoryPath, true)
}

/**
 *  在Javdb搜索当前影片
 */
async function embyOpenJavdb() {
  const { intent: { title } } = await getEmbyMediaInfo()

  const result = title.substring(title.lastIndexOf('\\') + 1, title.indexOf('.', title.lastIndexOf('\\'))).toLowerCase()
    .replace(config.video.tagRegex, '')

  config.web.javdb.search(result)
}

/**
 *  是否为详情页
 */
const isDetailsPage = ref(false)

/**
 *  地址栏是否变化
 */
// document.addEventListener('viewbeforeshow', async (e: any) => {
//   // 重置 isDetailsPage 状态
//   isDetailsPage.value = false

//   // 检查是否为详情页
//   if (e.detail.contextPath.startsWith('/item?id=')) {
//     setTimeout(() => {
//       // const videoElement = document.querySelector(
//       //   'div[is=\'emby-scroller\']:not(.hide) .detailTextContainer',
//       // )
//       const videoElement = document.querySelector(
//         '.itemView:not(.hide) .detailTextContainer',
//       )

//       if (videoElement) {
//       // 移除 videoElement 内所有 id 为 btnTool 的元素
//         document.querySelectorAll('#targetNode').forEach(element => element.remove())

//         // 创建并添加新按钮元素
//         const div = document.createElement('div')

//         div.id = 'targetNode'
//         videoElement.appendChild(div)

//         // 设置 isDetailsPage 状态
//         isDetailsPage.value = true
//       }
//     }, 200)
//   }
// })

setTimeout(() => {
  const videoElement = document.querySelector(
    '.itemView:not(.hide) .detailTextContainer',
  )

  if (videoElement) {
  // 移除 videoElement 内所有 id 为 btnTool 的元素
    document.querySelectorAll('#targetNode').forEach(element => element.remove())

    // 创建并添加新按钮元素
    const div = document.createElement('div')

    div.id = 'targetNode'
    videoElement.appendChild(div)

    // 设置 isDetailsPage 状态
    isDetailsPage.value = true
  }
}, 200)
</script>

<template>
  <Teleport
    v-if="isDetailsPage"
    to="#targetNode"
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
        @click="embyOpenFolder"
      >
        <i
          class="m-r-2 h-6 w-6 bg-cover bg-no-repeat"
          :style="{
            backgroundImage: `url(${folderSvg})`,
          }"
        />

        <span> 打开文件夹 </span>
      </button>

      <button
        class="btnPlay btnMainPlay raised detailButton emby-button detailButton-primary detailButton-stacked"
        @click="embyOpenJavdb"
      >
        <i
          class="m-r-2 h-6 w-6 bg-cover bg-no-repeat"
          :style="{
            backgroundImage: `url(${config.web.javdb.icon})`,
          }"
        />

        <span> Javdb </span>
      </button>
    </div>
  </Teleport>
</template>

<style lang="less" scoped></style>
