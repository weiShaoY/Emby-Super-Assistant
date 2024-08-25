<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type { CSSProperties } from 'vue'

import { Message } from '@arco-design/web-vue'

import copySvg from '@/assets/svg/copy.svg'

import finishSvg from '@/assets/svg/finish.svg'

import { quickerConfig } from '@/config'

import { GM_setClipboard } from '$'

const props = defineProps({
  /**
   *   视频
   */
  video: {
    type: Object as () => VideoType.Video,
    required: true,
  },

  /**
   *  按钮宽度
   */
  width: {
    type: [String, Number],
    default: '',
  },

  /**
   *  按钮高度
   */
  height: {
    type: [String, Number],
    default: '',
  },

  /**
   *  圆角
   */
  radius: {
    type: [String, Number],
    default: 10,
  },

  /**
   *  按钮类名
   */
  class: {
    type: String,
    default: '',
  },

  /**
   *  按钮样式
   */
  style: {
    type: Object as () => CSSProperties,
    default: () => ({}),
  },
})

const isShowCopy = ref(false)

/**
 *   视频目录结构
 */
// const directoryPath = props.video.directoryPath.join('\\')

const directoryPath = props.video.directoryPath.slice(0, -1).join('\\')

/**
 *   视频名称复制到 剪切板
 */
function videoNameCopyToClipboard(event: any) {
  event.preventDefault()

  // 复制到剪切板
  GM_setClipboard(props.video.processedName, 'text')

  Message.success('视频名称 已复制到剪切板')

  isShowCopy.value = !isShowCopy.value
}

/**
 *  视频位置复制到 剪切板
 */
function directoryStructureCopyToClipboard(event: any) {
  event.stopPropagation()
  event.preventDefault()

  // GM_setClipboard(videoDirectoryStructure, 'text')

  // Message.success('视频位置 已复制到剪切板')

  //  通过 Quicker打开文件夹
  quickerConfig.openFolder(directoryPath)
}
</script>

<template>
  <div
    class="group relative z-1000 m-x-auto m-t-2 w-[95%]"
    :class="props.class"
    :style="{
      borderRadius: `${radius}px`,
      height: typeof height === 'number' ? `${height}px` : `${height}`,
      width: typeof width === 'number' ? `${width}px` : `${width}`,
      ...style,
    }"
  >
    <button
      class="relative w-full cursor-pointer touch-manipulation border-none bg-transparent p-0 outline-offset-[4px] transition-filter duration-250 ease-in-out focus-visible:outline-none focus:outline-none hover:brightness-[110%]"
      @click="videoNameCopyToClipboard"
    >
      <span
        class="cubic-bezier-[.3,.7,.4,1] cubic-bezier-[.3,.7,.4,1.5] absolute left-0 top-0 h-full w-full translate-y-[2px] transform rounded-[12px] bg-black/25 shadow transition-transform duration-[250ms] duration-[34ms] duration-[600ms] will-change-transform active:translate-y-[1px] hover:translate-y-[4px] active:transition-transform hover:transition-transform"
      />

      <span
        class="edge absolute left-0 top-0 h-full w-full rounded-[12px] from-[hsl(167deg,65%,13%)] via-[hsl(340deg,100%,32%)] to-[hsl(167deg,65%,13%)] bg-gradient-to-l"
      />

      <div
        class="front cubic-bezier-[.3,.7,.4,1] cubic-bezier-[.3,.7,.4,1.5] relative block flex translate-y-[-4px] transform items-center justify-between rounded-[12px] bg-[#219C90] p-[12px_27px] text-[1.1rem] transition-transform duration-[250ms] duration-[34ms] duration-[600ms] will-change-transform active:translate-y-[-2px] hover:translate-y-[-6px] !text-white active:transition-transform hover:transition-transform"
      >
        <span
          class="flex-1 truncate text-start"
        >
          {{ video.baseName }}
        </span>

        <div
          class="flex-center"
        >
          <div
            class="m-r-2 flex flex-col text-3"
          >
            <span
              class="m-b-1"
            >
              {{ video.resolution }}
            </span>

            <span>
              {{ video.size }}
            </span>
          </div>

          <img
            v-for="item in video.tagArray"
            :key="item.url"
            :src="item.url"
            class="m-r-1 !h-5 !w-5 !rounded-0"
            alt="复制"
          >

          <img
            v-if="!isShowCopy"
            :src="copySvg"
            class="!h-5 !w-5"
            alt="复制"
          >

          <img
            v-if="isShowCopy"
            :src="finishSvg"
            class="!h-5 !w-5"
            alt="已复制"
          >
        </div>
      </div>
    </button>

    <div
      class="absolute bottom-[110%] w-full origin-left scale-0 cursor-pointer select-text rounded-lg bg-#fff px-3 py-2 transition-all duration-300 ease-in-out group-hover:scale-100"
      :style="{
        boxShadow: 'inset 20px 20px 8px #bebebe, inset -20px -20px 8px #ffffff',
      }"
      @click="directoryStructureCopyToClipboard"
    >
      <div
        class="border border-[#52382f] rounded-3 bg-[#2a2b2f] p-3"
      >
        <div
          class="flex justify-between"
        >

          <div
            class="flex items-center gap-3"
          >
            <img
              v-for="item in video.tagArray"
              :key="item.url"
              :src="item.url"
              class="m-r-1 !h-9 !w-9 !rounded-0"
            >
          </div>

          <div
            class="flex flex-col items-end gap-0 text-white"
          >
            <div
              class="text-4 text-[#e6683c] font-700"
            >
              {{ video.size }}
              <!-- {{ video.resolution }} -->
            </div>

            <div>
              <!-- {{ video.size }} -->
              {{ video.resolution }}

            </div>
          </div>
        </div>

        <div
          class="pt-[5px] text-[#ccc]"
        >
          {{ directoryPath }}
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="less" scoped></style>
