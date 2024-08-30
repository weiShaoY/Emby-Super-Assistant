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

console.log('%c Line:25 🍧 props', 'color:#3f7cff', props.siteList)
/**
 *    是否显示设置弹窗
 */
const visible = ref(false)

function changeCheck(item: SiteItem, isHidden: boolean) {
  console.log('%c Line:32 🌽 isHidden', 'color:#ed9ec7', isHidden)

  // 根据 isHidden 状态更新 disables 列表
  const newDisables = isHidden
    ? props.disables.filter(disItem => disItem !== item.name) // 如果 isHidden 为 true，则从 disables 列表中移除该项
    : [...props.disables, item.name] // 否则，将该项添加到 disables 列表中

  console.log('%c Line:39 🍉 newDisables', 'color:#e41a6a', newDisables)
  props.setDisables(newDisables) // 调用 setDisables 更新 disables 列表
}
</script>

<template>
  <button
    class="group relative h-12 w-12 overflow-hidden border-2 border-black rounded-2 duration-500 hover:border-green-500"
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
      class="absolute left-0 top-12 h-full w-full rotate-45 bg-green-500 duration-500 group-hover:top-9"
    />

    <span
      class="absolute left-12 top-0 h-full w-full rotate-45 bg-green-500 duration-500 group-hover:left-9"
    />

    <span
      class="absolute right-12 top-0 h-full w-full rotate-45 bg-green-500 duration-500 group-hover:right-9"
    />

    <span
      class="absolute bottom-12 right-0 h-full w-full rotate-45 bg-green-500 duration-500 group-hover:bottom-9"
    />
  </button>

  <a-modal
    v-if="visible"
    v-model:visible="visible"
    modal-class="modal_class"
    :footer="false"
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
      class="grid grid-cols-4 gap-3"
    >
      <a-checkbox
        v-for="item in props.siteList"
        :key="item.name"
        :model-value="!disables.includes(item.name)"
        @change="changeCheck(item, disables.includes(item.name))"
      >
        <!-- {{ !disables.includes(item.name) }} -->
        {{ item.name }}
      </a-checkbox>
    </div>

  </a-modal>
</template>

<style lang="less" scoped>

</style>
