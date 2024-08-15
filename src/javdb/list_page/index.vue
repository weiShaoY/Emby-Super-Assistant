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

  const elementList = document.querySelectorAll('.movie-list .item')

  elementList.forEach((ele) => {
    /**
     *  获取视频名称 (小写，去除空格)
     */
    const videoName = ele
      .querySelector('strong')
      ?.textContent?.toLowerCase().replace(/\s+/g, '') as string

    if (!videoName) {
      return
    }

    const boxElement = ele.querySelector('.box')

    const tagsElement = ele.querySelector('.tags')

    tagsElement?.classList.add(`btsow_btn_${videoName}`)

    btsowBtnList.value.push(videoName)

    const count = ref (0)

    /**
     *  Emby中已经存在的视频是否含中文磁链
     */
    const isEmbyHaveChineseTorrent = ref(false)

    videoFileArray.forEach((item: VideoType.Video) => {
      //  当前项的videoName 是否包含在nfo文件中
      if (item.videoProcessedName.includes(videoName)) {
        boxElement?.classList.add('is-highlight')

        if (!embyBtnList.value.length) {
          tagsElement?.classList.add(`emby_btn_${videoName}`)

          embyBtnList.value.push(`${videoName}`)
        }

        boxElement?.classList.add(`added_to_emby_btn_${item.videoName}`)

        addedToInventoryBtnList.value.push(item)

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
    const isVideoHaveChineseTorrent = !!ele.querySelector('.is-warning')

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
        class="tag"
        :radius="0"
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
        :width="50"
        :height="24"
        :radius="0"
        class="tag"
      />
    </Teleport>
  </template>

  <!-- 已入库的视频 -->
  <template
    v-for="item in addedToInventoryBtnList"
    :key="item.videoName"
  >
    <Teleport
      :to="`.added_to_emby_btn_${item.videoName}`"
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
        :width="50"
        :height="24"
        :radius="0"
        class="tag"
      />
    </Teleport>
  </template>
</template>

<style lang="less" scoped></style>
