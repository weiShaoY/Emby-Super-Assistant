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
 *  是否显示查重弹窗
 */
const isShowDuplicatesModel = ref(false)

/**
 *  查重按钮点击事件
 */
function videoDuplicateHandle(event: any) {
  event.stopPropagation()

  isShowDuplicatesModel.value = true
}

// # ////////////////////////////////////////////////////////////////////////////////////////////

type FileData = {
  fileHandle: FileSystemFileHandle
  folderNames: string[]
  parentDirectoryHandle: FileSystemDirectoryHandle
}

/**
 * 视频文件集
 */
const videoFileSet: Set<VideoType.Video> = new Set([])

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
    console.log('%c Line:90 🥓 entry', 'color:#465975', entry)
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
      console.log('%c Line:150 🍷 fileData', 'color:#e41a6a', fileData)

      /**
       *  通过句柄获取文件的 File 对象
       */
      const file = await fileData.fileHandle.getFile()

      // const fileContent = await file.text()

      // ///////////////////////////
      /**
       *   根据文件的父目录获取视频文件的完整名称
       */
      const videoFullName = await findVideoFileName(
        fileData.parentDirectoryHandle,
      )

      // 创建一个包含视频信息的对象
      const item: VideoType.Video = {
        baseName: file.name.substring(0, file.name.length - '.nfo'.length),
        fullName: videoFullName,
        processedName: processFileName(file.name),
        tagArray: getVideoTagName(videoFullName),
        extensionName: videoFullName.replace(/^.*\./, ''),
        directoryPath: [...fileData.folderNames, videoFullName],
        isChinese:
          videoFullName.includes('-c') || videoFullName.includes('-C'),
      }

      // 将该视频信息对象添加到 Set 中
      videoFileSet.add(item)
    }

    // 将收集到的所有视频信息存储到 videoManager 中
    videoManager.set(videoFileSet)

    /**
     *  结束时间
     */
    const endTime = Date.now()

    /**
     *   耗时
     */
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
    console.error('错误:', error)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <!-- 查重弹窗 -->
  <DuplicatesModel
    v-if="isShowDuplicatesModel"
    v-model="isShowDuplicatesModel"
  />

  <div
    class="group fixed bottom-2 left-2 z-1000 flex items-center justify-center border border-2 border-white/80 rounded-full rounded-lg p-1 shadow-2xl"
    @click="mainBtnHandler"
  >
    <button
      class="group relative h-20 w-20 inline-flex cursor-pointer overflow-visible rounded-full bg-[linear-gradient(#e7e9e9,#e9e9e9_50%,#fff)] p-1 transition-all duration-300"
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
      @click="videoDuplicateHandle"
    >
      视频查重
    </div>

  </div>
</template>

<style lang="less" scoped>
</style>
