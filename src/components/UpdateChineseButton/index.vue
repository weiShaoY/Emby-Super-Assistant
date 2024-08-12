<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type { CSSProperties } from 'vue'

const props = defineProps({

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
    default: () => ({
    }),
  },

})
</script>

<template>
  <button
    role="button"
    class="tag golden-button relative box-border inline-block cursor-pointer select-none border border-[#a55d07] rounded-[0.3em] bg-[length:100%_100%] bg-[linear-gradient(160deg,#a54e07,#b47e11,#fef1a2,#bc881b,#a54e07)] bg-center p-[0_1em] text-[1em] leading-[2.5em] uppercase shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(110,80,20,0.4),inset_0_-2px_5px_1px_rgba(139,66,8,1),inset_0_-1px_1px_3px_rgba(250,227,133,1)] transition-all duration-200 ease-in-out hover:border-[rgba(165,93,7,0.6)] hover:bg-[length:150%_150%] !text-[rgb(120,50,5)] hover:text-[rgba(120,50,5,0.8)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23),inset_0_-2px_5px_1px_#b17d10,inset_0_-1px_1px_3px_rgba(250,227,133,1)]"
    :class="props.class"
    :style="{
      borderRadius: `${radius}px`,
      height: typeof height === 'number' ? `${height}px` : `${height}`,
      width: typeof width === 'number' ? `${width}px` : `${width}`,
      ...style,
    }"
  >
    <span
      class="golden-text"
    >
      可更新中文磁链
    </span>
  </button>
</template>

<style lang="less" scoped>

</style>
