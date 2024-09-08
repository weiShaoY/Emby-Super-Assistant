<!-- eslint-disable vue/require-prop-comment -->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue' // 导入 Vue 的相关钩子函数

import { handleFetch, handleFetchJavBle } from './utils/xhr' // 导入数据获取的方法

import subtitleSvg from '@/assets/svg/tag/subtitle.svg'

import noCodeSvg from '@/assets/svg/tag/noCode.svg'

const props = defineProps({
  /**
   *  站点项
   */
  siteItem: {
    type: Object as () => OnlinePlayType.SiteItem,
    required: true,

  }, /**
      *   视频 CODE
      */
  code: {
    type: String,
    required: true,
  },
})

/**
 *  计算格式化后的 CODE，如果有 codeFormater 函数则使用它格式化
 */
const formatCode = computed(() => {
  return props.siteItem.codeFormater ? props.siteItem.codeFormater(props.code) : props.code
})

/**
 *  计算替换了占位符后的链接s
 */
const link = computed(() => {
  return props.siteItem.url.replace('{{code}}', formatCode.value)
})

/**
 *  定义组件的状态，使用 ref 创建响应式对象
 */
const status = ref({
  /**
   *  请求状态
   */
  isSuccess: 'pedding',

  /**
   *   是否有字幕
   */
  hasSubtitle: false,

  /**
   *   是否有泄露
   */
  hasLeakage: false,

  /**
   *   目标链接
   */
  targetLink: '',
})

/**
 *  计算最终的链接，如果有目标链接则使用它，否则使用原始链接
 */
const finalLink = computed(() => {
  return status.value.targetLink === '' ? link.value : status.value.targetLink
})

// 定义一个异步函数来获取数据
async function fetchData() {
  // 根据站点名称选择不同的获取方法
  const fetchMethod = props.siteItem.name === 'Jable' ? handleFetchJavBle : handleFetch

  // 调用获取方法并更新状态
  const res = await fetchMethod(props.siteItem, link.value, formatCode.value)

  // 更新状态对象
  status.value = {
    isSuccess: res.isSuccess ? 'fulfilled' : 'rejected', // 根据请求结果更新状态
    hasSubtitle: res.hasSubtitle, // 更新字幕信息
    hasLeakage: res.hasLeakage, // 更新泄露信息
    targetLink: res.targetLink, // 更新目标链接
  }
}

/**
 *  背景颜色
 */
const bgColor = computed(() => {
  return status.value.isSuccess === 'pedding'
    ? ''
    : status.value.isSuccess === 'fulfilled'
      ? '#67c23a'
      : '#FF1166'
})

onMounted(fetchData)

function go() {
  window.open(finalLink.value, '_blank')
}

/**
 *  跳转到站点主页
 */
function openSiteHomepage(siteItem: OnlinePlayType.SiteItem) {
  /**
   *  添加协议
   */
  const fullUrl = `https://${siteItem.hostname}`

  window.open(fullUrl, '_blank')
}
</script>

<template>
  <div
    class="group relative flex flex-center cursor-pointer justify-center rounded-2"
  >
    <div
      class="h-14 w-auto flex items-center gap-1 border-1 rounded-2 bg-white p-x-1"
      :style="{
        border: `4px solid ${bgColor}`,
      }"
      @click="go"
    >
      <img
        v-if="status.hasSubtitle"
        :src="subtitleSvg"
        class="h-6 w-6"
      >

      <img
        v-if="status.hasLeakage"
        :src="noCodeSvg"
        class="h-6 w-6"
      >

      <div
        class="m-x-2 w-auto text-dark font-600"
      >

        <img
          v-if="siteItem.icon"
          :src="siteItem.icon"
          class="!h-10 !min-h-10 !min-w-10 !w-10"
        >

        <span
          v-else
        >
          {{ siteItem.name }}
        </span>

      </div>
    </div>

    <span
      class="absolute left-1/2 z-20 scale-0 transform rounded-lg bg-gray-900 p-x-4 p-y-2 text-sm text-white font-bold shadow-lg transition-transform duration-300 ease-in-out -top-9 -translate-x-1/2 group-hover:scale-100"
      :style="{
        backgroundColor: `${bgColor}`,
      }"
      @click="openSiteHomepage(siteItem)"
    >
      {{ siteItem.name }}
    </span>
  </div>
</template>

<style lang="less" scoped>

</style>
