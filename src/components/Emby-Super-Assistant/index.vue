<!------------------------------------  设置按钮  ------------------------------------------------->
<script lang="ts" setup>
import SettingModal from './setting_modal/index.vue'

import QueryDuplicateModal from './query_duplicate_modal/index.vue'

import LogoSvg from '@/assets/logo.svg'

import SettingSvg from '@/assets/svg/setting.svg'

import QueryDuplicateSvg from '@/assets/svg/queryDuplicate.svg'

/**
 *  是否显示设置弹窗
 */
const isShowSettingModal = ref(false)

/**
 *  是否显示查重弹窗
 */
const isShowQueryDuplicateModal = ref(false)
</script>

<template>
  <SettingModal
    v-if="isShowSettingModal"
    v-model="isShowSettingModal"
  />

  <QueryDuplicateModal
    v-if="isShowQueryDuplicateModal"
    v-model="isShowQueryDuplicateModal"
  />

  <button
    class="group fixed bottom-40 left-5 h-20 w-20 inline-flex overflow-visible border-2 border-white/90 rounded-full bg-[linear-gradient(#CBCBCB,#e9e9e9_50%,#fff)] p-2 transition-all duration-300"
  >

    <div
      class="h-full w-full overflow-hidden rounded-full bg-[linear-gradient(to_top,#ececec,#fff)] p-1 shadow-[0_0_1px_rgba(0,0,0,0.07),0_0_1px_rgba(0,0,0,0.05),0_3px_3px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.12)] duration-300 hover:shadow-none"
    >
      <div
        class="black h-full w-full inline-flex items-center justify-center gap-4 gap-x-0.5 gap-y-0.5 overflow-hidden rounded-full bg-[linear-gradient(#f4f4f4,#fefefe)] text-[18px] text-xl text-[#101010] font-medium duration-200 group-hover:bg-[linear-gradient(#e2e2e2,#fefefe)]"
      >
        <img
          class="h-10 w-10 transform transition-transform duration-800 group-hover:rotate-360"
          :src="LogoSvg"
          alt=""
        >
      </div>
    </div>

    <!-- 提示框内容 -->
    <!-- -translate-x-1/2 left-1/2 -->
    <div
      class="invisible absolute top-[-110%] z-50 scale-90 rounded-lg bg-white p-x-4 p-y-4 opacity-0 shadow-xl duration-1000 ease-in-out group-hover:visible group-hover:scale-100 group-hover:opacity-100"
    >
      <!-- 社交图标 -->
      <div
        class="flex gap-3"
      >
        <div
          class="group/a h-12 w-12 flex items-center justify-center rounded-full bg-gray-200 p-3 shadow-lg duration-600 hover:w-30 hover:scale-105 hover:cursor-pointer"
          @click="isShowSettingModal = true"
        >
          <img
            class="h-full w-full"
            :src="SettingSvg"
            alt=""
          >

          <span
            class="w-0 overflow-hidden color-#4F6171 font-700 duration-600 group-hover/a:w-40"
          >
            设置
          </span>
        </div>

        <div
          class="group/a h-12 w-12 flex items-center justify-center rounded-full bg-gray-200 p-3 shadow-lg duration-600 hover:w-30 hover:scale-105 hover:cursor-pointer"
          @click="isShowQueryDuplicateModal = true"
        >
          <img
            class="h-full w-full"
            :src="QueryDuplicateSvg"
            alt=""
          >

          <span
            class="w-0 overflow-hidden color-#FF6A07 font-700 duration-600 group-hover/a:w-40"
          >
            查重
          </span>
        </div>

        <div
          class="group/a h-12 w-12 flex items-center justify-center rounded-full bg-gray-200 p-3 shadow-lg duration-600 hover:w-30 hover:scale-105 hover:cursor-pointer"
          @click="isShowSettingModal = true"
        >
          <img
            class="h-full w-full"
            :src="QueryDuplicateSvg"
            alt=""
          >

          <span
            class="w-0 overflow-hidden color-#52B44B font-700 duration-600 group-hover/a:w-40"
          >
            Emby
          </span>
        </div>

      </div>
    </div>
  </button>
</template>

<style lang="less" scoped>

</style>
