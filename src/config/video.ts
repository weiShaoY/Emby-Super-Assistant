import chineseSvg from '@/assets/svg/chinese.svg'

import hdSvg from '@/assets/svg/hd.svg'

import noCodeSvg from '@/assets/svg/noCode.svg'

import fourKSvg from '@/assets/svg/fourK.svg'

import crackingSvg from '@/assets/svg/cracking.svg'

/**
 * 视频匹配配置
 */
export const video: VideoType.VideoConfig = {
  extensionArray: ['mp4', 'mkv', 'avi', 'flv', 'wmv', 'mov', 'rmvb'],

  tagArray: [
    {
      name: ['4K'],
      url: fourKSvg.toString(),
    },
    {
      name: ['-c', '-C', '_ch'],
      url: chineseSvg,
    },
    {
      name: ['无码'],
      url: noCodeSvg,
    },
    {
      name: ['破解'],
      url: crackingSvg,
    },
  ],

  tagRegex: undefined as any, // 初始化为 undefined，稍后在对象定义后设置

  torrentListSortingRuleArray: [
    {
      name: '-UC.torrent.无码破解',
      backgroundColor: '#00FFFF',
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
      backgroundColor: '#FF6347',
    },
    {
      name: '-C.torrent',
      backgroundColor: '#FF1166',
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
      backgroundColor: '#DDDD22',
    },
    {
      name: '无码',
      backgroundColor: '#95D2B3',
    },

    // {
    //   name: 'torrent',
    //   backgroundColor: '#006989',
    // },
  ],
}

// 在对象定义后设置 tagRegex
video.tagRegex = new RegExp(
  video.tagArray
    .flatMap(tag => tag.name)
    .map(name => name.includes('-')
      ? name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
      : `-?${name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}`, // 对于不包含 `-` 的情况，添加可选的 `-`
    )
    .join('|'),
  'gi',
)

export default video
