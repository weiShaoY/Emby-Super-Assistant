/**
 *  Quicker 配置
 */
export const quickerConfig = {
  /**
   *  打开文件夹动作Id
   */
  openFolderId: 'a186251d-2767-4729-838c-757647bed39e' + '?',

  /**
   *  打开文件夹的盘符
   */
  openFolderDrive: 'Z:\\',

  url: undefined as any,

  /**
   *  打开文件夹
   * @param  directoryPath - 文件夹路径
   * @param  isEmby - 是否是 Emby打开文件夹 (默认为 false) (emby传入路径包含了盘符:例如 Z:\\日本\\樱空桃\\IPZZ-342-C 樱空桃\\IPZZ-342-破解-C.mp4)
   */
  openFolder: (directoryPath: string, isEmby = false) => {
    if (!isEmby) {
      window.open(
        `quicker:runaction:${quickerConfig.openFolderId}${quickerConfig.openFolderDrive}${
          directoryPath
        }`,
        '_blank',
      )
    }

    // 否则是 Emby打开文件夹
    else {
      window.open(
        `quicker:runaction:${quickerConfig.openFolderId}${
          directoryPath
        }`,
      )
    }
  },
}

quickerConfig.url = `quicker:runaction:${quickerConfig.openFolderId}${quickerConfig.openFolderDrive}`

export default quickerConfig
