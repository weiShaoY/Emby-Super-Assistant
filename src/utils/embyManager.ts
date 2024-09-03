/**
 * 视频文件管理
 */
export const embyManager = {
  /**
   * 获取存储的 Emby 文件夹对象
   * @return  {EmbyFolderType}
   */
  get(): EmbyFolderType {
    const embyFolder = JSON.parse(GM_getValue('EmbyFolder')) as EmbyFolderType

    return {
      ...embyFolder,
      allDuplicateVideoList: this.getAllDuplicateVideoList(embyFolder.list || [], 'processedName') || [],
      uniqueVideoNameList: this.getUniqueVideoNameList(embyFolder.list || [], 'processedName') || [],
    }
  },

  /**
   * 设置视频文件
   * @param {string} embyFolderName - Emby 文件夹名称
   * @param {Set<VideoType.Video>} videoFileSet - 视频文件集合
   */
  set(embyFolderName: string, videoFileSet: Set<VideoType.Video>): void {
    const list = Array.from(videoFileSet)

    const embyFolder: EmbyFolderType = {
      name: embyFolderName,
      list: list || [],
      allDuplicateVideoList: this.getAllDuplicateVideoList(list || [], 'processedName') || [],
      uniqueVideoNameList: this.getUniqueVideoNameList(list || [], 'processedName') || [],
      lastReadTime: Date.now(),
    }

    GM_setValue('EmbyFolder', JSON.stringify(embyFolder))
  },

  /**
   * 获取所有重复视频列表
   * @param {T[]} list - 要检查的列表
   * @param {keyof T} property - 用于比较的属性名
   * @return {T[]} - 返回重复视频的列表
   */
  getAllDuplicateVideoList<T>(list: T[], property: keyof T): T[] {
    const propertyMap = list.reduce((acc, item) => {
      const key = item[property] as unknown as string

      acc[key] = acc[key] || []
      acc[key].push(item)
      return acc
    }, {} as { [key: string]: T[] })

    return Object.values(propertyMap)
      .filter(items => items.length > 1) // 过滤掉那些只有一个项的属性值
      .flat() // 展平数组，返回所有重复项
  },

  /**
   * 获取具有重复属性值的项，并返回去重后的属性值数组
   * @param {T[]} items - 要处理的数组
   * @param {keyof T} property - 用于比较的属性名
   * @returns {string[]} - 返回去重后的属性值数组
   */
  getUniqueVideoNameList<T>(items: T[], property: keyof T): string[] {
    const propertyMap = items.reduce((acc, item) => {
      const key = item[property] as unknown as string

      acc[key] = acc[key] || []
      acc[key].push(item)
      return acc
    }, {} as { [key: string]: T[] })

    return Object.keys(propertyMap).filter(key => propertyMap[key].length > 1)
  },
}

export default embyManager
