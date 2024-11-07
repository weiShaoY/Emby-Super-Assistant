<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import useFolderStore from '@/store/modules/folder'

import { getTagArray } from '@/utils'

const folderStore = useFolderStore()

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
  const strongElements = document.querySelectorAll('.video-detail strong')

  if (strongElements.length > 0) {
    const titleText = strongElements[0].textContent
      ?.trim()
      .toLowerCase()
      .replace(/\s+/g, '')

    return titleText || ''
  }

  return ''
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

    const url = item.querySelector('.copy-to-clipboard').dataset.clipboardText || ''

    const size = Number.parseFloat(
      item
        .querySelector('.meta')
        ?.textContent?.trim()
        .match(/(\d+(\.\d+)?)GB/)?.[1] || '0',
    )

    const time = item.querySelector('.time')?.textContent?.trim() || ''

    const tagArray = getTagArray(name)

    const torrentListItem: TorrentType = { url, name, size, time, tagArray }

    torrentList.value.push(torrentListItem)

    if (name.includes('-c') || name.includes('-C')) {
      isVideoHaveChineseTorrent.value = true
    }
  })
  console.log('%c Line:107 🍅 torrentList.value', 'color:#3f7cff', torrentList.value)
  const noBottom = document.querySelector('.no-bottom')

  if (noBottom) {
    noBottom.insertAdjacentHTML('afterend', '<div id="TorrentList"></div>')

    isShowTorrentList.value = true
  }
}

function main() {
  if (!folderStore.folderFileList.length) {
    return
  }

  // 获取视频名称 (小写，去除空格)
  pageVideoName.value = getPageVideoName()

  if (!pageVideoName.value)
    return

  // 当前视频名称已入库的视频列表
  const matchedVideoList = folderStore.folderFileList.filter(item =>
    item.processedName.includes(pageVideoName.value),
  )

  const isEmbyHaveChineseTorrent = matchedVideoList.some(
    item => item.isChinese,
  )

  const videoMetaPanel = document.querySelector('.video-meta-panel')

  // const isVideoHaveChineseTorrent = !!document.querySelector('.is-warning')

  if (matchedVideoList.length) {
    highlightElement(videoMetaPanel)

    addedToEmbyList.value.push(...matchedVideoList)

    isShowEmbyButton.value = true
  }

  // 如果当前视频有中文磁链可用并且 Emby 中已经存在的视频没有中文磁链，则添加提示更新中文磁链按钮
  if (
    isVideoHaveChineseTorrent.value
    && !isEmbyHaveChineseTorrent
    && matchedVideoList.length
  ) {
    isShowUpdateChineseButton.value = true
  }
}

onMounted(() => {
  getTorrentList()

  main()
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
        :video-name="pageVideoName"
        :width="100"
        :height="40"
      />

      <EmbyButton
        v-if="isShowEmbyButton"
        :video-name="pageVideoName"
        :width="100"
        :height="40"
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

  <!-- 在线观看 -->
  <OnlinePlay
    v-if="pageVideoName"
    to=".column-video-cover"
    :video-name="pageVideoName"
  />

  <!-- 磁链列表 -->
  <TorrentList
    v-if="isShowTorrentList"
    to="#TorrentList"
    scroll-target=".video-panel"
    :torrent-list="torrentList"
  />
</template>

<style lang="less" scoped>
/* 样式根据需要在此处编写 */
</style>
