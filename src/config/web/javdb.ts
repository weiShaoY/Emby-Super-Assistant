import javdbSvg from '@/assets/svg/web/javdb.svg'

export const javdb = {
  icon: javdbSvg,

  name: 'JavDB',

  url: 'https://javdb.com/',

  /**
   *  在Javdb搜索当前视频
   */
  search: (videoName: string) => {
    window.open(`${javdb.url}/search?q=${videoName}&f=all`, '_blank')
  },
}

export default javdb
