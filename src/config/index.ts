import video from './video'

import quicker from './quicker'

import emby from './web/emby'

import javdb from './web/javdb'

import btsow from './web/btsow'

import torrentList from './torrentList'

import embyFolder from './web/embyFolder'

export const config = {
  /**
   *  quicker 配置
   */
  quicker,

  /**
   *  视频配置
   */
  video,

  torrentList,

  /**
   *  site 配置
   */
  web: {
    /**
     *  Emby 配置
     */
    emby,

    /**
     *  btsow 配置
     */
    btsow,

    /**
     *  javdb 配置
     */
    javdb,

  },

  /**
   *  Emby 文件夹 配置
   */
  embyFolder,
}

export default config
