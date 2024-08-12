<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'

import { videoConfig } from '../../config'

import hdSvg from '@/assets/svg/hd.svg'

import chineseSvg from '@/assets/svg/chinese.svg'

const props = defineProps({
  /**
   *  种子列表
   */
  torrentList: {
    type: Array as PropType<TorrentType[]>,
    default: (): TorrentType[] => [],
  },
})

const torrentList = ref<TorrentType[]>(props.torrentList)

/**
 *  有中文字幕的数量
 */
const chineseCount = computed(() =>
  props.torrentList.reduce((count, torrent) => count + (torrent.isChinese ? 1 : 0), 0),
)

/**
 *  复制种子链接
 */
function copyTorrentUrl(torrent: TorrentType) {
  GM_setClipboard(torrent.url, 'text')
  Message.success(`${torrent.name} 已复制到剪切板`)
}

async function main() {
  torrentList.value = torrentList.value.map((torrent: TorrentType) => {
    const inSortingRuleArrayIndex = videoConfig.sortingRuleArray.findIndex(rule =>
      torrent.name.toLowerCase().includes(rule.name.toLowerCase()),
    )

    if (inSortingRuleArrayIndex !== -1) {
      return {
        ...torrent,
        backgroundColor: videoConfig.sortingRuleArray[inSortingRuleArrayIndex].backgroundColor,
      }
    }

    return torrent
  })

  torrentList.value.sort((videoA: TorrentType, videoB: TorrentType) => {
  /**
   *   视频A在排序规则数组中的位置   （-1 代表不在数组中）
   */
    const indexA = videoConfig.sortingRuleArray.findIndex(rule => videoA.name.toLowerCase().includes(rule.name.toLowerCase()))

    /**
     *   视频B在排序规则数组中的位置   （-1 代表不在数组中）
     */
    const indexB = videoConfig.sortingRuleArray.findIndex(rule => videoB.name.toLowerCase().includes(rule.name.toLowerCase()))

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

main()
</script>

<template>
  <div
    class="w-full"
  >
    <div
      class="mx-auto container"
    >
      <div
        class="shadow-dashboard mx-auto border rounded-md bg-white p-6 pb-1"
      >
        <div
          class="mb-1 flex flex-wrap items-center justify-between -m-2"
        >
          <div
            class="w-auto p-2"
          >
            <div
              class="text-lg text-coolGray-900 font-semibold"
            >
              共 {{ torrentList.length }} 部
            </div>

            <div
              v-if="chineseCount"
              class="m-t-1 text-xs text-coolGray-500 font-medium"
            >
              <span
                class="text-4 font-bold"
              >
                {{ chineseCount }}
              </span>

              <span>
                部有中文字幕
              </span>
            </div>
          </div>

          <div
            class="w-auto p-2"
          >
            <a
              href="#"
              class="text-sm text-green-500 font-semibold hover:text-green-600"
            >
              See all
            </a>
          </div>
        </div>

        <div
          class="flex flex-wrap"
        >
          <div
            v-for="(torrent, index) in torrentList"
            :key="index"
            class="group relative z-0 h-[6em] w-full flex cursor-pointer items-center justify-between overflow-hidden border-b-1 rounded-[1em] p-2 !m-b-3"
            :style="{
              'background-color': torrent.backgroundColor,

              'color': torrent.backgroundColor ? 'white' : 'black',
            }"
          >
            <div
              class="absolute z-[-1] h-[5em] w-[5em] rounded-full bg-[#00ddeb] duration-500 -left-[4.5em] -top-[4.5em] group-hover:scale-[4500%]"
            />

            <div
              class="flex items-center"
            >
              <!-- 左边第一列 -->
              <div
                class="w-100 p-2"
              >
                <div
                  class="truncate text-4 font-bold"
                >
                  {{
                    torrent.name
                  }}
                </div>

                <div
                  class="text-xs text-coolGray-400 font-medium"
                >
                  {{
                    torrent.time
                  }}
                </div>
              </div>

              <!-- 左边第二列 -->
              <div
                class="m-l-3 w-30"
              >
                <span
                  class="text-4 font-bold"
                >
                  {{
                    torrent.size
                  }}
                </span>

                <span>
                  GB
                </span>
              </div>

              <!-- 左边第三列 -->
              <div
                v-if="torrent.isChinese"
                class="w-auto p-2"
              >
                <img
                  :src="chineseSvg"
                  alt="高清"
                  class="h-6 w-6"
                >
              </div>

              <!-- 左边第四列 -->
              <div
                v-if="torrent.isHD"
                class="w-auto p-2"
              >
                <img
                  :src="hdSvg"
                  alt="高清"
                  class="h-6 w-6"
                >

              </div>
            </div>

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

        </div>
      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>
// .item {
//   background-color: #fff;
//   &:hover {
//     color: #fff;
//     background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
//   }
// }
</style>
