<script setup lang="ts">
import { computed, ref } from 'vue'

import Setting from './setting.vue'

import SiteBtn from './siteBtn.vue'

import { siteList } from './utils/siteList'

import type { SiteItem } from './utils/siteList'

import type { LibItem } from './utils/libSites'

import { libSites } from './utils/libSites'

import { getCode } from './utils'

import { GM_getValue, GM_setValue } from '$' // 导入 GM_getValue 和 GM_setValue 方法

/**
 *  从 libSites 中找到匹配当前 URL 的图书馆站点
 */
const libItem = libSites.find(item => item.href.test(window.location.href))

const code = ref ('')

// 定义默认隐藏的站点名称数组
const DEF_DIS = [
  ...['AvJoy', 'baihuse', 'GGJAV', 'AV01', '18sex', 'highporn'],
  ...['JavBus', 'JavDB', 'JAVLib', 'MISSAV_'],
]

// 使用 ref 创建响应式的 disables 数组，并从 GM_getValue 获取初始值
const disables = ref<SiteItem['name'][]>(GM_getValue('disable', DEF_DIS))

function main() {
  if (!libItem) {
    console.error('||脚本挂载错误') // 如果没有找到匹配的站点，输出错误信息
    return // 终止函数执行
  }

  // 获取当前图书馆站点的代码
  code.value = getCode(libItem)

  // 执行对于当前图书馆站的特殊适配，如单独的样式改动
  libItem.method() // 调用 libItem 中定义的适配方法
}

/**
 * 计算是否显示 `SiteBtn` 组件的逻辑
 * @param siteItem - 当前站点的 `SiteItem` 对象
 * @returns 是否显示 `SiteBtn` 组件的布尔值
 */
function shouldShowSiteBtn(siteItem: SiteItem): boolean {
  const hidden = disables.value.find(disItem => disItem === siteItem.name) === undefined

  /**
   * 判断当前站点是否与指定的 `LibItem` 不同
   */
  const sameSite = libItem?.name !== siteItem.disableLibItemName

  /**
   * 返回综合判断结果，决定是否显示 `SiteBtn` 组件
   */
  return sameSite && hidden
}

/**
 *  定义一个函数来设置 disables，并保存到 GM_setValue
 */
function setDisables(disable: SiteItem['name'][]) {
  disables.value = disable
  GM_setValue('disable', disable)
}

main()
</script>

<template>
  <!-- 定义一个容器 div，包含站点按钮列表 -->
  <div
    class="flex border-gray-300 rounded-2 bg-white p-3 shadow-md ease-in-out"
    :style="{
      boxShadow: 'inset 20px 20px 8px #bebebe, inset -20px -20px 8px #EBEBEB',
    }"
  >
    <!-- 遍历站点列表，根据条件渲染 SiteBtn 组件 -->

    <div
      class="flex rounded-2 bg-[#2a2b2f] p-3"
    >
      <div
        class="m-r-3 flex flex-1 flex-wrap gap-3"
      >
        <template
          v-for="siteItem in siteList"
        >
          <SiteBtn
            v-if="shouldShowSiteBtn(siteItem)"
            :key="siteItem.name"
            :site-item="siteItem"
            :code="code"
          />
        </template>
      </div>

      <Setting
        :site-list="siteList"
        :set-disables="setDisables"
        :disables="disables"
      />
    </div>

  </div>
</template>

<style lang="less" scoped>

</style>
