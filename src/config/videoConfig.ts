/**
 * 视频匹配配置
 */
export const videoConfig: VideoType.VideoConfig = {

  extensionArray: ['mp4', 'mkv', 'avi', 'flv', 'wmv', 'mov', 'rmvb'],

  tagArray: ['-破解-c', '-c', '-4K-破解', '-破解', '-4k'],

  tagRegex: undefined as any, // 初始化为 undefined，稍后在对象定义后设置

  torrentListRuleArray: [
    {
      name: '-UC.torrent.无码破解',
      backgroundColor: '#FF9F7F',
    },
    {
      name: '破解-c',
      backgroundColor: '#fca650',
    },
    {
      name: '-UC',
      backgroundColor: '#fca650',
    },
    {
      name: '-c',
      backgroundColor: '#FF4E88',
    },
    {
      name: '-C',
      backgroundColor: '#FF4E88',
    },
    {
      name: '4K-破解',
      backgroundColor: '#C75B7A',
    },
    {
      name: '4k',
      backgroundColor: '#C75B7A',
    },
    {
      name: '无码破解',
      backgroundColor: '#F0A8D0',
    },
    {
      name: '无码',
      backgroundColor: '#C63C51',
    },
    {
      name: 'torrent',
      backgroundColor: '#FF4E88',
    },
  ],
}

// 在对象定义后设置 tagRegex
videoConfig.tagRegex = new RegExp(videoConfig.tagArray.join('|'), 'gi')

export default videoConfig
