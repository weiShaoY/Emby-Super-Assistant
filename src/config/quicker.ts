/**
 * Quicker 配置
 */
export const quicker = {
  /**
   * 打开文件夹动作Id
   */
  openFolderId: '8bd941d1-29ff-459d-8880-db3516a9dcd0',

  /**
   * 打开文件夹的盘符
   */
  openFolderDrive: 'Z:\\',

  /**
   * 打开文件夹
   * @param directoryPath - 文件夹路径
   * @param isEmby - 是否是 Emby 打开文件夹 (默认为 false) (emby 传入路径包含了盘符:例如 Z:\\日本\\樱空桃\\IPZZ-342-C 樱空桃\\IPZZ-342-破解-C.mp4)
   */
  openFolder: (directoryPath: string, isEmby = false) => {
    const baseAction = `quicker:runaction:${quicker.openFolderId}`

    const fullPath = isEmby
      ? directoryPath
      : `${quicker.openFolderDrive}${directoryPath}`

    window.open(`${baseAction}'?'${fullPath}`, '_blank')
  },
}

export default quicker
