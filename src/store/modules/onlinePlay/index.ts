import { Message } from '@arco-design/web-vue'

import { ref } from 'vue'

import { defineStore } from 'pinia'

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

const useOnlinePlayStore = defineStore('onlinePlay', () => {
  const onlinePlay = ref<{
    isShowOnlinePlay: boolean
    siteList: OnlinePlayType.SiteItem[]
  }> ({
    /**
     *  是否显示在线播放组件
     */
    isShowOnlinePlay: true,

    /**
     *  在线播放 网站列表
     */
    siteList: [
      {
        isVisible: true,
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
        isVisible: true,
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
        isVisible: true,
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
        isVisible: true,
        name: 'MISSAV',
        icon: missAvSvg,
        hostname: 'missav.com',
        url: 'https://missav.com/{{code}}/',
        fetchType: 'get',
        domQuery: {
          // 标签区的第一个一般是字幕标签
          subQuery:
            '.space-y-2 a.text-nord13[href="https://missav.com/chinese-subtitle"]',

          // 有个「切換無碼」按钮，藏在分享按钮旁边……
          // leakQuery: ".order-first div.rounded-md a[href]:last-child",
        },
      },

      {
        isVisible: true,
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
        isVisible: true,

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
        isVisible: true,
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

      {
        isVisible: true,
        name: 'BestJP',
        icon: bestjavpornSvg,
        hostname: 'bestjavporn.com',
        url: 'https://www3.bestjavporn.com/search/{{code}}',
        fetchType: 'parser',
        domQuery: {
          linkQuery: 'article.thumb-block>a',
          titleQuery: 'article.thumb-block>a',
        },
      },
      {
        isVisible: true,
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
        isVisible: true,
        name: 'Jav.Guru',
        icon: javGuruSvg,
        hostname: 'jav.guru',
        url: 'https://jav.guru/?s={{code}}',
        fetchType: 'parser',
        domQuery: {
          linkQuery: '.imgg>a[href]',
          titleQuery: '.inside-article>.grid1 a[title]',
        },
      },
      {
        isVisible: true,
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
        isVisible: true,
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
        isVisible: true,
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
        isVisible: true,
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
        isVisible: true,
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
        isVisible: true,
        name: 'GGJAV',
        icon: ggjavSvg,
        hostname: 'ggjav.com',
        url: 'https://ggjav.com/main/search?string={{code}}',
        fetchType: 'parser',
        domQuery: {
          listIndex: 1,

          // spaceCode: true,
          titleQuery:
            'div.columns.large-3.medium-6.small-12.item.float-left>div.item_title>a.gray_a',
          linkQuery:
            'div.columns.large-3.medium-6.small-12.item.float-left>div.item_title>a.gray_a',
        },
      },

      {
        isVisible: true,
        name: 'AV01',
        icon: av01Svg,
        hostname: 'www.av01.tv',
        url: 'https://www.av01.tv/search/videos?search_query={{code}}',
        fetchType: 'parser',
        domQuery: {
          linkQuery: 'div[id].well-sm>a',
          titleQuery: '.video-views>.pull-left',
        },
      },

      {
        isVisible: true,
        name: 'highporn',
        icon: highpornSvg,
        hostname: 'highporn.net',
        url: 'https://highporn.net/search/videos?search_query={{code}}',
        fetchType: 'parser',
        domQuery: {
          linkQuery: '.well>a[href]',
          titleQuery: '.well>a[href]>span.video-title',
        },
      },
      {
        isVisible: true,
        name: 'evojav',
        icon: evojavSvg,
        hostname: 'evojav.pro',
        url: 'https://evojav.pro/video/{{code}}/',
        fetchType: 'get',
        domQuery: {},
      },
      {
        isVisible: true,
        name: '18av',
        icon: _18avSvg,
        hostname: '18av.mm-cg.com',
        url: 'https://18av.mm-cg.com/zh/fc_search/all/{{code}}/1.html',
        fetchType: 'parser',
        domQuery: {
          linkQuery: '.posts h3>a[href]',
          titleQuery: '.posts h3>a[href]',
        },
      },

      {
        isVisible: true,
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
    ],

  })

  /**
   *  打开网站
   *  @param event 鼠标事件
   *  @param siteItem 站点
   */
  const openSite = (event: MouseEvent, siteItem: OnlinePlayType.SiteItem) => {
    event.preventDefault()
    const { hostname } = siteItem

    window.open(`https://${hostname}`, '_blank')
  }

  return {
    onlinePlay,

    openSite,

  }
})

export default useOnlinePlayStore
