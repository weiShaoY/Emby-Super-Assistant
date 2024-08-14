import { Notification } from '@arco-design/web-vue'

/**
 * 视频文件管理
 */
export const videoManager = {
  /**
   * 获取视频文件
   * @return {VideoType[] | null} -  videoFileArray -  视频文件 JSON 字符串
   */
  get(): VideoType[] | null {
    const videoFileJson = localStorage.getItem('videoFile')

    return videoFileJson ? JSON.parse(videoFileJson) : null
  },

  /**
   * 设置视频文件
   * @param {Set<VideoType>} videoFileSet - 视频文件集合
   */
  set(videoFileSet: Set<VideoType>): void {
    const videoFile = JSON.stringify(Array.from(videoFileSet))

    localStorage.setItem('videoFile', videoFile)
  },

  /**
   *   视频文件查重
   */
  /**
   * 视频文件查重
   */
  duplicate() {
    /**
     * 找出具有相同属性值的重复项
     * @param {VideoType[]} list - 要处理的数组
     * @param {keyof VideoType} property - 用于比较的属性名
     * @returns {VideoType[]} result - 具有重复项的新数组
     */
    function findDuplicatesByProperty(
      list: VideoType[],
      property: keyof VideoType,
    ): VideoType[] {
      const propertyMap: { [key: string]: VideoType[] } = {}

      const duplicates: VideoType[] = []

      list.forEach((item) => {
        const key = item[property] as string

        if (!propertyMap[key]) {
          propertyMap[key] = []
        }

        propertyMap[key].push(item)
      })

      for (const key in propertyMap) {
        if (propertyMap[key].length > 1) {
          duplicates.push(...propertyMap[key])
        }
      }

      return duplicates
    }

    /**
     * 获取具有重复 videoProcessedName 的项并去重
     * @param {VideoType[]} items - 要处理的数组
     * @returns {string[]} uniqueVideoProcessedNames - 去重后的 videoProcessedName 数组
     */
    function getUniqueVideoProcessedName(items: VideoType[]): string[] {
      const videoProcessedNameMap: { [key: string]: VideoType[] } = {}

      const uniqueVideoProcessedNames: string[] = []

      // 遍历每个项，将具有重复 videoProcessedName 的项存储在映射中
      items.forEach((item) => {
        const key = item.videoProcessedName

        if (!videoProcessedNameMap[key]) {
          videoProcessedNameMap[key] = []
        }

        videoProcessedNameMap[key].push(item)
      })

      // 遍历映射，找出具有重复 videoProcessedName 的项并去重
      for (const key in videoProcessedNameMap) {
        if (videoProcessedNameMap[key].length > 1) {
          uniqueVideoProcessedNames.push(key)
        }
      }

      return uniqueVideoProcessedNames
    }

    /**
     * 主函数，处理筛选重复项逻辑
     * @returns {{videoList: VideoType[], videoNameList: string[]}} - 返回重复的视频和去重后的视频名称列表
     */
    function handleDuplicates(): {
      duplicatesVideoList: VideoType[]
      duplicatesVideoNameList: string[]
    } {
      const videoFileArray = videoManager.get()

      if (!videoFileArray)
        return { duplicatesVideoList: [], duplicatesVideoNameList: [] }

      /**
       *  所有重复的影片列表
       */
      const duplicatesVideoList = findDuplicatesByProperty(
        videoFileArray,
        'videoProcessedName',
      )

      /**
       *  Emby去重的影片标题列表
       */
      const duplicatesVideoNameList = getUniqueVideoProcessedName(videoFileArray)

      // Notification.success({
      //   title: `共发现:\u00A0\u00A0${duplicatesVideoList.length}部\u00A0\u00A0视频重复`,
      //   content: `共${videoNameList.length}个去重后的影片标题
      //    ${videoNameList.join('\n')}`,

      //   duration: 300000,
      //   closable: true,
      //   style: {
      //     whiteSpace: 'pre-line', // 添加这个样式
      //   },
      // })

      return { duplicatesVideoList, duplicatesVideoNameList }
    }

    // 调用主函数来处理重复项并返回结果
    return handleDuplicates()
  },

}

export default videoManager
