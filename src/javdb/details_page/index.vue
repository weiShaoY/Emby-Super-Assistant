<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { sortBtList } from './detailsPageSortBtList'

import { videoManager } from '@/utils'

const addedToEmbyList = ref<VideoType.Video[]>([])

const isShowUpdateChineseButton = ref(false)

const isShowEmbyButton = ref(false)

const videoName = ref<string>('')

/**
 *  是否显示自定义磁链列表
 */
const isShowTorrentList = ref(false)

/**
 *  磁链列表
 */
const torrentList = ref<TorrentType[]>([])

/**
 * 获取详情页视频名称
 * @returns 视频标题文本
 */
function getVideoName(): string {
  const strongElements = document.querySelectorAll('.video-detail strong')

  if (strongElements.length > 0) {
    const titleText = strongElements[0].textContent?.trim().toLowerCase()
      .replace(/\s+/g, '')

    return titleText || ''
  }

  return ''
}

/**
 * 处理视频文件的匹配和状态更新
 * @param videoFileArray 视频文件数组
 */
function processVideoFiles(videoFileArray: VideoType.Video[]) {
  const matchedVideos = videoFileArray.filter(item => item.videoProcessedName.includes(videoName.value))

  const count = matchedVideos.length

  const isEmbyHaveChineseTorrent = matchedVideos.some(item => item.isChineseSubtitle)

  if (count > 0) {
    document.querySelector('.video-meta-panel')?.classList.add('is-highlight')
    addedToEmbyList.value.push(...matchedVideos)
    isShowEmbyButton.value = true
  }

  /**
   *  页面列表当前视频是否含中文磁链
   */
  const isVideoHaveChineseTorrent = !!document.querySelector('.is-warning')

  //  如果当前视频有中文磁链可用并且和 Emby中已经存在的视频没有中文磁链 则 添加提示更新中文磁链按钮
  if (isVideoHaveChineseTorrent && !isEmbyHaveChineseTorrent && count) {
    isShowUpdateChineseButton.value = true
  }
}

/**
 * 获取页面中的磁链列表
 */
function getTorrentList() {
  /**
   *  列表容器
   */
  const magnetsContent = document.getElementById('magnets-content')

  if (!magnetsContent || !magnetsContent.children.length)
    return

  /**
   *  磁链列表
   */
  const items = Array.from(magnetsContent.querySelectorAll('.columns'))

  items.forEach((item: any) => {
    const name = item.querySelector('.name')?.textContent?.trim() || ''

    const url = item.children[2]?.children[0]?.dataset?.clipboardText?.split('&')[0] || ''

    const size = Number.parseFloat(item.querySelector('.meta')?.textContent?.trim().match(/(\d+(\.\d+)?)GB/)?.[1] || '0')

    const time = item.querySelector('.time')?.textContent?.trim() || ''

    const isHD = !!item.querySelector('.is-primary')

    const isChinese = !!item.querySelector('.is-warning')

    if (name && url && time) {
      const torrentListItem: TorrentType = { url, name, size, time, isHD, isChinese }

      torrentList.value.push(torrentListItem)
    }
  })
}

function main() {
  const videoFileArray = videoManager.get()

  if (!videoFileArray)
    return

  videoName.value = getVideoName()
  if (!videoName.value)
    return

  processVideoFiles(videoFileArray)
}

onMounted(() => {
  getTorrentList()

  main()

  const columns = document.querySelectorAll('.columns')

  if (columns.length < 4)
    return

  columns[4].insertAdjacentHTML('afterend', '<div id="TorrentList"></div>')
  columns[5].remove()

  isShowTorrentList.value = true
})
</script>

<template>
  <Teleport
    to=".movie-panel-info"
  >
    <div
      class="flex items-center gap-2 p-3"
    >
      <BtsowButton
        :video-name="videoName"
        :width="100"
        :height="40"
      />

      <EmbyButton
        v-if="isShowEmbyButton"
        :video-name="videoName"
        :width="100"
        :height="40"
      />
    </div>
  </Teleport>

  <div
    class="fixed left-2 top-60 w-60"
  >
    <UpdateChineseButton
      v-if="isShowUpdateChineseButton"
      class="tag m-b-15"
      :height="40"
      width="100%"
    />

    <div
      v-if="addedToEmbyList.length"
      class="z-index-3 w-full rounded-2 bg-#FF8400 p-y-1"
    >
      <AddedToEmbyButton
        v-for="(item, index) in addedToEmbyList"
        :key="index"
        :video="item"
      />
    </div>
  </div>

  <Teleport
    v-if="isShowTorrentList"
    to="#TorrentList"
  >
    <TorrentList
      :torrent-list="torrentList"
    />
  </Teleport>
</template>

<style lang="less" scoped>
/* 样式根据需要在此处编写 */
</style>
