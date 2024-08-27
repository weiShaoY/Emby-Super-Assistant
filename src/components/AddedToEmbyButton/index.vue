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
    default: 0,
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

  /**
   *  是否换行
   */
  isWrap: {
    type: Boolean,
    default: false,
  },
})

const isShowCopy = ref(false)

/**
 *   视频目录结构
 */
const directoryPath = props.video.directoryPath.join('\\')

console.log('%c Line:79 🥥 props.video', 'color:#7f2b82', props.video)

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
  quickerConfig.openFolder(props.video.directoryPath.slice(0, -1).join('\\'))
}
</script>

<template>
  <!-- 详情页 -->
  <div
    v-if="!isWrap"
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
            <div
              class="m-b-1"
            >
              {{ video.resolution }}
            </div>

            <div
              class="text-[#e6683c] font-700"
            >
              {{ video.size }}
            </div>
          </div>

          <img
            v-for="item in video.tagArray"
            :key="item.url"
            :src="item.url"
            class="m-r-1 !h-5 !w-5 !rounded-0"
          >

          <!-- 复制 已复制 -->
          <div
            class="m-l-1"
          >
            <img
              v-if="!isShowCopy"
              :src="copySvg"
              class="!h-5 !w-5 !rounded-0"
              alt="复制"
            >

            <img
              v-if="isShowCopy"
              :src="finishSvg"
              class="!h-5 !w-5 !rounded-0"
              alt="已复制"
            >
          </div>
        </div>
      </div>
    </button>

    <!-- 详情页  悬浮层 -->
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
          class="m-b-1 flex flex-wrap items-center gap-3"
        >
          <img
            v-for="item in video.tagArray"
            :key="item.url"
            :src="item.url"
            class="m-r-1 !h-9 !w-9 !rounded-0"
          >
        </div>

        <div
          class="flex items-center justify-between text-white"
        >
          <div
            class="text-4 text-[#e6683c] font-700"
          >
            {{ video.size }}
          </div>

          <div>
            {{ video.resolution }}
          </div>
        </div>

        <div
          class="p-t-1 text-[#ccc]"
        >
          {{ directoryPath }}
        </div>
      </div>

    </div>
  </div>

  <!--  Javbus 列表页 -->
  <div
    v-else
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
      class="relative m-t-2 w-full cursor-pointer touch-manipulation border-none bg-transparent p-0 outline-offset-[4px] transition-filter duration-250 ease-in-out focus-visible:outline-none focus:outline-none hover:brightness-[110%]"
      @click="videoNameCopyToClipboard"
    >
      <span
        class="cubic-bezier-[.3,.7,.4,1] cubic-bezier-[.3,.7,.4,1.5] absolute left-0 top-0 h-full w-full translate-y-[2px] transform rounded-[12px] bg-black/25 shadow transition-transform duration-[250ms] duration-[34ms] duration-[600ms] will-change-transform active:translate-y-[1px] hover:translate-y-[4px] active:transition-transform hover:transition-transform"
      />

      <span
        class="edge absolute left-0 top-0 h-full w-full rounded-[12px] from-[hsl(167deg,65%,13%)] via-[hsl(340deg,100%,32%)] to-[hsl(167deg,65%,13%)] bg-gradient-to-l"
      />

      <div
        class="front cubic-bezier-[.3,.7,.4,1] cubic-bezier-[.3,.7,.4,1.5] relative block translate-y-[-4px] transform rounded-[12px] bg-[#219C90] p-x-3 p-y-2 transition-transform duration-[250ms] duration-[34ms] duration-[600ms] will-change-transform active:translate-y-[-2px] hover:translate-y-[-6px] !text-white active:transition-transform hover:transition-transform"
      >

        <div
          class="m-b-2 flex items-center"
        >
          <img
            v-for="item in video.tagArray"
            :key="item.url"
            :src="item.url"
            class="m-r-1 !h-6 !w-6 !rounded-0"
          >

        </div>

        <div
          class="m-b-1 text-start text-14px"
        >
          {{ video.baseName }}11111111111111111111111

        </div>

        <div
          class="flex items-center justify-between text-3"
        >
          <div
            class="text-[#e6683c] font-700"
          >
            {{ video.size }}

          </div>

          <div
            class=""
          >
            {{ video.resolution }}

          </div>

          <div>
            <img
              v-if="!isShowCopy"
              :src="copySvg"
              class="!h-5 !w-5 !rounded-0"
              alt="复制"
            >

            <img
              v-if="isShowCopy"
              :src="finishSvg"
              class="!h-5 !w-5 !rounded-0"
              alt="已复制"
            >
          </div>
        </div>

      </div>
    </button>

    <!--  Javbus 列表页  悬浮层 -->
    <div
      class="absolute bottom-[100%] w-full origin-left scale-0 cursor-pointer select-text rounded-lg bg-#fff p-x-2 p-y-2 transition-all duration-300 ease-in-out group-hover:scale-100"
      :style="{
        boxShadow: 'inset 20px 20px 8px #bebebe, inset -20px -20px 8px #ffffff',
      }"
      @click="directoryStructureCopyToClipboard"
    >
      <div
        class="border border-#52382f rounded-3 bg-#2a2b2f p-2"
      >
        <div
          class="flex justify-between"
        >

          <div
            class="flex flex-wrap items-center gap-2"
          >
            <img
              v-for="item in video.tagArray"
              :key="item.url"
              :src="item.url"
              class="!h-8 !w-8 !rounded-0"
            >
          </div>

        </div>

        <div
          class="flex justify-between text-white"
        >
          <div
            class="text-4 text-#e6683c font-700"
          >
            {{ video.size }}
          </div>

          <div>
            {{ video.resolution }}

          </div>
        </div>

        <div
          class="break-all p-t-1 text-3 text-#ccc lh-4"
        >
          {{ directoryPath }}
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="less" scoped></style>
