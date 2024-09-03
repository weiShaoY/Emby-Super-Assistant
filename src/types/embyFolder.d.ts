  /**
   *  Emby 文件夹类型
   */
  type EmbyFolderType = {

    /**
     *  Emby 文件夹名称
     */
    name: string

    /**
     *  Emby 文件夹文件列表
     */
    list: VideoType.Video[]

    /**
     *  所有重复的视频列表
     */
    allDuplicateVideoList: VideoType.Video[]

    /**
     *  去重的视频标题列表
     */
    uniqueVideoNameList: string[]

    /**
     *  Emby 文件夹 上次读取时间
     */
    lastReadTime: number
  }
