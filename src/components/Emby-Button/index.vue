<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type { CSSProperties } from 'vue'

import useSiteStore from '@/store/modules/site'

import useEmbyStore from '@/store/modules/emby'

const props = defineProps({
  /**
   *  @description  视频名称
   */
  videoName: {
    type: String,
    required: true,
  },

  /**
   *  是否显示视频名称
   */
  isShowVideoName: {
    type: Boolean,
    default: false,
  },

  /**
   *  按钮宽度
   */
  width: {
    type: [String, Number],
    default: '100%',
  },

  /**
   *  按钮高度
   */
  height: {
    type: [String, Number],
    default: '100%',
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
    default: () => ({
    }),
  },

})

const embyStore = useEmbyStore()

const sizeStore = useSiteStore()

function embyBtnHandler(event: MouseEvent) {
  event.preventDefault()

  embyStore.embySearch(props.videoName)
}
</script>

<template>
  <div
    class="group relative z-1 h-25 w-40 flex translate-x-0 cursor-pointer items-center justify-center overflow-hidden border-3 border-[#52B54B] bg-transparent p-x-1 text-lg font-bold before:absolute before:left-0 before:top-0 before:z-[-1] before:h-full before:w-full before:translate-x--100% !bg-white before:bg-[#52B54B] !text-[#52B54B] before:transition-all-600 before:content-[''] hover:before:translate-x-0 !hover:text-white"
    :class="props.class"
    :style="{
      borderRadius: `${radius}px`,
      height: typeof height === 'number' ? `${height}px` : `${height}`,
      width: typeof width === 'number' ? `${width}px` : `${width}`,
      ...style,
    }"
    @click="embyBtnHandler"
  >
    <span
      v-if="isShowVideoName"
    >
      {{ videoName }}
    </span>

    <div
      v-else
      class="m-x-auto h-full"
    >
      <img
        :src="sizeStore.site.emby.logo"
        class="max-h-full max-w-full object-contain group-hover:hidden"
      >

      <img
        :src="sizeStore.site.emby.logoHover"
        class="hidden max-h-full max-w-full object-contain !group-hover:block"
      >
    </div>
  </div>
</template>

<style lang="less" scoped></style>
