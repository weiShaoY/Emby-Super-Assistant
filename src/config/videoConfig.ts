import fourK from '@/assets/svg/fourK.svg'

import chineseSvg from '@/assets/svg/chinese.svg'

import hdSvg from '@/assets/svg/hd.svg'

/**
 * 视频匹配配置
 */
export const videoConfig: VideoType.VideoConfig = {

  extensionArray: [
    'mp4',
    'mkv',
    'avi',
    'flv',
    'wmv',
    'mov',
    'rmvb',
  ],

  tagArray: [
    {
      name: '4k',
      url: fourK.toString(),
    },
    {
      name: '-c',
      url: chineseSvg,
    },
    {
      name: '-C',
      url: chineseSvg,
    },
    {
      name: '无码',
      url: 'https://vitejs.dev/logo.svg',
    },
    {
      name: '破解',
      url: 'https://vitejs.dev/logo.svg',
    },
  ],

  tagRegex: undefined as any, // 初始化为 undefined，稍后在对象定义后设置

  torrentListSortingRuleArray: [
    {
      name: '-UC.torrent.无码破解',
      backgroundColor: '#03AED2',
    },
    {
      name: '破解-c',
      backgroundColor: '##00BFFF',
    },
    {
      name: '-UC',
      backgroundColor: '#fca650',
    },

    {
      name: '-c',
      backgroundColor: '#FF1493',
    },
    {
      name: '-C.torrent',
      backgroundColor: '#FF6347',
    },
    {
      name: '-C',
      backgroundColor: '#1A4D2E',
    },
    {
      name: 'ch',
      backgroundColor: '#00FFFF',
    },
    {
      name: 'ThZu.Cc',
      backgroundColor: '#FF4900',

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
      backgroundColor: '#F4CE14',
    },
    {
      name: '无码',
      backgroundColor: '#95D2B3',
    },
    {
      name: 'torrent',
      backgroundColor: '#006989',
    },
  ],

}

// 在对象定义后设置 tagRegex
videoConfig.tagRegex = new RegExp(
  videoConfig.tagArray.map(tag => tag.name).join('|'),
  'gi',
)

export default videoConfig
