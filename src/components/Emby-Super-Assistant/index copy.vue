<!------------------------------------  设置按钮  ------------------------------------------------->
<script lang="ts" setup>
import SettingModal from './components/setting_modal.vue'

import LogoSvg from '@/assets/logo.svg'

/**
 *  是否显示设置弹窗
 */
const isShowSettingModal = ref(false)
</script>

<template>
  <SettingModal
    v-model="isShowSettingModal"
  />

  <div
    class="group relative bottom-60 left-5 inline-block bg-amber !fixed"
  >
    <!-- 按钮内容 -->
    <div
      class="flex cursor-pointer items-center overflow-hidden rounded-full from-blue-500 to-purple-400 bg-gradient-to-br px-10 py-2 text-white shadow-lg transition-transform duration-300 ease-in-out"
    >
      <img
        class="h-10 w-10 transform transition-transform duration-300 group-hover:rotate-360"
        :src="LogoSvg"
        alt=""
      >
    </div>

    <!-- 提示框内容 -->
    <!-- -translate-x-1/2 left-1/2 -->
    <div
      class="invisible absolute top-[-180%] z-50 scale-90 rounded-lg bg-white px-6 py-5 opacity-0 shadow-xl duration-1000 ease-in-out group-hover:visible group-hover:scale-100 group-hover:opacity-100"
    >
      <!-- 社交图标 -->
      <div
        class="flex gap-3"
      >
        <div
          class="group/a h-12 w-12 flex items-center justify-center rounded-full bg-gray-200 shadow-lg duration-600 hover:w-20 hover:scale-105 hover:cursor-pointer"
          @click="isShowSettingModal = true"
        >
          <!-- <img
            class="h-10 w-10 group-hover/a:hidden group-hover/a:rotate-360"
            :src="LogoSvg"
            alt=""
          >

          <span
            class="hidden color-#52B44B font-700 group-hover/a:block"
          >
            Emby
          </span> -->

          <img
            class="h-10 w-10"
            :src="LogoSvg"
            alt=""
          >

          <span
            class="w-0 overflow-hidden color-#52B44B font-700 transition-600 group-hover/a:w-20"
          >
            Emby
          </span>
        </div>

        <div
          class="group/a h-12 w-12 flex items-center justify-center rounded-full bg-gray-200 shadow-lg duration-600 hover:w-20 hover:scale-105 hover:cursor-pointer"
        >
          <svg
            class="h-6 w-6"
          >
            <!-- 放置社交图标 -->
            <path
              d="..."
            />
          </svg>
        </div>

        <div
          class="group/a h-12 w-12 flex items-center justify-center rounded-full bg-gray-200 shadow-lg duration-600 hover:w-20 hover:scale-105 hover:cursor-pointer"
        >
          <svg
            class="h-6 w-6"
          >
            <!-- 放置社交图标 -->
            <path
              d="..."
            />
          </svg>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
