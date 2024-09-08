/**
 *  读取的文件夹 相关类型
 */
// namespace FolderType {

// }
type FolderType = {

  /**
   * 选择的盘符（如 C、D、E、F）
   */
  driveLetter: string

  /**
   * 是否启用定时提示读取文件夹
   */
  isEnableReminder: boolean

  /**
   * 提示读取文件夹的时间间隔（小时）
   */
  reminderInterval: number

  /**
   * 定时器检查读取提示的时间间隔（小时）
   */
  checkInterval: number

  /**
   * Quicker打开文件夹动作Id
   */
  quickerOpenFolderId: string

  // /**
  //  * 读取文件夹名称
  //  */
  // readFolderName: string

  // /**
  //  *  文件夹上次读取时间
  //  */
  // lastReadTime: number

  // /**
  //  * 文件列表
  //  */
  // fileList: VideoType.Video[]

  // /**
  //  *   文件列表中文件名重复的文件列表
  //  */
  // duplicateFileList: VideoType.Video[]

  // /**
  //  *   去重后的文件名列表
  //  */
  // uniqueFileNameList: string[]
}
