<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { videoConfig } from '@/config'

import { getTagArray, videoManager } from '@/utils'

const addedToEmbyList = ref<VideoType.Video[]>([])

const isShowUpdateChineseButton = ref(false)

const isShowEmbyButton = ref(false)

/**
 *  页面视频名称
 */
const pageVideoName = ref<string>('')

/**
 *  是否显示自定义磁链列表
 */
const isShowTorrentList = ref(false)

/**
 *  磁链列表
 */
const torrentList = ref<TorrentType[]>([])

/**
 *  是否显示 提示更新中文磁链按钮
 */
const isVideoHaveChineseTorrent = ref(false)

/**
 * 为指定元素添加高亮类名
 * @param {Element | null} element - 需要高亮的元素
 * @description 高亮类名为 'is-highlight'
 */
function highlightElement(element: Element | null) {
  element?.classList.add('is-highlight')
}

/**
 * 获取详情页视频名称
 * @returns 视频标题文本
 */
function getPageVideoName(): string {
  const url = window.location.href

  return url.substring(url.lastIndexOf('/') + 1)
    .trim()
    .toLowerCase() || ''
}

/**
 * 获取页面中的磁链列表
 */
function getTorrentList() {
  /**
   *  列表容器
   */
  const magnetsContent = document.getElementById('magnet-table')

  if (!magnetsContent || !magnetsContent.children.length)
    return

  /**
   *  磁链列表
   */
  const items = Array.from(magnetsContent.querySelectorAll('tr'))

  items.forEach((item: any, index: number) => {
    if (index === 0) {
      return
    }

    const tdList = item.children

    const url = tdList[0].children[0].href

    const name = tdList[0].children[0]?.textContent?.trim() as string

    const size = Number.parseFloat(tdList[1].children[0]?.textContent?.trim().match(/(\d+(\.\d+)?)GB/)?.[1] || '0')

    const time = tdList[2].children[0]?.textContent?.trim()

    const tagArray = getTagArray(name)

    const torrentListItem: TorrentType = { url, name, size, time, tagArray }

    torrentList.value.push(torrentListItem)

    if (name.includes('-c') || name.includes('-C')) {
      isVideoHaveChineseTorrent.value = true
    }
  })

  const movie = document.querySelector('.container #magneturlpost')

  if (movie) {
    movie.insertAdjacentHTML('afterend', '<div id="TorrentList"></div>')

    isShowTorrentList.value = true
  }
}

function main() {
  const videoFileArray = videoManager.get()

  if (!videoFileArray)
    return

  // 获取视频名称 (小写，去除空格)
  pageVideoName.value = getPageVideoName()

  if (!pageVideoName.value)
    return

  // 当前视频名称已入库的视频列表
  const matchedVideoList = videoFileArray.filter(item =>
    item.processedName.includes(pageVideoName.value),
  )

  /**
   *  emby中是否有中文磁链
   */
  const isEmbyHaveChineseTorrent = matchedVideoList.some(item => item.isChinese)

  const videoMetaPanel = document.querySelector('.movie')

  if (matchedVideoList.length) {
    highlightElement(videoMetaPanel)

    addedToEmbyList.value.push(...matchedVideoList)

    isShowEmbyButton.value = true
  }

  // 如果当前视频有中文磁链可用并且 Emby 中已经存在的视频没有中文磁链，则添加提示更新中文磁链按钮
  if (isVideoHaveChineseTorrent.value && !isEmbyHaveChineseTorrent && matchedVideoList.length) {
    isShowUpdateChineseButton.value = true
  }
}

/**
 * Javbus 详情页 元素修改
 */
function javbusDetailElementsModifier() {
  // 调整 预览图的顺序

  const sampleWaterfall = document.querySelector('#sample-waterfall') as HTMLElement

  const torrentList = document.querySelector('#TorrentList')

  // 将 sampleWaterfall 元素剪切并插入到 TorrentList 之前
  if (sampleWaterfall && torrentList) {
    sampleWaterfall.style.margin = '24px auto'

    torrentList.parentNode?.insertBefore(sampleWaterfall, torrentList)
  }

  // 移除  磁力連結投稿
  document.querySelector('#mag-submit-show')?.remove()
}

onMounted(() => {
  getTorrentList()

  main()

  javbusDetailElementsModifier()
})
</script>

<template>
  <Teleport
    to=".info"
  >
    <div
      class="flex items-center gap-2 p-3"
    >
      <BtsowButton
        :video-name="pageVideoName"
        :width="100"
        :height="40"
      />

      <EmbyButton
        v-if="isShowEmbyButton"
        :video-name="pageVideoName"
        :width="100"
        :height="40"
        is-show-video-name
      />
    </div>
  </Teleport>

  <div
    class="fixed left-2 top-60 w-100"
  >
    <UpdateChineseButton
      v-if="isShowUpdateChineseButton"
      class="w-full"
    />

    <div
      v-if="addedToEmbyList.length"
      class="w-full rounded-2 bg-#FF8400 p-2"
    >
      <AddedToEmbyButton
        v-for="(item, index) in addedToEmbyList"
        :key="index"
        :video="item"
      />
    </div>
  </div>

  <!-- 磁链列表 -->
  <TorrentList
    v-if="isShowTorrentList"
    to="#TorrentList"
    scroll-target="#sample-waterfall"
    :torrent-list="torrentList"
  />
</template>

<style lang="less" scoped>
/* 样式根据需要在此处编写 */
</style>
