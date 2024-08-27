<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { addClassAndUpdateList, addClassIfNotExists, videoManager } from '@/utils'

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

  const itemList = document.querySelectorAll('.movie-list .item')

  itemList.forEach((item) => {
    /**
     *  获取视频名称 (小写，去除空格)
     */
    const itemVideoName = item
      .querySelector('strong')
      ?.textContent?.toLowerCase().replace(/\s+/g, '') as string

    if (!itemVideoName) {
      return
    }

    const boxElement = item.querySelector('.box')

    const tagsElement = item.querySelector('.tags')

    // 添加 Btsow 按钮的类名并更新列表
    addClassAndUpdateList(tagsElement, `btsow_btn_${itemVideoName}`, btsowBtnList, itemVideoName)

    /**
     * 当前视频名称已入库的视频列表
     */
    const matchedVideoList = videoFileArray.filter(sub => sub.processedName.includes(itemVideoName))

    if (matchedVideoList.length) {
      //  添加高亮
      boxElement?.classList.add('is-highlight')

      // 添加 Emby 按钮的类名并更新列表
      addClassIfNotExists(tagsElement, `emby_btn_${itemVideoName}`, embyBtnList, itemVideoName)

      /**
       *  页面列表当前视频是否含中文磁链
       */
      const isItemHaveChineseTorrent = !!item.querySelector('.is-warning')

      matchedVideoList.forEach((video: VideoType.Video) => {
        // 添加已入库视频按钮的类名并更新列表
        addClassAndUpdateList(boxElement, `added_to_emby_btn_${video.baseName}`, addedToInventoryBtnList, video)

        if (!video.isChinese && isItemHaveChineseTorrent) {
          // 添加更新中文磁链按钮的类名并更新列表
          addClassIfNotExists(boxElement, `update_chinese_btn_${itemVideoName}`, updateChineseBtnList, itemVideoName)
        }
      })
    }
  })
}

onMounted(() => {
  main()
})
</script>

<template>
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
        is-show-video-name
        class="tag"
      />
    </Teleport>
  </template>

  <!-- 可更新中文磁链按钮 -->
  <template
    v-for="videoName in updateChineseBtnList"
    :key="videoName"
  >
    <Teleport
      :to="`.update_chinese_btn_${videoName}`"
    >
      <UpdateChineseButton
        :radius="0"
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
</template>

<style lang="less" scoped></style>
