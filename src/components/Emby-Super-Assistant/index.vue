<!------------------------------------  设置按钮  ------------------------------------------------->
<script lang="ts" setup>
import { Notification } from '@arco-design/web-vue'

import SettingModal from './setting_modal/index.vue'

import FolderQueryDuplicateModal from './folder_query_duplicate_modal/index.vue'

import FolderReminderReadModal from './folder_reminder_read_modal/index.vue'

import FolderReadSuccessModal from './folder_read_success_modal/index.vue'

import LogoSvg from '@/assets/logo.svg'

import SettingSvg from '@/assets/svg/setting.svg'

import QueryDuplicateSvg from '@/assets/svg/queryDuplicate.svg'

import useFolderStore from '@/store/modules/folder'

import { config } from '@/config'

import { getTagArray, parseNfoContent } from '@/utils'

import useSiteStore from '@/store/modules/site'

const siteStore = useSiteStore()

const folderStore = useFolderStore()

/**
 *  是否显示设置弹窗
 */
const isShowSettingModal = ref(false)

/**
 *  是否显示查重弹窗
 */
const isShowQueryDuplicateModal = ref(false)

/**
 *  是否显示文件夹读取成功弹窗
 */
const isShowFolderReadSuccessModal = ref(false)

/**
 *  读取文件夹耗时
 */
const folderReadTime = ref('')

/**
 *  全局的加载状态
 */
const isLoading = ref(false)

// # ///////////////////////////////////////////////////////////////////////////////////////

/**
 *  表示文件数据的类型
 */
 type FileData = {

   /**
    *  文件的句柄，用于访问文件内容
    */
   fileHandle: FileSystemFileHandle

   /**
    *  文件所在的目录名数组，包含层级关系
    */
   directoryPath: string[]

   /**
    *  父目录的句柄，用于访问父目录的内容
    */
   parentDirectoryHandle: FileSystemDirectoryHandle

   /**
    *  nfo 文件内容
    */
   nfoContent: string

 }

/**
 * 视频文件集
 */
const videoFileSet: Set<VideoType.Video> = new Set([])

/**
 * 递归获取目录下的所有文件
 * @param {FileSystemDirectoryHandle} directoryHandle - 当前目录句柄
 * @param {string[]} directoryPath - 目录名数组
 * @returns {AsyncGenerator<FileData>} 异步生成器，生成每个文件的数据
 */
async function* getFiles(
  directoryHandle: any,
  directoryPath: string[] = [],
): AsyncGenerator<FileData> {
  for await (const entry of directoryHandle.entries()) {
    const [name, handle] = entry

    try {
      //   判断当前条目是否为文件，并且文件扩展名是否在 config.video.extensionArray 中
      if (handle.kind === 'file' && config.video.extensionArray.some(ext => name.endsWith(`.${ext}`))) {
        let nfoContent = ''

        // 尝试查找同级目录下的同名 .nfo 文件
        const baseName = name.substring(0, name.lastIndexOf('.'))

        const nfoHandle = await directoryHandle.getFileHandle(`${baseName}.nfo`, { create: false }).catch(() => null)

        if (nfoHandle) {
          const file = await nfoHandle.getFile()

          nfoContent = await file.text()
        }

        // 生成一个包含文件数据的对象
        yield {
          fileHandle: handle,
          directoryPath: [...directoryPath],
          parentDirectoryHandle: directoryHandle,
          nfoContent,
        }
      }

      // 如果当前条目为目录，递归调用 getFiles 函数获取目录下的所有文件
      else if (handle.kind === 'directory') {
        yield * getFiles(handle, [...directoryPath, name])
      }
    }
    catch (e) {
      console.error(e)
    }
  }
}

/**
 *  主按钮点击事件
 */
async function mainBtnHandler() {
  // 清空存储视频文件信息的 Set
  videoFileSet.clear()

  try {
    // 使用 showDirectoryPicker API 打开目录选择器，让用户选择一个目录
    const directoryHandle: FileSystemDirectoryHandle = await (
      window as any
    ).showDirectoryPicker()

    // 如果用户没有选择目录，显示错误通知并退出函数
    if (!directoryHandle) {
      Notification.error({
        title: `获取本地信息失败`,
        content: '请重新尝试',
        duration: 300000,
        closable: true,
      })

      return
    }

    isLoading.value = true

    /**
     *  开始时间
     */
    const startTime = Date.now()

    // 使用 for-await-of 语法异步遍历用户选择的目录中的所有文件
    for await (const fileData of getFiles(directoryHandle, [
      directoryHandle.name,
    ])) {
      /**
       *  通过句柄获取文件的 File 对象
       */
      const file = await fileData.fileHandle.getFile()

      /**
       *  解析后的Nfo文件内容
       */
      const nfoContent = parseNfoContent(fileData.nfoContent)

      // 创建一个包含视频信息的对象
      const item: VideoType.Video = {

        size: `${(file.size / (1024 ** 3)).toFixed(2)} GB`,

        baseName: file.name.substring(0, file.name.lastIndexOf('.')),

        fullName: file.name,

        processedName:
          file.name.substring(0, file.name.lastIndexOf('.'))
            .toLowerCase()
            .replace(config.video.tagRegex, ''),

        extensionName: file.name.replace(/^.*\./, ''),

        directoryPath: [...fileData.directoryPath, file.name],

        tagArray: getTagArray(file.name.substring(0, file.name.lastIndexOf('.'))),

        resolution: nfoContent.resolution || '',

        isChinese: file.name.includes('-c') || file.name.includes('-C') || file.name.includes('_ch'),
      }

      // 将该视频信息对象添加到 Set 中
      videoFileSet.add(item)
    }

    // 将 Set 中的视频文件信息存储到本地
    folderStore.saveFolderFileList(directoryHandle.name, videoFileSet)

    folderReadTime.value = ((Date.now() - startTime) / 1000).toFixed(2)

    isLoading.value = false

    isShowFolderReadSuccessModal.value = true
  }
  catch (error) {
    console.error('错误:', error)
  }
  finally {
    isLoading.value = false
  }
}

