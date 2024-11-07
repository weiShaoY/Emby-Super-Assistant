import { Message } from '@arco-design/web-vue'

import { ref } from 'vue'

import { defineStore } from 'pinia'

import { config } from '@/config'

const useFolderStore = defineStore(
  'folder',
  () => {
    const folder = ref<FolderType>({
      /**
       * 选择的盘符（如 C、D、E、F）
       */
      driveLetter: 'Z',

      /**
       * 是否启用定时提示读取文件夹
       */
      isEnableReminder: true,

      /**
       * 提示读取文件夹的时间间隔（小时）
       */
      reminderInterval: 168,

      /**
       * 定时器检查读取提示的时间间隔（小时）
       */
      checkInterval: 1,

      /**
       *  Quicker打开文件夹动作Id
       */
      quickerOpenFolderId: '8bd941d1-29ff-459d-8880-db3516a9dcd0',

      // /**
      //  *  读取的文件夹名称
      //  */
      // readFolderName: '',

      // /**
      //  *  上次读取时间
      //  */
      // lastReadTime: 0,

      // /**
      //  *  文件列表
      //  */
      // fileList: [],

      // /**
      //  *  文件列表中文件名重复的文件列表
      //  */
      // duplicateFileList: [],

      // /**
      //  *  去重后的文件列表
      //  */
      // uniqueFileNameList: [],

    })

    /**
     *  文件夹名称
     */
    const folderName = ref<string>('')

    /**
     *  文件夹 读取时间
     */
    const folderReadTime = ref<number >(0)

    /**
     *  文件夹 文件列表
     */
    const folderFileList = ref<VideoType.Video[]>([])

    /**
     *  文件夹 文件名重复的文件列表
     */
    const duplicateFolderFileList = ref<VideoType.Video[]>([])

    /**
     *  文件夹 文件名去重后的文件列表
     */
    const uniqueFolderFileNameList = ref<string[]>([])

    /**
     *  获取文件
     */
    function getFolder() {
      const embyFolder = JSON.parse(GM_getValue('EmbyFolder', '{}'))

      if (embyFolder.folderName && embyFolder.folderReadTime && embyFolder.folderFileList) {
        folderName.value = embyFolder.folderName

        folderReadTime.value = embyFolder.folderReadTime

        folderFileList.value = embyFolder.folderFileList

        duplicateFolderFileList.value = getDuplicateFolderFileList(folderFileList.value, 'processedName')

        uniqueFolderFileNameList.value = getUniqueFolderFileList(folderFileList.value, 'processedName')
      }

      else {
        Message.error('读取Emby文件夹, 请重新读取Emby文件夹')
      }
    }

    /**
     *  保存文件
     *  @param {string} folderName_ - 文件夹名
     *  @param {Set<VideoType.Video>} videoFileSet - 视频文件集合
     */
    function saveFolderFileList(folderName_: string, videoFileSet: Set<VideoType.Video>) {
      folderName.value = folderName_

      folderFileList.value = Array.from(videoFileSet)

      duplicateFolderFileList.value = getDuplicateFolderFileList(folderFileList.value, 'processedName')

      uniqueFolderFileNameList.value = getUniqueFolderFileList(folderFileList.value, 'processedName')

      folderReadTime.value = Date.now()

      const embyFolder = {
        folderName: folderName.value,
        folderReadTime: folderReadTime.value,
        folderFileList: folderFileList.value,
      }

      GM_setValue('EmbyFolder', JSON.stringify(embyFolder))
    }

    /**
     * 打开文件夹函数
     * @param  directoryPath - 文件夹的路径
     * @param  [isEmby] - 是否为 Emby 路径
     */
    function openFolder(directoryPath: string, isEmby = false) {
      // Z:\\日本\\樱空桃\\IPZZ-342-C 樱空桃\\IPZZ-342-破解-C.mp4)

      const baseAction = `quicker:runaction:${folder.value.quickerOpenFolderId}`

      /**
       *  获取完整路径
       */
      const fullPath = isEmby
        ? directoryPath
        : `${folder.value.driveLetter}:\\\\${directoryPath}`

      const encodedPath = encodeURIComponent(fullPath)

      window.open(`${baseAction}?${encodedPath}`, '_blank')
    }

    /**
     * 获取重复文件列表
     * @param {T[]} list - 要检查的列表
     * @param {keyof T} property - 用于比较的属性名
     * @return {T[]} - 返回重复视频的列表
     */
    function getDuplicateFolderFileList<T>(list: T[], property: keyof T): T[] {
      const propertyMap = list.reduce((acc, item) => {
        const key = item[property] as unknown as string

        acc[key] = acc[key] || []
        acc[key].push(item)
        return acc
      }, {} as { [key: string]: T[] })

      return Object.values(propertyMap)
        .filter(items => items.length > 1) // 过滤掉那些只有一个项的属性值
        .flat() // 展平数组，返回所有重复项
    }

    /**
     * 获取具有重复属性值的项，并返回去重后的属性值数组
     * @param {T[]} items - 要处理的数组
     * @param {keyof T} property - 用于比较的属性名
     * @returns {string[]} - 返回去重后的属性值数组
     */
    function getUniqueFolderFileList<T>(items: T[], property: keyof T): string[] {
      const propertyMap = items.reduce((acc, item) => {
        const key = item[property] as unknown as string

        acc[key] = acc[key] || []
        acc[key].push(item)
        return acc
      }, {} as { [key: string]: T[] })

      return Object.keys(propertyMap).filter(key => propertyMap[key].length > 1)
    }

    return {
      folder,

      /**
       *  文件夹 名称
       */
      folderName,

      /**
       *  文件夹 读取时间
       */
      folderReadTime,

      /**
       *  文件夹 文件列表
       */
      folderFileList,

      /**
       *  文件夹 文件名重复的文件列表
       */
      duplicateFolderFileList,

      /**
       *  文件夹 文件名去重后的文件列表
       */
      uniqueFolderFileNameList,

      /**
       *  获取文件夹
       */
      getFolder,

      /**
       *  打开文件夹
       */
      openFolder,

      /**
       *  保存文件夹文件列表
       */
      saveFolderFileList,

    }
  },

)

export default useFolderStore
