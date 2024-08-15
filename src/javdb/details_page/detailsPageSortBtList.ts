import { videoConfig } from '../../config'

/**
 *  磁链数组每一项的类型
 */
type ItemType = HTMLElement & {

  /**
   * 视频名称
   */
  videoName: string

  /**
   *  视频大小
   */
  videoSize: number
}

/**
 * 对详情页磁链列表进行排序
 */
export function sortBtList(): void {
  /**
   *  列表容器
   */
  const magnetsContent = document.getElementById('magnets-content')

  if (!magnetsContent || !magnetsContent.children.length) {
    return
  }

  /**
   *  磁链列表
   */
  const items = Array.from(magnetsContent.querySelectorAll('.columns')) as ItemType[]

  // 提取并设置 每一项的 视频大小 和 视频名称
  items.forEach((item: ItemType) => {
    const metaSpan = item.querySelector('.meta') as HTMLElement | null

    if (metaSpan && metaSpan.textContent) {
      const metaText = metaSpan.textContent.trim()

      const match = metaText.match(/(\d+(\.\d+)?)GB/)

      const size = match ? Number.parseFloat(match[1]) : 0

      item.videoSize = size

      item.videoName = item.querySelector('.name')?.textContent?.trim() as string
    }
  })

  // 如果返回 -1，表示 videoA 应该排在 videoB 前面
  // 如果返回 1，表示 videoA 应该排在 videoB 后面
  // 如果返回 0，表示 videoA 和 videoB 顺序不变

  items.sort((videoA: ItemType, videoB: ItemType) => {
    /**
     *   视频A在排序规则数组中的位置   （-1 代表不在数组中）
     */
    const indexA = videoConfig.torrentListSortingRuleArray.findIndex(rule => videoA.videoName.toLowerCase().includes(rule.name.toLowerCase()))

    /**
     *   视频B在排序规则数组中的位置   （-1 代表不在数组中）
     */
    const indexB = videoConfig.torrentListSortingRuleArray.findIndex(rule => videoB.videoName.toLowerCase().includes(rule.name.toLowerCase()))

    // 1.在规则数组中，按数组里关键词的顺序排序,如果关键词的顺序一样了,按文件大小排序

    // videoA在规则数组中 videoB不在规则数组中 则videoA应该排在videoB前面  应该返回 -1
    if (indexA !== -1 && indexB === -1)
      return -1

    //  videoA不在规则数组中 videoB在规则数组中 则videoB应该排在videoA前面  应该返回 1
    if (indexA === -1 && indexB !== -1)
      return 1

    //  videoA 和 videoB 都在规则数组中
    if (indexA !== -1 && indexB !== -1) {
      // 如果 关键词顺序一样，则按文件大小排序
      if (indexA === indexB) {
        //  如果 videoA 的 文件大小 大于 videoB 的文件大小，则应该返回 -1 将 videoA 排在 videoB 前面
        return videoA.videoSize > videoB.videoSize ? -1 : 1
      }
      else {
        //  如果 关键词顺序不一样，则按关键词顺序排序  从小到大
        return indexA < indexB ? -1 : 1
      }
    }

    // 2. 如果文件名是纯小写的，则属于第二大类，按文件大小排序
    const isLowerCaseA = /^[a-z0-9.-]+$/.test(videoA.videoName)

    const isLowerCaseB = /^[a-z0-9.-]+$/.test(videoB.videoName)

    //  如果 videoA 和 videoB 都是纯小写的，则按文件大小排序
    if (isLowerCaseA && isLowerCaseB) {
      //  如果 videoA 的 文件大小 大于 videoB 的文件大小，则应该返回 -1 将 videoA 排在 videoB 前面
      return videoA.videoSize > videoB.videoSize ? -1 : 1
    }

    //  如果 videoA 是纯小写的，videoB 是不是纯小写的 则将 videoA 排在 videoB 前面
    if (isLowerCaseA && !isLowerCaseB) {
      return -1
    }

    //  如果 videoA 是不是纯小写的，videoB 是纯小写的 则将 videoB 排在 videoA 前面
    if (!isLowerCaseA && isLowerCaseB) {
      return 1
    }

    // 3. 其他文件属于第三大类，按文件大小排序
    // 如果 videoA 的大小 大于 videoB 的大小，则应该返回 -1 将 videoA 排在 videoB 前面
    return videoA.videoSize > videoB.videoSize ? -1 : 1
  })

  // 清空列表
  magnetsContent.innerHTML = ''

  items.forEach((item) => {
    /**
     *   视频在排序规则数组中的位置   （-1 代表不在数组中）
     */
    const inSortingRuleArrayIndex = videoConfig.torrentListSortingRuleArray.findIndex(rule => item.videoName.toLowerCase().includes(rule.name.toLowerCase()))

    // 如果在规则数组中，则设置规则数组中定义的背景颜色
    if (inSortingRuleArrayIndex !== -1) {
      item.style.backgroundColor = videoConfig.torrentListSortingRuleArray[inSortingRuleArrayIndex].backgroundColor
    }

    item.classList.remove('item')
    magnetsContent.appendChild(item)
  })
}
