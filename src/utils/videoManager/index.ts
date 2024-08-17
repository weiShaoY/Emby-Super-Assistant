/**
 * 视频文件管理
 */
export const videoManager = {
  /**
   * 获取视频文件数组
   * @return {VideoType[] | null} -  videoFileArray -  视频文件 JSON 字符串
   */
  get(): VideoType.Video[] | null {
    const videoFileJson = localStorage.getItem('videoFile')

    return videoFileJson ? JSON.parse(videoFileJson) : null
  },

  /**
   * 设置视频文件
   * @param {Set<VideoType>} videoFileSet - 视频文件集合
   */
  set(videoFileSet: Set<VideoType.Video>): void {
    const videoFile = JSON.stringify(Array.from(videoFileSet))

    localStorage.setItem('videoFile', videoFile)
  },

  /**
   * 视频文件查重
   */
  duplicate() {
    /**
     * 找出具有相同属性值的重复项
     * @param {T[]} list - 要处理的数组
     * @param {keyof T} property - 用于比较的属性名
     * @returns {T[]} result - 具有重复项的新数组
     */
    function findDuplicatesByProperty<T>(
      list: T[],
      property: keyof T,
    ): T[] {
      const propertyMap = list.reduce((acc, item) => {
        const key = item[property] as unknown as string

        acc[key] = acc[key] || []
        acc[key].push(item)
        return acc
      }, {} as { [key: string]: T[] })

      return Object.values(propertyMap)
        .flat()
        .filter((_, i, arr) => arr.length > 1)
    }

    /**
     * 获取具有重复属性值的项，并返回去重后的属性值数组
     * @param {VideoType[]} items - 要处理的数组
     * @param {keyof VideoType} property - 用于比较的属性名
     * @returns {string[]} uniqueValues - 去重后的属性值数组
     */
    function getUniqueValuesByProperty<T>(items: T[], property: keyof T): string[] {
      const propertyMap = items.reduce((acc, item) => {
        const key = item[property] as unknown as string

        acc[key] = acc[key] || []
        acc[key].push(item)
        return acc
      }, {} as { [key: string]: T[] })

      return Object.keys(propertyMap).filter(key => propertyMap[key].length > 1)
    }

    /**
     * 主函数，处理筛选重复项逻辑
     * @returns {{videoList: VideoType[], videoNameList: string[]}} - 返回重复的视频和去重后的视频名称列表
     */
    function handleDuplicates(): {
      duplicatesVideoList: VideoType.Video[]
      duplicatesVideoNameList: string[]
    } {
      const videoFileArray = videoManager.get() || []

      return {
        /**
         *  所有重复的影片列表
         */
        duplicatesVideoList: findDuplicatesByProperty(videoFileArray, 'videoProcessedName'),

        /**
         *  Emby去重的影片标题列表
         */
        duplicatesVideoNameList: getUniqueValuesByProperty(videoFileArray, 'videoProcessedName'),
      }
    }

    // 调用主函数来处理重复项并返回结果
    return handleDuplicates()
  },

}

export default videoManager
