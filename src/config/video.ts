import fourKSvg from '../assets/svg/tag/fourK.svg'

import wuMaSvg from '@/assets/svg/tag/wuMa.svg'

import ziMuSvg from '@/assets/svg/tag/ziMu.svg'

import poJieSvg from '@/assets/svg/tag/poJie.svg'

import liuChuSvg from '@/assets/svg/tag/liuChu.svg'

/**
 * 视频匹配配置
 */
export const video: VideoType.VideoConfig = {
  extensionArray: ['mp4', 'mkv', 'avi', 'flv', 'wmv', 'mov', 'rmvb'],

  tagArray: [
    {
      name: ['4K'],
      url: fourKSvg,
    },
    {
      name: ['-c', '-C', '_ch', '-UC'],
      url: ziMuSvg,
    },
    {
      name: ['无码'],
      url: wuMaSvg,
    },
    {
      name: ['破解'],
      url: poJieSvg,
    },
    {
      name: ['流出'],
      url: liuChuSvg,
    },
  ],

  tagRegex: undefined as any, // 初始化为 undefined，稍后在对象定义后设置

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
