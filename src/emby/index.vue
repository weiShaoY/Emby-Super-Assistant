<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import potPlayerSvg from '@/assets/svg/potPlayer.svg'

import copySvg from '@/assets/svg/copy.svg'

const isShowMountPoint = ref(false)

function init() {
  const mainDetailButtons = document.querySelector(
    'div[is=\'emby-scroller\']:not(.hide) .mainDetailButtons',
  )

  console.log(
    '%c Line:41 🍕 mainDetailButtons',
    'color:#6ec1c2',
    mainDetailButtons,
  )

  if (mainDetailButtons) {
    mainDetailButtons.insertAdjacentHTML(
      'afterend',
      '<div id="mountPoint"></div>',
    )
    isShowMountPoint.value = true
  }
}

/**
 * 检查是否显示外部播放器按钮的条件。
 * @returns  如果主详细按钮存在且视频或音频容器不隐藏，则返回true，否则返回false。
 */
function showFlag() {
  const mainDetailButtons = document.querySelector(
    'div[is=\'emby-scroller\']:not(.hide) .mainDetailButtons',
  )

  if (!mainDetailButtons) {
    return false
  }

  const videoElement = document.querySelector(
    'div[is=\'emby-scroller\']:not(.hide) .selectVideoContainer',
  )

  if (videoElement && videoElement.classList.contains('hide')) {
    return false
  }

  const audioElement = document.querySelector(
    'div[is=\'emby-scroller\']:not(.hide) .selectAudioContainer',
  )

  return !(audioElement && audioElement.classList.contains('hide'))
}

document.addEventListener('viewbeforeshow', (e: any) => {
  console.log('%c Line:47 🍉 e', 'color:#465975', e)
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
 * 获取播放意图，包括标题、位置和字幕信息。
 * @param {object} mediaSource - 媒体源对象。
 * @param {number} position - 播放位置的 ticks 值。
 * @returns {Promise<object>} 返回包含标题、位置和字幕信息的对象。
 */
async function getIntent(mediaSource, position) {
  const title = mediaSource.Path.split('/').pop()

  const externalSubs = mediaSource.MediaStreams.filter(m => m.IsExternal)

  const subs_name = externalSubs.map(s => s.DisplayTitle)

  const subs_filename = externalSubs.map(s => s.Path.split('/').pop())

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
 * @returns {Promise<object>} 返回包含电影或剧集信息的对象。
 */
async function getItemInfo() {
  const userId = ApiClient._serverInfo.UserId

  console.log('%c Line:125 🍺 ApiClient', 'color:#ffdd4d', ApiClient)

  const itemId = /\?id=(\d+)/.exec(window.location.hash)[1]

  const response = await ApiClient.getItem(userId, itemId)

  switch (response.Type) {
    case 'Series': {
      const {
        Items: [nextUpItem],
      } = await ApiClient.getNextUpEpisodes({
        SeriesId: itemId,
        UserId: userId,
      })

      return ApiClient.getItem(userId, nextUpItem.Id)
    }

    case 'Season': {
      const {
        Items: [firstEpisode],
      } = await ApiClient.getItems(userId, { parentId: itemId })

      return ApiClient.getItem(userId, firstEpisode.Id)
    }

    default:
      return response
  }
}

/**
 * 获取字幕的路径。
 * @param {object} mediaSource - 媒体源对象，包含字幕信息。
 * @returns {string} 字幕路径。
 */
function getSubPath(mediaSource) {
  const selectSubtitles = document.querySelector(
    'div[is="emby-scroller"]:not(.hide) select.selectSubtitles',
  )

  let subTitlePath = ''

  if (selectSubtitles && selectSubtitles.value > 0) {
    const selectedStream = mediaSource.MediaStreams.find(
      m => m.Index == selectSubtitles.value && m.IsExternal,
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
 * @returns {Promise<object>} 返回包含流媒体URL、字幕URL和意图的对象。
 */
async function getEmbyMediaInfo() {
  const itemInfo = await getItemInfo()

  const selectSource = document.querySelector(
    'div[is="emby-scroller"]:not(.hide) select.selectSource',
  )

  const mediaSourceId = selectSource?.value || itemInfo.MediaSources[0].Id

  const mediaSource = itemInfo.MediaSources.find(m => m.Id == mediaSourceId)

  const domain = `${ApiClient._serverAddress}/emby/videos/${itemInfo.Id}`

  const subPath = getSubPath(mediaSource)

  return {
    streamUrl: `${domain}/stream.${mediaSource.Container}?api_key=${ApiClient.accessToken()}&Static=true&MediaSourceId=${mediaSourceId}`,
    subUrl: subPath
      ? `${domain}${subPath}?api_key=${ApiClient.accessToken()}`
      : '',
    intent: await getIntent(
      mediaSource,
      Number.parseInt(itemInfo.UserData.PlaybackPositionTicks / 10000),
    ),
  }
}

/**
 * 将播放位置转换为时分秒格式的字符串。
 * @param {number} position - 播放位置的 ticks 值。
 * @returns {string} 格式为 "hh:mm:ss" 的时间字符串。
 */
function getSeek(position: number) {
  const seconds = Math.floor(position % 60)
    .toString()
    .padStart(2, '0')

  const minutes = Math.floor((position / 60) % 60)
    .toString()
    .padStart(2, '0')

  const hours = Math.floor(position / 3600)

  return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`
}

/**
 * 打开 PotPlayer 播放。
 */
async function embyOpenPotPlayer() {
  const mediaInfo = await getEmbyMediaInfo()

  console.log('%c Line:209 🍓 mediaInfo', 'color:#b03734', mediaInfo)

  const { streamUrl, subUrl, intent } = mediaInfo

  const poturl = `potplayer://${encodeURI(streamUrl)} /sub=${encodeURI(subUrl)} /current /title="${intent.title}" /seek=${getSeek(intent.position)}`

  window.open(poturl, '_blank')
}
</script>

<template>
  <Teleport
    v-if="isShowMountPoint"
    to="#mountPoint"
  >
    <div
      class="flex gap-2 bg-#FF8400"
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
