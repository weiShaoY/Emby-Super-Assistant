import btsowSvg from '@/assets/svg/site/btsow.svg'

export const btsow = {
  icon: btsowSvg,

  iconHover: btsowSvg,

  name: 'Btsow',

  url: 'https://btsow.com',

  /**
   *  在Javdb搜索当前视频
   */
  search: (videoName: string) => {
    window.open(`${btsow.url}/search/${videoName}`, '_blank')
  },
}

export default btsow
