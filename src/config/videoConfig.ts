/**
 *  视频匹配配置
 */
export const videoConfig = {
  /**
   *   视频扩展名数组（注意：这个数组在 `tagRegex` 的定义中并未直接使用）
   */
  extensionArray: ['mp4', 'mkv', 'avi', 'flv', 'wmv', 'mov', 'rmvb'],

  /**
   *  视频标签名数组
   */
  tagArray: ['-破解-c', '-c', '-4K-破解', '-破解', '-4k'],

  /**
   *  视频标签匹配正则（注意：这里使用 `tagArray`）
   */
  tagRegex: undefined as any, // 初始化为 null，稍后在对象定义后设置

  /**
   *  视频排序规则数组
   */
  sortingRuleArray: [
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
      name: 'c',
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
  ],
}

// 在对象定义后设置 tagRegex
videoConfig.tagRegex = new RegExp(videoConfig.tagArray.join('|'), 'gi')

export default videoConfig
