import { Message } from '@arco-design/web-vue'

import { ref } from 'vue'

import { defineStore } from 'pinia'

import useEmbyStore from '../emby'

import javdbSvg from '@/assets/svg/site/javdb.svg'

import btsowSvg from '@/assets/svg/site/btsow.svg'

import btsowHoverSvg from '@/assets/svg/site/btsow_hover.svg'

import embySvg from '@/assets/svg/site/emby.svg'

import embyHoverSvg from '@/assets/svg/site/emby-hover.svg'

import emby from '@/config/web/emby'

const useSiteStore = defineStore(
  'site',
  () => {
    const embyStore = useEmbyStore()

    const site = ref({
      javdb: {
        logo: javdbSvg,

        name: 'JavDB',

        url: 'https://javdb.com',

      },

      btsow: {
        logo: btsowSvg,

        logoHover: btsowHoverSvg,

        name: 'Btsow',

        url: 'https://btsow.com',
      },

      emby: {
        logo: embySvg,

        logoHover: embyHoverSvg,

        name: 'Emby',

        url: `${embyStore.emby.url}:${embyStore.emby.port}`,
      },

    })

    /**
     *  打开Javdb搜索当前视频
     */
    function openJavdbSearch(videoName: string) {
      window.open(`${site.value.javdb.url}/search?q=${videoName}&f=all`, '_blank')
    }

    /**
     *  打开Btsow搜索当前视频
     */
    function openBtsowSearch(videoName: string) {
      window.open(`${site.value.btsow.url}/search/${videoName}`, '_blank')
    }

    /**
     *  打开Emby
     */
    function openEmby() {
      const protocol = embyStore.emby.url.startsWith('http') ? '' : 'http://'

      window.open(`${protocol}${embyStore.emby.url}:${embyStore.emby.port}/web/index.html#!/home`, '_blank')
    }

    return {

      site,

      /**
       *  打开Javdb搜索当前视频
       */
      openJavdbSearch,

      /**
       *  打开Btsow搜索当前视频
       */
      openBtsowSearch,

      /**
       *  打开Emby
       */
      openEmby,
    }
  },

)

export default useSiteStore
