<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'

import { config } from '@/config'

const props = defineProps({

  /**
   *  挂载点
   */
  to: {
    type: String,
    required: true,
  },

  /**
   *  种子列表
   */
  torrentList: {
    type: Array as PropType<TorrentType[]>,
    default: (): TorrentType[] => [],
  },

  /**
   *  滚动的目标元素
   */
  scrollTarget: {
    type: String,
    default: '',
  },
})

const torrentList = ref<TorrentType[]>(props.torrentList)

/**
 *  有中文字幕的数量
 */
const chineseCount = computed(() =>

  props.torrentList.filter(item => /-c|-C|_ch/.test(item.name)).length,

)

/**
 *  复制种子链接
 */
function copyTorrentUrl(torrent: TorrentType) {
  GM_setClipboard(torrent.url, 'text')
  Message.success(`${torrent.name} 已复制到剪切板`)
}

async function main() {
  /**
   * 设置背景颜色和标签
   */
  torrentList.value = torrentList.value.map((torrent: TorrentType) => {
    const inSortingRuleArrayIndex = config.torrentList.SortingRuleArray.findIndex(rule =>
      torrent.name.includes(rule.name),
    )

    // 初始化一个新的对象，用于存储可能的更新
    const updatedTorrent = { ...torrent }

    // 如果找到匹配的背景颜色规则，设置 backgroundColor
    if (inSortingRuleArrayIndex !== -1) {
      updatedTorrent.backgroundColor = config.torrentList.SortingRuleArray[inSortingRuleArrayIndex].backgroundColor
    }

    // 返回更新后的对象
    return updatedTorrent
  })

  torrentList.value.sort((videoA: TorrentType, videoB: TorrentType) => {
  /**
   *   视频A在排序规则数组中的位置   （-1 代表不在数组中）
   */
    const indexA = config.torrentList.SortingRuleArray.findIndex(rule => videoA.name.includes(rule.name))

    /**
     *   视频B在排序规则数组中的位置   （-1 代表不在数组中）
     */
    const indexB = config.torrentList.SortingRuleArray.findIndex(rule => videoB.name.includes(rule.name))

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
        return videoA.size > videoB.size ? -1 : 1
      }
      else {
        //  如果 关键词顺序不一样，则按关键词顺序排序  从小到大
        return indexA < indexB ? -1 : 1
      }
    }

    // 2. 如果文件名是纯小写的，则属于第二大类，按文件大小排序
    const isLowerCaseA = /^[a-z0-9.-]+$/.test(videoA.name)

    const isLowerCaseB = /^[a-z0-9.-]+$/.test(videoB.name)

    //  如果 videoA 和 videoB 都是纯小写的，则按文件大小排序
    if (isLowerCaseA && isLowerCaseB) {
      //  如果 videoA 的 文件大小 大于 videoB 的文件大小，则应该返回 -1 将 videoA 排在 videoB 前面
      return videoA.size > videoB.size ? -1 : 1
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
    return videoA.size > videoB.size ? -1 : 1
  })
}

function scrollToElement() {
  //  如果配置 详情页 不 滚动，则直接返回
  if (!config.torrentList.isScrollToCurrentPosition) {
    return
  }

  const offset = -200 // 向上偏移量

  if (props.scrollTarget) {
    const element = document.querySelector(props.scrollTarget)

    if (element) {
      // element.scrollIntoView({ behavior: 'smooth' })

      const elementPosition = element.getBoundingClientRect().top + window.scrollY

      window.scrollTo({
        top: elementPosition + offset,
        behavior: 'smooth',
      })
    }
  }
  else {
    //  滚动到 to
    const element = document.querySelector(props.to)

    if (element) {
      // element.scrollIntoView({ behavior: 'smooth' })

      const elementPosition = element.getBoundingClientRect().top + window.scrollY

      window.scrollTo({
        top: elementPosition + offset,
        behavior: 'smooth',
      })
    }
  }
}

main()

scrollToElement()
</script>

