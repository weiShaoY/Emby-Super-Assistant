<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { videoManager } from '@/utils'

/**
 *  在Btsow搜索按钮
 */
const btsowBtnList = ref<string[]>([])

/**
 *  已入库的视频
 */
const addedToInventoryBtnList = ref<VideoType.Video[]>([])

/**
 *  在Emby打开按钮
 */
const embyBtnList = ref<string[]>([])

/**
 *  更新中文磁链按钮
 */
const updateChineseBtnList = ref<string[]>([])

function main() {
  const videoFileArray = videoManager.get()

  if (!videoFileArray) {
    return
  }

  const elementList = document.querySelectorAll('#waterfall .movie-box')

  elementList.forEach((ele: any) => {
    const videoName = ele.getAttribute('href')?.substring(ele.getAttribute('href').lastIndexOf('/') + 1)
      .trim()
      .toLowerCase()

    console.log('%c Line:47 🍅 videoName', 'color:#ea7e5c', videoName)
    if (!videoName) {
      return
    }

    const tagsElement = ele.querySelector('.item-tag')

    tagsElement?.classList.add(`btsow_btn_${videoName}`, 'flex', 'gap-2', 'flex-wrap', 'h-auto')

    btsowBtnList.value.push(videoName)

    const count = ref (0)

    /**
     *  Emby中已经存在的视频是否含中文磁链
     */
    const isEmbyHaveChineseTorrent = ref(false)

    videoFileArray.forEach((item: VideoType.Video) => {
      //  当前项的videoName 是否包含在nfo文件中
      if (item.processedName.includes(videoName)) {
        ele?.classList.add('is-highlight')

        if (!embyBtnList.value.length) {
          tagsElement?.classList.add(`emby_btn_${videoName}`)

          embyBtnList.value.push(`${videoName}`)
        }

        ele?.classList.add(`added_to_emby_btn_${item.baseName}`)

        addedToInventoryBtnList.value.push(item)

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
    const isVideoHaveChineseTorrent = !!ele.querySelector('.btn-warning')

    //  如果当前视频有中文磁链可用并且和 Emby中已经存在的视频没有中文磁链 则 添加提示更新中文磁链按钮
    if (isVideoHaveChineseTorrent && !isEmbyHaveChineseTorrent.value && count.value) {
      tagsElement?.classList.add(`update_chinese_btn_${videoName}`)

      updateChineseBtnList.value.push(videoName)
    }
  })
}

onMounted(() => {
  main()
})
</script>

<template>
  <!-- 可更新中文磁链按钮 -->
  <template
    v-for="videoName in updateChineseBtnList"
    :key="videoName"
  >
    <Teleport
      :to="`.update_chinese_btn_${videoName}`"
    >
      <UpdateChineseButton
        :height="24"
        :radius="0"
        class="!flex-center"
      />
    </Teleport>
  </template>

  <!-- Btsow搜索按钮 -->
  <template
    v-for="videoName in btsowBtnList"
    :key="videoName"
  >
    <Teleport
      :to="`.btsow_btn_${videoName}`"
    >
      <BtsowButton
        :video-name="videoName"
        :radius="0"
        :width="50"
        :height="24"
        class="!text-3"
      />
    </Teleport>
  </template>

  <!-- 已入库的视频 -->
  <template
    v-for="item in addedToInventoryBtnList"
    :key="item.videoName"
  >
    <Teleport
      :to="`.added_to_emby_btn_${item.baseName}`"
    >
      <AddedToEmbyButton
        :video="item"
      />
    </Teleport>
  </template>

  <!-- 在Emby打开按钮 -->
  <template
    v-for="videoName in embyBtnList"
    :key="videoName"
  >

    <Teleport
      :to="`.emby_btn_${videoName}`"
    >
      <EmbyButton
        :video-name="videoName"
        :radius="0"
        :width="50"
        :height="24"
        class="!text-3"
      />
    </Teleport>
  </template>
</template>

<style lang="less" scoped></style>
