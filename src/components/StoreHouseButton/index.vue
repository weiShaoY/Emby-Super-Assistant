<script lang="ts" setup>
import { Notification } from '@arco-design/web-vue'

import DuplicatesModel from './components/duplicatesModel.vue'

import { videoManager } from '@/utils'

import { videoConfig } from '@/config'

import storeHouseSvg from '@/assets/svg/storeHouse.svg'

/**
 *  全局的加载状态
 */
const isLoading = ref(false)

/**
 * 视频文件集
 */
const videoFileSet: Set<VideoType.Video> = new Set([])

type FileData = {
  fileHandle: FileSystemFileHandle
  folderNames: string[]
  parentDirectoryHandle: FileSystemDirectoryHandle
}

/**
 * 递归获取目录下的所有文件
 * @param {FileSystemDirectoryHandle} directoryHandle - 当前目录句柄
 * @param {string[]} folderNames - 目录名数组
 * @returns {AsyncGenerator<FileData>} 异步生成器，生成每个文件的数据
 */
async function* getFiles(
  directoryHandle: any,
  folderNames: string[] = [],
): AsyncGenerator<FileData> {
  for await (const entry of directoryHandle.entries()) {
    const [name, handle] = entry

    try {
      if (handle.kind === 'file' && name.endsWith('.nfo')) {
        yield {
          fileHandle: handle,
          folderNames: [...folderNames],
          parentDirectoryHandle: directoryHandle,
        }
      }
      else if (handle.kind === 'directory') {
        yield * getFiles(handle, [...folderNames, name])
      }
    }
    catch (e) {
      console.error(e)
    }
  }
}

/**
 * 查找视频文件名
 * @param {FileSystemDirectoryHandle} directoryHandle - 当前目录句柄
 * @returns {Promise<string>} 找到的视频文件名或空字符串
 */
async function findVideoFileName(
  directoryHandle: FileSystemDirectoryHandle,
): Promise<string> {
  for await (const [name, handle] of (directoryHandle as any).entries()) {
    if (handle.kind === 'file') {
      const extension = videoConfig.extensionArray.find(ext =>
        name.endsWith(`.${ext}`),
      )

      if (extension) {
        return name
      }
    }
  }

  return ''
}

/**
 * 处理文件名
 * 去掉 '.nfo'、'-c'、'-C' 和 '-破解' 后缀，并转换为小写
 * @param {string} fileName - 原始文件名
 * @returns {string} 处理后的文件名
 */
function processFileName(fileName: string): string {
  return fileName
    .substring(0, fileName.length - '.nfo'.length)
    .toLowerCase()
    .replace(videoConfig.tagRegex, '')
}

/**
 * 获取视频标签名
 * @param videoFullName 视频完整名称 (包含扩展名)
 */
function getVideoTagName(videoFullName: string): string[] {
  const foundTags = [...videoFullName.matchAll(videoConfig.tagRegex)]

  if (foundTags.length > 0) {
    return foundTags.map(match => match[0])
  }
  else {
    return ['无']
  }
}

// 主按钮处理函数
async function mainBtnHandler() {
  videoFileSet.clear()

  try {
    const directoryHandle: FileSystemDirectoryHandle = await (
      window as any
    ).showDirectoryPicker()

    if (!directoryHandle) {
      Notification.error({
        title: `获取本地信息失败`,
        content: '请重新尝试',
        duration: 300000,
        closable: true,
      })

      return
    }

    const startTime = Date.now()

    isLoading.value = true

    for await (const fileData of getFiles(directoryHandle, [
      directoryHandle.name,
    ])) {
      const file = await fileData.fileHandle.getFile()

      const videoFullName = await findVideoFileName(
        fileData.parentDirectoryHandle,
      )

      const item: VideoType.Video = {
        videoName: file.name.substring(0, file.name.length - '.nfo'.length),
        videoFullName,
        videoProcessedName: processFileName(file.name),
        videoTagName: getVideoTagName(videoFullName),
        videoExtensionName: videoFullName.replace(/^.*\./, ''),
        directoryStructure: [...fileData.folderNames, videoFullName],
        isChineseSubtitle:
          videoFullName.includes('-c') || videoFullName.includes('-C'),
      }

      videoFileSet.add(item)
    }

    videoManager.set(videoFileSet)

    const endTime = Date.now()

    const time = ((endTime - startTime) / 1000).toFixed(2)

    isLoading.value = false

    Notification.success({
      title: `读取文件夹: \u00A0\u00A0\u00A0${directoryHandle.name}\u00A0\u00A0\u00A0成功`,
      content: `耗时\u00A0 ${time}\u00A0 秒 \u00A0 \u00A0共读取\u00A0 ${videoFileSet.size}\u00A0 个视频`,
      duration: 300000,
      closable: true,
    })
  }
  catch (error) {
    console.error('Error picking directory:', error)
  }
  finally {
    isLoading.value = false
  }
}

/**
 *  是否显示查重弹窗
 */
const isShowDuplicatesModel = ref(false)

const duplicatesVideoList = ref<VideoType.Video[]>([])

const duplicatesVideoNameList = ref<string[]>([])

function videoDuplicate(event: any) {
  event.stopPropagation()
  isShowDuplicatesModel.value = true
  const duplicate = videoManager.duplicate()

  duplicatesVideoList.value = duplicate.duplicatesVideoList
  console.log('%c Line:195 🥑 duplicatesVideoList.value', 'color:#fca650', duplicatesVideoList.value)

  duplicatesVideoNameList.value = duplicate.duplicatesVideoNameList
}
</script>

<template>
  <!-- 查重弹窗 -->
  <DuplicatesModel
    v-if="isShowDuplicatesModel"
    v-model="isShowDuplicatesModel"
    :duplicates-video-list="duplicatesVideoList"
    :duplicates-video-name-list="duplicatesVideoNameList"
  />

  <div
    class="group fixed bottom-2 left-2 z-1000 flex items-center justify-center border border-2 border-white/80 rounded-full rounded-lg p-1 shadow-2xl"
    @click="mainBtnHandler"
  >
    <button
      class="group relative h-20 w-20 inline-flex overflow-visible rounded-full bg-[linear-gradient(#e7e9e9,#e9e9e9_50%,#fff)] p-1 transition-all duration-300"
    >
      <div
        class="h-full w-full overflow-hidden rounded-full bg-[linear-gradient(to_top,#ececec,#fff)] p-1 shadow-[0_0_1px_rgba(0,0,0,0.07),0_0_1px_rgba(0,0,0,0.05),0_3px_3px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.12)] duration-300 hover:shadow-none"
      >
        <div
          class="h-full w-full inline-flex items-center justify-center gap-4 gap-x-0.5 gap-y-0.5 overflow-hidden rounded-full bg-[linear-gradient(#f4f4f4,#fefefe)] px-4 py-2 text-[18px] text-xl text-[#101010] text-#52B54B font-medium duration-200 group-hover:bg-[linear-gradient(#e2e2e2,#fefefe)] group-hover:text-#EA1179"
        >
          <img
            v-if="!isLoading"
            :src="storeHouseSvg"
            alt="仓库"
          >

          <!-- <a-spin
            v-else
          >
            <template
              #icon
            >
              <icon-sync />
            </template>
          </a-spin> -->

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
      </div>

    </button>

    <div
      class="absolute left-[50%] z-800 w-22 origin-left scale-0 cursor-pointer border border-gray-300 rounded-lg bg-white px-3 py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out -top-11 -translate-x-[50%] group-hover:scale-100"
      @click="videoDuplicate"
    >
      视频查重
    </div>

  </div>
</template>

<style lang="less" scoped>
</style>
