<script lang="ts" setup>
import { Notification } from '@arco-design/web-vue'

import DuplicatesModel from './components/duplicatesModel.vue'

import { getTagArray, parseNfoContent, videoManager } from '@/utils'

import { config } from '@/config'

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

        isChinese: file.name.includes('-c') || file.name.includes('-C'),
      }

      // 将该视频信息对象添加到 Set 中
      videoFileSet.add(item)
    }

    // 将收集到的所有视频信息存储到 videoManager 中
    videoManager.set(videoFileSet)

    /**
     *   耗时
     */
    const time = ((Date.now() - startTime) / 1000).toFixed(2)

    isLoading.value = false

    const duplicate = videoManager.duplicate()

    console.log('%c Line:22 🍊 所有重复的影片列表', 'color:#b03734', duplicate.duplicatesVideoList)

    console.log('%c Line:26 🍕 Emby去重的影片标题列表', 'color:#7f2b82', duplicate.duplicatesVideoNameList)

    Notification.success({
      title: `读取文件夹: \u00A0\u00A0\u00A0${directoryHandle.name}\u00A0\u00A0\u00A0成功`,
      content: `耗时\u00A0 ${time}\u00A0 秒 \u00A0 \u00A0共读取\u00A0 ${videoFileSet.size}\u00A0 个视频 \u00A0 共发现 ${duplicate.duplicatesVideoList.length} 个重复视频 \u00A0 去重后 ${duplicate.duplicatesVideoNameList.length}个`,
      duration: 300000,
      closable: true,
      onClose() {
        // 刷新页面
        window.location.reload()
      },
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
    class="group fixed bottom-2 left-2 flex items-center justify-center border border-2 border-white/80 rounded-full p-1 shadow-2xl"
  >
    <button
      class="group relative z-1000 h-20 w-20 inline-flex cursor-pointer overflow-visible rounded-full bg-[linear-gradient(#e7e9e9,#e9e9e9_50%,#fff)] p-1 transition-all duration-300"
    >
      <div
        class="h-full w-full overflow-hidden rounded-full bg-[linear-gradient(to_top,#ececec,#fff)] p-1 shadow-[0_0_1px_rgba(0,0,0,0.07),0_0_1px_rgba(0,0,0,0.05),0_3px_3px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.12)] duration-300 hover:shadow-none"
      >
        <div
          class="h-full w-full inline-flex items-center justify-center gap-4 gap-x-0.5 gap-y-0.5 overflow-hidden rounded-full bg-[linear-gradient(#f4f4f4,#fefefe)] px-4 py-2 text-[18px] text-xl text-[#101010] text-#52B54B font-medium duration-200 group-hover:bg-[linear-gradient(#e2e2e2,#fefefe)] group-hover:text-#EA1179"
          @click="mainBtnHandler"
        >
          <img
            v-if="!isLoading"
            :src="config.web.emby.icon"
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
