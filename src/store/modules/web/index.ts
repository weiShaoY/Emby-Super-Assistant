import { Message } from '@arco-design/web-vue'

import { ref } from 'vue'

import { defineStore } from 'pinia'

import javdbSvg from '@/assets/svg/web/javdb.svg'

import btsowSvg from '@/assets/svg/web/btsow.svg'

import btsowHoverSvg from '@/assets/svg/web/btsow_hover.svg'

const useWebStore = defineStore(
  'web',
  () => {
    const web = ref({
      javdb: {
        icon: javdbSvg,

        name: 'JavDB',

        url: 'https://javdb.com/',

      },

      btsow: {
        icon: btsowSvg,

        iconHover: btsowHoverSvg,

        name: 'Btsow',

        url: 'https://btsow.com',
      },

    })

    /**
     *  在Javdb搜索当前视频
     */
    function javdbSearch(videoName: string) {
      window.open(`${web.value.javdb.url}/search?q=${videoName}&f=all`, '_blank')
    }

    /**
     *  在Javdb搜索当前视频
     */
    function btsowSearch(videoName: string) {
      window.open(`${web.value.btsow.url}/search/${videoName}`, '_blank')
    }

    return {
      web,
      javdbSearch,
      btsowSearch,
    }
  },

)

export default useWebStore
