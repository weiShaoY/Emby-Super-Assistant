<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

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
  const url = window.location.href

  return url.substring(url.lastIndexOf('/') + 1)
    .trim()
    .toLowerCase()
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
    if (item.processedName.includes(videoName.value)) {
      document.querySelector('.movie')?.classList.add('is-highlight')

      addedToEmbyList.value.push(item)

      isShowEmbyButton.value = true

      count.value++

      // 当前项为中文字幕
      if (item.isChinese) {
        isEmbyHaveChineseTorrent.value = true
      }
    }
  })

  /**
   *  页面列表当前视频是否含中文磁链
   */
  const isVideoHaveChineseTorrent = !!document.querySelector('.btn-warning')

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
  const tableContent = document.getElementById('magnet-table')

  if (!tableContent) {
    return
  }

  /**
   *  磁链列表
   */
  const items = Array.from(tableContent.querySelectorAll('tr'))

  items.forEach((item: any, index: number) => {
    if (index === 0) {
      return
    }

    const tdList = item.children

    const url = tdList[0].children[0].href

    const name = tdList[0].children[0]?.textContent?.trim() as string

    const size = Number.parseFloat(tdList[1].children[0]?.textContent?.trim().match(/(\d+(\.\d+)?)GB/)?.[1] || '0')

    const time = tdList[2].children[0]?.textContent?.trim()

    if (!name || !url || !size || !time) {
      return
    }

    const isHD = item.querySelector('.btn-primary') !== null

    const isChinese = item.querySelector('.btn-warning') !== null

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

  // 样品图像后面插入
  const sampleWaterfall = document.querySelector('#sample-waterfall')

  if (!sampleWaterfall) {
    return
  }

  sampleWaterfall.insertAdjacentHTML('afterend', '<div id="TorrentList"></div>')

  // 删除页面上的第二个类名为 movie 的元素
  const movie = document.querySelectorAll('.movie ')

  // 清空movie[2]
  if (movie[2]) {
    movie[2].remove()
  }

  isShowTorrentList.value = true
})
</script>

<template>
  <Teleport
    to=".info"
  >
    <div
      class="flex items-center gap-2 p-y-3"
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
