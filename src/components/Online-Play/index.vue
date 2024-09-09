<!------------------------------------  跳转在线播放   ------------------------------------------------->
<script setup lang="ts">
import OnlinePlaySetting from './onlinePlay_setting.vue'

import SiteBtn from './site_btn.vue'

import { libSites } from './utils/libSites'

import useOnlinePlayStore from '@/store/modules/onlinePlay'

const props = defineProps({
  /**
   *  挂载点
   */
  to: {
    type: String,
    required: true,
  },

  /**
   *  @description  视频名称
   */
  videoName: {
    type: String,
    required: true,
  },

})

// 导入 GM_getValue 和 GM_setValue 方法
const onlinePlayStore = useOnlinePlayStore()

/**
 *   从 libSites 中找到匹配当前 URL 的图书馆站点
 */
const libItem = libSites.find(item => item.href.test(window.location.href))

const code = ref ('')

function main() {
  if (!libItem) {
    console.error('||脚本挂载错误') // 如果没有找到匹配的站点，输出错误信息
    return // 终止函数执行
  }

  // 获取当前图书馆站点的代码
  // code.value = getCode(libItem)

  code.value = props.videoName

  // 执行对于当前图书馆站的特殊适配，如单独的样式改动
  libItem.method() // 调用 libItem 中定义的适配方法
}

main()
</script>

<template>
  <Teleport
    v-if="onlinePlayStore.onlinePlay.isShowOnlinePlay"
    :to="to"
  >
    <div
      class="flex border-gray-300 rounded-2 bg-white p-3 shadow-md ease-in-out"
      :style="{
        boxShadow: 'inset 20px 20px 8px #bebebe, inset -20px -20px 8px #EBEBEB',
      }"
    >
      <!-- 遍历站点列表，根据条件渲染 SiteBtn 组件 -->
      <div
        class="w-full flex flex-wrap gap-3 rounded-2 bg-[#2a2b2f] p-3"
      >
        <template
          v-for="siteItem in onlinePlayStore.onlinePlay.siteList"
        >
          <SiteBtn
            v-if="siteItem.isVisible && (libItem?.name !== siteItem.name)"
            :key="siteItem.name"
            :site-item="siteItem"
            :code="videoName"
          />
        </template>
      </div>

    </div>
  </Teleport>
</template>

<style lang="less" scoped>

</style>
