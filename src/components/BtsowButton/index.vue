<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type { CSSProperties } from 'vue'

import useSiteStore from '@/store/modules/site'

const props = defineProps({
  /**
   *  @description  视频名称
   */
  videoName: {
    type: String,
    required: true,
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

const siteStore = useSiteStore()

function btsowBtnHandler(event: MouseEvent) {
  event.preventDefault()

  siteStore.openBtsowSearch(props.videoName)
}
</script>

<template>
  <div
    class="group relative z-1 h-25 w-40 flex translate-x-0 cursor-pointer items-center justify-center overflow-hidden border-3 border-[#FF8400] bg-transparent text-lg font-bold before:absolute before:left-0 before:top-0 before:z-[-1] before:h-full before:w-full before:translate-x--100% !bg-white before:bg-[#FF8400] !text-[#2E2E2E] before:transition-all-600 before:content-[''] hover:before:translate-x-0 !hover:text-white"
    :class="props.class"
    :style="{
      borderRadius: `${radius}px`,
      height: typeof height === 'number' ? `${height}px` : `${height}`,
      width: typeof width === 'number' ? `${width}px` : `${width}`,
      ...style,
    }"
    @click="btsowBtnHandler"
  >
    <img
      :src="siteStore.site.btsow.logo"
      class="max-h-full max-w-full group-hover:hidden !object-contain"
    >

    <img
      :src="siteStore.site.btsow.logoHover"
      class="hidden max-h-full max-w-full !object-contain !group-hover:block"
    >
  </div>
</template>

<style lang="less" scoped>

</style>
