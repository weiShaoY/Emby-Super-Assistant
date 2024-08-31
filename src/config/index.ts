import emby from './emby'

import video from './video'

import quicker from './quicker'

const btsowUrl = 'https://btsow.com/search/'

const javdb = {
  name: 'JavDB',
  hostname: 'javdb.com',
  url: 'https://javdb.com/search?q={{code}}',
  fetchType: 'parser',
  domQuery: {
    linkQuery: '.movie-list>.item:first-child>a',
    titleQuery: '.video-title',
  },
}

/**
 *  是否是详情页滚动
 */
const isDetailsPageScroll = true

export {
  btsowUrl,
  isDetailsPageScroll,
  javdb,
}

export const config = {

  /**
   *  emby 配置
   */
  emby,

  /**
   *  quicker 配置
   */
  quicker,

  /**
   *  视频配置
   */
  video,

}

export default config
