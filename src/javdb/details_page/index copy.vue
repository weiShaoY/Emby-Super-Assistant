<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { sortBtList } from './detailsPageSortBtList'

import { videoManager } from '@/utils'

const addedToEmbyList = ref<VideoType.Video[]>([])

/**
 *  是否显示提示更新中文磁链按钮
 */
const isShowUpdateChineseButton = ref(false)

/**
 *  是否显示跳转到Emby按钮
 */
const isShowEmbyButton = ref(false)

/**
 *  详情页视频名称
 */
const videoName = ref<string >('')

/**
 * 获取详情页视频名称
 * @returns 视频标题文本
 */
function getVideoName() {
  // 获取页面上所有的 strong 元素，这些元素必须是 video-detail 类的子元素
  const strongElements = document.querySelectorAll('.video-detail strong')

  // 检查是否找到了至少一个元素
  if (strongElements.length > 0) {
    // 获取第一个 strong 元素的文本内容
    const titleText
          = strongElements[0].textContent

    // 去除文本两端的空白字符，并转换为小写
    return titleText?.trim().toLowerCase()
      .replace(/\s+/g, '') as string
  }

  // 如果没有找到元素，返回空字符串
  return ''
}

function main() {
  const videoFileArray = videoManager.get()

  if (!videoFileArray) {
    return
  }

  videoName.value = getVideoName()

  if (!videoName.value)
    return

  const count = ref (0)

  /**
   *  Emby中已经存在的视频是否含中文磁链
   */
  const isEmbyHaveChineseTorrent = ref(false)

  videoFileArray.forEach((item: VideoType.Video) => {
    //  当前项的videoName 是否包含在nfo文件中
    if (item.videoProcessedName.includes(videoName.value)) {
      document.querySelector('.video-meta-panel')?.classList.add('is-highlight')

      addedToEmbyList.value.push(item)

      isShowEmbyButton.value = true

      count.value++

      // 当前项为中文字幕
      if (item.isChineseSubtitle) {
        isEmbyHaveChineseTorrent.value = true
      }
    }
  })

  /**
   *  页面列表当前视频是否含中文磁链
   */
  const isVideoHaveChineseTorrent = !!document.querySelector('.is-warning')

  //  如果当前视频有中文磁链可用并且和 Emby中已经存在的视频没有中文磁链 则 添加提示更新中文磁链按钮
  if (isVideoHaveChineseTorrent && !isEmbyHaveChineseTorrent.value && count.value) {
    isShowUpdateChineseButton.value = true
  }
}

const torrentList = ref<TorrentType[]>([])

const isShowTorrentList = ref(false)

function getTorrentList() {
  /**
   *  列表容器
   */
  const magnetsContent = document.getElementById('magnets-content')

  if (!magnetsContent || !magnetsContent.children.length) {
    return
  }

  /**
   *  磁链列表
   */
  const items = Array.from(magnetsContent.querySelectorAll('.columns'))

  items.forEach((item: any) => {
    const name = item.querySelector('.name')?.textContent?.trim() as string

    const url = item.children[2].children[0].dataset.clipboardText.split('&')[0] as string

    const size = Number.parseFloat((item.querySelector('.meta') as HTMLElement | null)?.textContent?.trim().match(/(\d+(\.\d+)?)GB/)?.[1] || '0')

    const time = item.querySelector('.time')?.textContent?.trim()

    if (!name || !url || !time) {
      return
    }

    const isHD = item.querySelector('.is-primary') !== null

    const isChinese = item.querySelector('.is-warning') !== null

    const torrentListItem: TorrentType = {
      url,
      name,
      size,
      time,
      isHD,
      isChinese,
    }

    torrentList.value.push(torrentListItem)
  })
}

onMounted(() => {
  main()

  getTorrentList()

  const columns = document.querySelectorAll('.columns')

  if (columns.length < 4) {
    return
  }

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
    <!-- 可更新中文磁链按钮 -->
    <UpdateChineseButton
      v-if="isShowUpdateChineseButton"
      class="tag m-b-15"
      :height="40"
      width="100%"
    />

    <!-- Emby中已经存在的视频 -->
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

</style>
