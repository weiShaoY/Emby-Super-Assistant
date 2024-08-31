import btsowSvg from '@/assets/svg/web/btsow.svg'

export const btsow = {
  icon: btsowSvg,

  iconHover: btsowSvg,

  name: 'Btsow',

  url: 'https://btsow.com',

  /**
   *  在Javdb搜索当前影片
   */
  search: (videoName: string) => {
    window.open(`${btsow.url}/search/${videoName}`, '_blank')
  },
}

export default btsow