function openEmby(event: MouseEvent) {
  event.stopPropagation()

  siteStore.openEmby()
}
</script>

<template>
  <!-- 文件夹提醒读取弹窗 -->
  <FolderReminderReadModal />

  <!-- 设置弹窗 -->
  <SettingModal
    v-if="isShowSettingModal"
    v-model="isShowSettingModal"
  />

  <!-- 文件夹查询重复弹窗 -->
  <FolderQueryDuplicateModal
    v-if="isShowQueryDuplicateModal"
    v-model="isShowQueryDuplicateModal"
  />

  <!-- 文件夹读取成功弹窗 -->
  <FolderReadSuccessModal
    v-if="isShowFolderReadSuccessModal"
    v-model="isShowFolderReadSuccessModal"
    :folder-read-time="folderReadTime"
  />

  <div
    class="group fixed bottom-5 left-5 h-20 w-20 inline-flex overflow-visible border-2 border-white/90 rounded-full bg-[linear-gradient(#CBCBCB,#e9e9e9_50%,#fff)] p-2 transition-all duration-300 !z-10000"
    @click="mainBtnHandler"
  >
    <!-- 主按钮 -->
    <button
      class="h-full w-full overflow-hidden rounded-full bg-[linear-gradient(to_top,#ececec,#fff)] p-1 shadow-[0_0_1px_rgba(0,0,0,0.07),0_0_1px_rgba(0,0,0,0.05),0_3px_3px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.12)] duration-300 !z-10000 hover:shadow-none"
    >
      <div
        class="black h-full w-full inline-flex items-center justify-center gap-4 gap-x-0.5 gap-y-0.5 overflow-hidden rounded-full bg-[linear-gradient(#f4f4f4,#fefefe)] text-[18px] text-xl text-[#101010] font-medium duration-200 group-hover:bg-[linear-gradient(#e2e2e2,#fefefe)]"
      >
        <img
          v-if="!isLoading"
          class="h-10 w-10 transform transition-transform duration-800 group-hover:rotate-360"
          :src="LogoSvg"
          alt=""
        >

        <div
          v-else
          class="flex flex-row gap-2"
        >
          <div
            style="background-image: conic-gradient(from 0deg, violet, indigo 30%, blue 50%, green 60%, yellow 70%, orange 80%, red 100%);"
            class="bg-radial [animation-delay:.7s] h-14 w-14 animate-spin rounded-full bg-gradient-to-tr"
          />
        </div>
      </div>
    </button>

    <!-- 提示框内容 -->
    <!-- -translate-x-1/2 left-1/2 -->
    <div
      class="invisible absolute top-[-110%] z-50 scale-90 rounded-lg bg-white p-x-4 p-y-4 opacity-0 shadow-xl duration-1000 ease-in-out group-hover:visible group-hover:scale-100 group-hover:opacity-100"
    >
      <!-- 社交图标 -->
      <div
        class="flex gap-3"
      >
        <div
          class="group/a h-12 w-12 flex items-center justify-center rounded-full bg-gray-200 p-3 shadow-lg duration-600 hover:w-30 hover:scale-105 hover:cursor-pointer"
          @click="($event) => {
            $event.stopPropagation()
            isShowSettingModal = true
          }"
        >
          <img
            class="h-full w-full"
            :src="SettingSvg"
            alt=""
          >

          <span
            class="w-0 overflow-hidden whitespace-nowrap color-#4F6171 font-700 duration-600 group-hover/a:w-40"
          >
            设置
          </span>
        </div>

        <div
          class="group/a h-12 w-12 flex items-center justify-center rounded-full bg-gray-200 p-3 shadow-lg duration-600 hover:w-30 hover:scale-105 hover:cursor-pointer"
          @click="($event) => {
            $event.stopPropagation()
            isShowQueryDuplicateModal = true
          }"
        >
          <img
            class="h-full w-full"
            :src="QueryDuplicateSvg"
            alt=""
          >

          <span
            class="w-0 overflow-hidden whitespace-nowrap color-#FF6A07 font-700 duration-600 group-hover/a:w-40"
          >
            查重
          </span>
        </div>

        <div
          class="group/a h-12 w-12 flex items-center justify-center rounded-full bg-gray-200 p-3 shadow-lg duration-600 hover:w-30 hover:scale-105 hover:cursor-pointer"
          @click="openEmby"
        >
          <img
            class="h-full w-full"
            :src="LogoSvg"
            alt=""
          >

          <span
            class="w-0 overflow-hidden whitespace-nowrap color-#52B44B font-700 duration-600 group-hover/a:w-40"
          >
            Emby
          </span>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
