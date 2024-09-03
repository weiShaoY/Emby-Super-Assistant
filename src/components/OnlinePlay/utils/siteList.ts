import javdbSvg from '@/assets/svg/web/javdb.svg'

import javbusSvg from '@/assets/svg/web/javbus.svg'

import missavSvg from '@/assets/svg/web/missav.svg'

import javmostSvg from '@/assets/svg/web/javmost.svg'

import javfc2Svg from '@/assets/svg/web/javfc2.svg'

import supjavSvg from '@/assets/svg/web/supjav.svg'

import netflavSvg from '@/assets/svg/web/netflav.svg'

import javmenuSvg from '@/assets/svg/web/javmenu.svg'

import jableSvg from '@/assets/svg/web/jable.svg'

import hayavSvg from '@/assets/svg/web/hayav.svg'

import bestjavpornSvg from '@/assets/svg/web/bestjavporn.svg'

import javGuruSvg from '@/assets/svg/web/javGuru.svg'

import avjoySvg from '@/assets/svg/web/avjoy.svg'

import paipanconSvg from '@/assets/svg/web/paipancon.svg'

import _18avSvg from '@/assets/svg/web/18av.svg'

import av01Svg from '@/assets/svg/web/av01.svg'

import njavSvg from '@/assets/svg/web/njav.svg'

import missAvSvg from '@/assets/svg/web/missAv.svg'

import ggjavSvg from '@/assets/svg/web/ggjav.svg'

import highpornSvg from '@/assets/svg/web/highporn.svg'

import evojavSvg from '@/assets/svg/web/evojav.svg'

import javlibSvg from '@/assets/svg/web/javlib.svg'

export type DomQuery_parser = {

  /**
   * 指定搜索结果列表中的索引，部分网站的第一个结果可能是广告。
   * 特别指定：适用于 GGJAV 网站。
   */
  listIndex?: number

  /**
   * 大部分视频代码格式为 `xxx-000`，但部分网站使用空格分隔代码 `xxx 000`。
   * 特别指定：原用于 GGJAV 网站的情况。
   */
  spaceCode?: boolean

  /** a 标签的 href 属性查询字符串 */
  linkQuery: string

  /** 在标题中检测是否包含「字幕」等文本 */
  titleQuery: string
}

export type DomQuery_get = {

  /**
   * 检查页面是否提供视频播放资源。
   * 特别指定：适用于 JAVMENU，收录视频但未提供在线播放资源。
   * 特别指定：适用于 njav，资源不存在但仍返回 404 状态码。
   */
  videoQuery?: string

  /** 查询字幕信息的选择器 */
  subQuery?: string

  /** 查询泄露资源信息的选择器 */
  leakQuery?: string
}

type SiteItemBase = {

  /**
   * 站点名称
   */
  name: string

  /**
   *  图标
   */
  icon?: string

  /**
   * [已废弃] 用户自定义的禁用选项
   */
  // disable: boolean;

  /**
   * 在指定的 LibItem.name 下不显示该站点。
   * 特别指定：用于防止在 matchList 中出现自己检索自己站点的情况。
   */
  disableLibItemName?: string

  /** 站点的主机名 */
  hostname: string

  /** 站点的 URL 地址 */
  url: string

  /**
   * 部分站点的代码格式不同，可使用自定义格式化函数。
   * @param {string} preCode - 预处理前的代码
   * @returns {string} - 返回格式化后的代码
   */
  codeFormater?: (preCode: string) => string
}

export type SiteItem_get = {

  /**
   * 获取类型为 "get"，表示直接获取页面内容。
   */
  fetchType: 'get'

  /**
   * 用于页面解析的 DOM 查询对象
   */
  domQuery: DomQuery_get
} & SiteItemBase

export type SiteItem_parser = {

  /**
   * 获取类型为 "parser"，表示需要解析搜索结果页。
   */
  fetchType: 'parser'

  /**
   * 用于搜索结果解析的 DOM 查询对象
   */
  domQuery: DomQuery_parser
} & SiteItemBase

export type SiteItem_post = {

  /**
   * 获取类型为 "post"，表示需要发送 POST 请求获取内容。
   */
  fetchType: 'post'

  /**
   * POST 请求的参数对象
   */
  postParams: Record<string, any>

  /**
   * 用于搜索结果解析的 DOM 查询对象
   */
  domQuery: DomQuery_parser
} & SiteItemBase

/**
 *  bus 里有些以 '300MIUM' 开头，要处理掉这个 300
 */
export const SP_PREFIX = '300' as const

/**
 * 站点项的类型，可以是 "get"、"parser" 或 "post" 三种类型之一。
 */
