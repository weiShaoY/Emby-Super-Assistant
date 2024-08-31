<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { debug } from 'node:console'

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

  console.log('%c Line:27 🍒 videoFileArray', 'color:#ffdd4d', videoFileArray)

  if (!videoFileArray) {
    return
  }

  const itemList = document.querySelectorAll('#waterfall .movie-box')

  console.log('%c Line:33 🍯 itemList', 'color:#2eafb0', itemList)

  itemList.forEach((item: any) => {
    console.log('%c Line:37 🍌 item', 'color:#42b983', item)

    /**
     *  获取视频名称 (小写，去除空格)
     */
    const itemVideoName = item
      .getAttribute('href')?.substring(item.getAttribute('href').lastIndexOf('/') + 1)
      .trim()
      .toLowerCase()

    if (!itemVideoName) {
      return
    }

    // 添加 Btsow 按钮的类名并更新列表
    addClassAndUpdateList(item, `btsow_btn_${itemVideoName}`, btsowBtnList, itemVideoName)

    /**
     * 当前视频名称已入库的视频列表
     */

    const matchedVideoList = videoFileArray.filter(sub => sub.processedName.includes(itemVideoName))

    // 创建一个空数组来存放匹配的视频文件

    console.log('%c Line:63 🍿 matchedVideoList', 'color:#fca650', matchedVideoList)

    if (matchedVideoList.length) {
      // 添加高亮
      item?.classList.add('is-highlight')

      // 添加 Emby 按钮的类名并更新列表
      addClassIfNotExists(item, `emby_btn_${itemVideoName}`, embyBtnList, itemVideoName)

      /**
       *  页面列表当前视频是否含中文磁链
       */
      const isItemHaveChineseTorrent = !!item.querySelector('.btn-warning')

      matchedVideoList.forEach((video: VideoType.Video) => {
        // 添加已入库视频按钮的类名并更新列表
        addClassAndUpdateList(item, `added_to_emby_btn_${video.baseName}`, addedToInventoryBtnList, video)

        if (!video.isChinese && isItemHaveChineseTorrent) {
          // 添加更新中文磁链按钮的类名并更新列表
          addClassIfNotExists(item, `update_chinese_btn_${itemVideoName}`, updateChineseBtnList, itemVideoName)
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
        class="m-x-auto m-t-2 !w-90%"
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
        class="m-x-auto m-t-2 !w-90%"
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
        class="m-x-auto m-t-2 !w-90%"
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
        :is-wrap="true"
        class="m-x-auto !w-90% !color-#fff"
      />
    </Teleport>
  </template>
</template>

<style lang="less" scoped></style>
