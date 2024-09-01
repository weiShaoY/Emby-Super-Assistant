import video from './video'

import quicker from './quicker'

import emby from './web/emby'

import javdb from './web/javdb'

import btsow from './web/btsow'

import torrentList from './torrentList'

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
   *  web 配置
   */
  web: {
    /**
     *  emby 配置
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
}

export default config