export type SiteItem = SiteItem_get | SiteItem_parser | SiteItem_post

/** 在线网站列表 */
export const siteList: SiteItem[] = [
  {
    name: 'JavDB',
    icon: javdbSvg,
    disableLibItemName: 'javdb',
    hostname: 'javdb.com',
    url: 'https://javdb.com/search?q={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: '.movie-list>.item:first-child>a',
      titleQuery: '.video-title',
    },
  },
  {
    name: 'JavBus',
    icon: javbusSvg,
    disableLibItemName: 'javbus',
    hostname: 'javbus.com',
    url: 'https://javbus.com/{{code}}',
    fetchType: 'get',
    domQuery: {},

    // codeFormater: preCode => (preCode.startsWith('MIUM') ? `${SP_PREFIX}${preCode}` : preCode),
  },

  {
    name: 'Jable',
    icon: jableSvg,
    hostname: 'jable.tv',
    url: 'https://jable.tv/videos/{{code}}/',
    fetchType: 'get',
    domQuery: {
      subQuery: '.info-header',
      leakQuery: '.info-header',
    },
  },
  {
    name: 'MISSAV',
    icon: missAvSvg,
    hostname: 'missav.com',
    url: 'https://missav.com/{{code}}/',
    fetchType: 'get',
    domQuery: {
      // 标签区的第一个一般是字幕标签
      subQuery: '.space-y-2 a.text-nord13[href="https://missav.com/chinese-subtitle"]',

      // 有个「切換無碼」按钮，藏在分享按钮旁边……
      // leakQuery: ".order-first div.rounded-md a[href]:last-child",
    },
  },

  // {
  //   name: 'MISSAV_123',
  //   icon: missavSvg,
  //   hostname: 'missav123.com',
  //   url: 'https://missav123.com/{{code}}/',
  //   fetchType: 'get',
  //   domQuery: {
  //     // 标签区的第一个一般是字幕标签
  //     subQuery: '.space-y-2 a.text-nord13[href="https://missav123.com/chinese-subtitle"]',

  //     // 有个「切換無碼」按钮，藏在分享按钮旁边……
  //     leakQuery: '.order-first div.rounded-md a[href]:last-child',
  //   },
  // },
  {
    name: 'njav',
    icon: njavSvg,
    hostname: 'njav.tv',
    url: 'https://njav.tv/zh/v/{{code}}',
    fetchType: 'get',
    domQuery: {
      videoQuery: '#player',
    },
  },
  {
    // 有可能搜出仨：leakage subtitle 4k
    name: 'Supjav',
    icon: supjavSvg,
    hostname: 'supjav.com',
    url: 'https://supjav.com/zh/?s={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: `.posts.clearfix>.post>a.img[title]`,
      titleQuery: `h3>a[rel="bookmark"][itemprop="url"]`,
    },
  },
  {
    name: 'NETFLAV',
    icon: netflavSvg,
    hostname: 'netflav5.com',
    url: 'https://netflav5.com/search?type=title&keyword={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: '.grid_cell>a',
      titleQuery: '.grid_cell>a>.grid_title',
    },
  },

  // {
  //   name: 'Avgle',
  //   hostname: 'avgle.com',
  //   url: 'https://avgle.com/search/videos?search_query={{code}}&search_type=videos',
  //   fetchType: 'parser',
  //   domQuery: {
  //     linkQuery: '.container>.row .row .well>a[href]',
  //     titleQuery: '.container>.row .row .well .video-title',
  //   },
  // },

  // {
  //   name: 'JAVHHH',
  //   hostname: 'javhhh.com',
  //   url: 'https://javhhh.com/v/?wd={{code}}',
  //   fetchType: 'parser',
  //   domQuery: {
  //     linkQuery: '.typelist>.i-container>a[href]',
  //     titleQuery: '.typelist>.i-container>a[href]',
  //   },
  // },
  {
    name: 'BestJP',
    icon: bestjavpornSvg,
    hostname: 'bestjavporn.com',
    url: 'https://www3.bestjavporn.com/search/{{code}}',
    fetchType: 'parser',
    domQuery: { linkQuery: 'article.thumb-block>a', titleQuery: 'article.thumb-block>a' },
  },
  {
    name: 'JAVMENU',
    icon: javmenuSvg,
    hostname: 'javmenu.com',
    url: 'https://javmenu.com/{{code}}',
    fetchType: 'get',
    domQuery: {
      videoQuery: 'a.nav-link[aria-controls=\'pills-0\']',
    },

    // codeFormater: (preCode) => preCode.replace("-", ""),
  },
  {
    name: 'Jav.Guru',
    icon: javGuruSvg,
    hostname: 'jav.guru',
    url: 'https://jav.guru/?s={{code}}',
    fetchType: 'parser',
    domQuery: { linkQuery: '.imgg>a[href]', titleQuery: '.inside-article>.grid1 a[title]' },
  },
  {
    name: 'JAVMOST',
    icon: javmostSvg,
    hostname: 'javmost.cx',
    url: 'https://javmost.cx/search/{{code}}/',
    fetchType: 'parser',
    domQuery: {
      linkQuery: '#content .card a#MyImage',
      titleQuery: '#content .card-block .card-title',
    },
  },
  {
    name: 'HAYAV',
    icon: hayavSvg,
    hostname: 'hayav.com',
    url: 'https://hayav.com/video/{{code}}/',
    fetchType: 'get',
    domQuery: {
      // subQuery: `.site__col>.entry-header>h1.entry-title`,
    },
  },
  {
    name: 'AvJoy',
    icon: avjoySvg,
    hostname: 'avjoy.me',
    url: 'https://avjoy.me/search/videos/{{code}}',
    fetchType: 'parser',
    domQuery: {
      titleQuery: `#wrapper .row .content-info span.content-title`,
      linkQuery: `#wrapper .row a[href^="/video/"]`,
    },
  },
  {
    name: 'JAVFC2',
    icon: javfc2Svg,
    hostname: 'javfc2.net',
    url: 'https://javfc2.net/?s={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: 'article.loop-video>a[href]',
      titleQuery: 'article.loop-video .entry-header',
    },
  },
  {
    name: 'paipancon',
    icon: paipanconSvg,
    hostname: 'paipancon.com',
    url: 'https://paipancon.com/search/{{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: 'div.col>div.card>a[href]',

      // 然而这个不是 title，是图片，这个站居然 title 里不包含 code，反而图片包含
      titleQuery: 'div.card img.card-img-top',
    },
  },
  {
    name: 'GGJAV',
    icon: ggjavSvg,
    hostname: 'ggjav.com',
    url: 'https://ggjav.com/main/search?string={{code}}',
    fetchType: 'parser',
    domQuery: {
      listIndex: 1,

      // spaceCode: true,
      titleQuery: 'div.columns.large-3.medium-6.small-12.item.float-left>div.item_title>a.gray_a',
      linkQuery: 'div.columns.large-3.medium-6.small-12.item.float-left>div.item_title>a.gray_a',
    },
  },

  {
    name: 'AV01',
    icon: av01Svg,
    hostname: 'www.av01.tv',
    url: 'https://www.av01.tv/search/videos?search_query={{code}}',
    fetchType: 'parser',
    domQuery: { linkQuery: 'div[id].well-sm>a', titleQuery: '.video-views>.pull-left' },
  },

  // {
  //   name: '18sex',
  //   hostname: '18sex.org',
  //   url: 'https://www.18sex.org/cn/search/{{code}}/',
  //   fetchType: 'parser',
  //   domQuery: { linkQuery: '.white_link[href]', titleQuery: '.white_link>.card-title' },
  // },
  {
    name: 'highporn',
    icon: highpornSvg,
    hostname: 'highporn.net',
    url: 'https://highporn.net/search/videos?search_query={{code}}',
    fetchType: 'parser',
    domQuery: { linkQuery: '.well>a[href]', titleQuery: '.well>a[href]>span.video-title' },
  },
  {
    name: 'evojav',
    icon: evojavSvg,
    hostname: 'evojav.pro',
    url: 'https://evojav.pro/video/{{code}}/',
    fetchType: 'get',
    domQuery: {},
  },
  {
    name: '18av',
    icon: _18avSvg,
    hostname: '18av.mm-cg.com',
    url: 'https://18av.mm-cg.com/zh/fc_search/all/{{code}}/1.html',
    fetchType: 'parser',
    domQuery: { linkQuery: '.posts h3>a[href]', titleQuery: '.posts h3>a[href]' },
  },

  // {
  //   name: 'javgo',
  //   hostname: 'javgo.to',
  //   url: 'https://javgo.to/zh/v/{{code}}',
  //   fetchType: 'get',
  //   domQuery: {},
  // },

  {
    name: 'JAVLib',
    icon: javlibSvg,
    disableLibItemName: 'javlib',
    hostname: 'javlibrary.com',
    url: 'https://www.javlibrary.com/cn/vl_searchbyid.php?keyword={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: '.videothumblist .video[id]:first-child>a',
      titleQuery: '.videothumblist .video[id]:first-child>a>div.id',
    },
  },
]
