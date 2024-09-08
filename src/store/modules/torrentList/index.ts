import { Message } from '@arco-design/web-vue'

import { ref } from 'vue'

import { defineStore } from 'pinia'

import javdbSvg from '@/assets/svg/site/javdb.svg'

import btsowSvg from '@/assets/svg/site/btsow.svg'

import btsowHoverSvg from '@/assets/svg/site/btsow_hover.svg'

const useTorrentListStore = defineStore(
  'torrentList',
  () => {
    const torrentList = ref({
      /**
       *  是否显示磁链组件
       */
      isShowTorrentList: true,

      /**
       * 详情页是否滚动到磁链组件位置
       */
      isScrollToTorrentList: true,

      /**
       *  排序规则数组
       */
      SortingRuleArray: [
        {
          name: 'UC.torrent.无码破解',
          backgroundColor: '#00FFFF',
          web: '色花堂',
        },
        {
          name: 'U.torrent.无码破解',
          backgroundColor: '#FF9F9F',
          web: '色花堂',
        },
        {
          name: '破解-c',
          backgroundColor: '##00BFFF',
        },
        {
          name: 'UC',
          backgroundColor: '#fca650',
        },
        {
          name: '-c',
          backgroundColor: '#FF6347',
        },
        {
          name: '-C.torrent',
          backgroundColor: '#FF1166',
          web: '色花堂',
        },
        {
          name: '-C',
          backgroundColor: '#2668B5',
        },
        {
          name: 'ch',
          backgroundColor: '#2A9D8F',
        },
        {
          name: '-U',
          backgroundColor: '#8FBC8F',
        },
        {
          name: 'ThZu.Cc',
          backgroundColor: '#FF4900',
          web: '桃花族',
        },
        {
          name: '4K-破解',
          backgroundColor: '#9BEC00',
        },
        {
          name: '4k',
          backgroundColor: '#C75B7A',
        },
        {
          name: '无码破解',
          backgroundColor: '#DDDD22',
        },
        {
          name: '无码',
          backgroundColor: '#95D2B3',
        },

        // {
        //   //  必须是纯小写  shkd-875.torrent
        //   name: '.torrent',
        //   backgroundColor: '#AD9277',
        //   site: '色花堂',
        // },

      ],
    })

    /**
     *  添加磁链规则
     */
    function addTorrentListRule() {
      torrentList.value.SortingRuleArray.push({
        name: '',
        backgroundColor: '#000',

      })
    }

    /**
     *  删除磁链规则
     */
    function deleteTorrentListRule(index: number) {
      torrentList.value.SortingRuleArray.splice(index, 1)
    }

    return {
      torrentList,
      addTorrentListRule,
      deleteTorrentListRule,
    }
  },

)

export default useTorrentListStore