<template>
  <Teleport
    :to="props.to"
  >
    <div
      class="mx-auto w-full border rounded-md bg-white p-6 pb-1"
    >
      <div
        class="flex flex-wrap items-center justify-between -m-2"
      >

        <div
          class="flex-center text-4 font-600 text-stroke-black"
        >

          <span>
            共
          </span>

          <span
            class="m-x-2 text-6 text-#000 font-700"
          >
            {{ torrentList.length }}
          </span>

          <span>
            部
          </span>
        </div>

        <div
          v-if="chineseCount"
          class="flex-center text-4 text-#F59E0B font-600"
        >
          <span
            class="m-x-2 text-6 text-#FF8400 font-700"
          >
            {{ chineseCount }}
          </span>

          <span>
            部有中文字幕
          </span>
        </div>

      </div>

      <div
        class="m-y-5"
      >
        <!-- # -----------------------------------------------  列表循环  Start  ------------------------------------------------->
        <div
          v-for="(torrent, index) in torrentList"
          :key="index"
        >
          <div
            class="group relative z-0 h-[6em] flex cursor-pointer items-center justify-between overflow-hidden rounded-[1em] p-2"
            :style="{
              backgroundColor: torrent.backgroundColor,
              // color: torrent.backgroundColor ? '#fff' : '#000',
              // boxShadow: `2px 2px 35px ${torrent.backgroundColor} inset`,
            }"
          >
            <!-- 悬浮动画 -->
            <div
              class="absolute z-[-1] h-[5em] w-[5em] rounded-full duration-500 -left-[4.5em] -top-[4.5em] group-hover:scale-[4500%]"
              :style="{
                // background: 'linear-gradient(to right,#00DFA2,#ADFF2F)',
                background: 'linear-gradient(to right,#2233AA,#ADFF2F)',
              }"
            />

            <!-- 左边 -->
            <div
              class="flex items-center"
            >
              <!-- 左边第一列  磁链名称 -->
              <div
                class="w-100 p-2"
              >
                <div
                  class="truncate text-4 font-700 group-hover:text-#fff"
                  :style="{
                    color: torrent.backgroundColor ? '#fff' : '#000',
                  }"
                >
                  {{
                    torrent.name
                  }}
                </div>

                <div
                  class="m-t-1 text-3 font-600 !group-hover:text-#fff"
                  :style="{
                    color: torrent.backgroundColor ? '#fff' : '#9CA3AF',
                  }"
                >
                  {{
                    torrent.time
                  }}
                </div>
              </div>

              <!-- 左边第二列 文件大小 -->
              <div
                class="m-l-3 w-30 group-hover:text-#fff"
              >
                <span
                  v-if="torrent.size"
                  class="text-4 font-700"
                >
                  {{
                    torrent.size
                  }}
                </span>

                <span
                  v-if="torrent.size"
                  class="font-600"
                >
                  GB
                </span>
              </div>

              <!-- 左边第三列  图标 -->
              <div
                v-for="tag in torrent.tagArray"
                :key="tag.name"
                class="p-x-3"
              >
                <img
                  :src="tag.url"
                  :alt="tag.name"
                  class="h-8 w-8"
                >
              </div>

            </div>

            <!-- 右边 -->
            <div
              class="w-auto p-2"
            >

              <button
                class="cursor-pointer rounded from-[#EB3349] to-[#F45C43] bg-gradient-to-r px-3 py-2 text-white font-semibold shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] transition-shadow focus:shadow-[inset_-12px_-8px_40px_#46464620] hover:shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-10px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]"
                @click="copyTorrentUrl(torrent)"
              >
                复制
              </button>
            </div>
          </div>

          <div
            v-if="torrentList.length === 1 || (torrentList.length > 1 && index !== torrentList.length - 1)"
            class="m-y-2 h-[1px] rounded bg-#9CA3AF"
          >
            <!-- 分割线 -->
            <!-- torrentList.length === 1：当 torrentList 长度为 1 时显示分割线 -->
            <!-- torrentList.length > 1 && index !== torrentList.length - 1：当 torrentList 长度大于 1 且不是最后一个元素时显示分割线 -->
          </div>

        </div>
        <!-- # -----------------------------------------------  列表循环  End  ------------------------------------------------->

      </div>
    </div>
  </Teleport>
</template>

<style lang="less" scoped>

</style>
