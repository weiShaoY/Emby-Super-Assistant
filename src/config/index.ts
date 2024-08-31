import embyConfig from './embyConfig'

import videoConfig from './videoConfig'

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
  embyConfig,
  videoConfig,
  quicker as quickerConfig,
  isDetailsPageScroll,
  javdb,
}

export const config = {

  emby: embyConfig,

  /**
   *  quicker 配置
   */
  quicker,

}

export default config
