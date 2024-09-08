<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type { SiteItem } from './utils/siteList'

import settingSvg from '@/assets/svg/setting.svg'

const props = defineProps<{

  /**
   * 站点列表
   */
  siteList: SiteItem[]

  /**
   * 更新禁用的站点
   */
  setDisables: (value: string[]) => void

  /**
   * 禁用的站点
   */
  disables: SiteItem['name'][]
}>()

/**
 *    是否显示设置弹窗
 */
const visible = ref(false)

function changeCheck(item: SiteItem, isHidden: boolean) {
  /**
   *  根据 isHidden 状态更新 disables 列表
   */
  const newDisables = isHidden
    ? props.disables.filter(disItem => disItem !== item.name) // 如果 isHidden 为 true，则从 disables 列表中移除该项
    : [...props.disables, item.name] // 否则，将该项添加到 disables 列表中

  props.setDisables(newDisables) // 调用 setDisables 更新 disables 列表
}

function go(e: any, item: SiteItem) {
  // 阻止冒泡
  e.preventDefault()

  /**
   *  添加协议
   */
  const fullUrl = `https://${item.hostname}`

  window.open(fullUrl, '_blank')
}
</script>

<template>
  <button
    class="group relative h-12 w-12 overflow-hidden border-2 border-black rounded-2 bg-white duration-500 hover:border-green-500"
    type="button"
    @click="visible = true"
  >
    <div
      class="relative z-10 h-full w-full flex items-center justify-center text-3xl text-black duration-500 group-hover:scale-0"
    >
      <img

        :src="settingSvg"
        class="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2"
      >
    </div>

    <span
      class="absolute left-0 top-12 h-full w-full rotate-45 bg-#67C23A duration-500 group-hover:top-9"
    />

    <span
      class="absolute left-12 top-0 h-full w-full rotate-45 bg-#67C23A duration-500 group-hover:left-9"
    />

    <span
      class="absolute right-12 top-0 h-full w-full rotate-45 bg-#67C23A duration-500 group-hover:right-9"
    />

    <span
      class="absolute bottom-12 right-0 h-full w-full rotate-45 bg-#67C23A duration-500 group-hover:bottom-9"
    />
  </button>

  <a-modal
    v-if="visible"
    v-model:visible="visible"
    :footer="false"
    width="auto"
    @cancel="visible = false"
  >
    <template
      #title
    >
      <span
        class="font-bold"
      >
        跳转在线观看
      </span>
    </template>

    <div
      class="grid grid-cols-4 gap-4 p-2"
    >
      <a-checkbox
        v-for="item in props.siteList"
        :key="item.name"
        :model-value="!disables.includes(item.name)"
        @change="changeCheck(item, disables.includes(item.name))"
      >

        <a-link
          class="items-center !flex !p-2"
          @click="go($event, item)"
        >
          <div
            class="m-r-2 !h-10 !min-h-10 !min-w-10 !w-10"
          >
            <img
              v-if="item.icon"
              :src="item.icon"
              class="!h-10 !min-h-10 !min-w-10 !w-10"
            >
          </div>

          <span>
            {{ item.hostname }}
          </span>
        </a-link>
      </a-checkbox>
    </div>

  </a-modal>
</template>

<style>
.arco-checkbox-checked .arco-checkbox-icon {
  background-color: #67c23a !important;
}
</style>
