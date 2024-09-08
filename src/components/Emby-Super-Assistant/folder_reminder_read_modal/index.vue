<!------------------------------------  文件夹提醒读取弹窗  ------------------------------------------------->
<script lang="ts" setup>
import useFolderStore from '@/store/modules/folder'

import { getFormattedDateFromTimestamp } from '@/utils'

const folderStore = useFolderStore()

const visible = ref(false)

function openFolder() {
  folderStore.openFolder(folderStore.folderName)
}

/**
 *   小时
 */
const hoursElapsed = ref(0)

/**
 *   分钟
 */
const minutesElapsed = ref(0)

/**
 *   定时提示读取文件夹
 */
function folderReadReminderScheduler() {
  /**
   * 1 小时的毫秒数
   */
  const millisecondsInHour = 3600000 // 1 小时 = 3,600,000 毫秒

  /**
   *  超时时间阀值，单位为毫秒
   */
  const timeThreshold = millisecondsInHour * folderStore.folder.reminderInterval

  /**
   * 定时检查间隔，单位为毫秒
   */
  const checkInterval = folderStore.folder.checkInterval * millisecondsInHour

  /**
   * 上次读取文件夹的时间戳
   */
  const lastReadTime = folderStore.folderReadTime

  /**
   * 检查是否超时并发送提醒的函数
   */
  function checkFolderReadStatus() {
    /**
     * 当前时间戳
     */
    const currentTimestamp = Date.now()

    if (lastReadTime) {
      /**
       * 当前时间戳 - 上次读取文件夹的时间戳 = 当前时间间隔
       */
      const timeDifference = currentTimestamp - lastReadTime

      if (timeDifference >= timeThreshold) {
        /**
         * 小时
         */
        hoursElapsed.value = Math.floor(timeDifference / millisecondsInHour)

        /**
         * 分钟
         */
        minutesElapsed.value = Math.floor(
          (timeDifference % millisecondsInHour) / 60000,
        )

        visible.value = true
      }
    }
    else {
      console.warn('未找到上次读取时间戳')
    }
  }

  // 立即执行一次检查
  checkFolderReadStatus()

  // 定时执行检查
  setInterval(checkFolderReadStatus, checkInterval)
}

folderReadReminderScheduler()
</script>

<template>
  <a-modal
    v-model:visible="visible"
    width="auto"
    simple
    :footer="false"
  >
    <template
      #title
    >
      <div
        class="w-full flex items-center justify-center font-700"
      >
        <span
          class="m-r-2 text-5 color-primary"
        >
          {{ hoursElapsed }}
        </span>

        <span>
          小时
        </span>

        <span
          class="m-x-3 text-5 color-primary"
        >
          {{ minutesElapsed }}
        </span>

        <span>
          分钟未读取文件夹！
        </span>

      </div>
    </template>

    <div
      class="w-auto font-600"
    >
      <div
        class="flex items-center"
      >
        <div
          class="w-70"
        >
          上次读取时间 :
        </div>

        <div>
          {{ getFormattedDateFromTimestamp(folderStore.folderReadTime) }}
        </div>
      </div>

      <div
        class="flex items-center"
      >
        <div
          class="w-70"
        >
          上次读取文件夹:
        </div>

        <a-tooltip
          :content="folderStore.folderName"
          background-color="#52B44B"
        >
          <a-link
            class="w-50 truncate text-center font-700 !block !p-2"
            status="success"
            @click="openFolder"
          >
            {{ folderStore.folderName }}
          </a-link>
        </a-tooltip>
      </div>

      <div
        class="flex items-center"
      >
        <div
          class="w-70"
        >
          提示读取文件夹的时间间隔（小时）:
        </div>

        <div
          class="flex items-center"
        >
          <span
            class="m-r-2 min-w-15 text-5 color-primary"
          >
            {{ folderStore.folder.reminderInterval }}
          </span>

          <span>
            小时
          </span>
        </div>
      </div>

      <div
        class="flex items-center"
      >
        <div
          class="w-70"
        >
          定时器检查读取提示的时间间隔（小时）:
        </div>

        <div
          class="flex items-center"
        >
          <span
            class="m-r-2 min-w-15 text-5 color-primary"
          >
            {{ folderStore.folder.checkInterval }}
          </span>

          <span>
            小时
          </span>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<style lang="less" scoped></style>
