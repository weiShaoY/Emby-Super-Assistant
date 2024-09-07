<!------------------------------------  设置 弹框  ------------------------------------------------->
<script lang="ts" setup>
import Folder from './folder.vue'

import TorrentList from './torrent_list.vue'

import OnlinePlaySetting from './online_play_setting.vue'

import Web from './web.vue'

import Emby from './emby.vue'

const visible = defineModel({ type: Boolean, default: false })

// import { useSettingStore } from '@/store'

// const settingStore = useSettingStore()
</script>

<template>
  <a-modal
    v-model:visible="visible"
    width="80%"
    modal-class="modal_class"
    :footer="false"
    @cancel="visible = false"
  >
    <template
      #title
    >
      设置
    </template>

    <div
      class="!h-150"
    >
      <a-tabs
        type="card-gutter"
        justify
      >
        <a-tab-pane
          key="1"
          title="文件夹"
          class="h-full p-x-20% !overflow-y-auto"
        >
          <Folder />
        </a-tab-pane>

        <a-tab-pane
          key="2"
          title="磁链列表"
          class="h-full p-x-20% !overflow-y-auto"
        >
          <TorrentList />
        </a-tab-pane>

        <a-tab-pane
          key="3"
          title="跳转在线播放"
          class="h-full p-x-20% !overflow-y-auto"
        >
          <OnlinePlaySetting />
        </a-tab-pane>

        <a-tab-pane
          key="4"
          title="网站"
          class="h-full p-x-20% !overflow-y-auto"
        >
          <Web />
        </a-tab-pane>

        <a-tab-pane
          key="5"
          title="Emby"
          class="h-full p-x-20% !overflow-y-auto"
        >
          <Emby />
        </a-tab-pane>

      </a-tabs>
    </div>
  </a-modal>
</template>

<style lang="less" scoped>
.modal_class {
  height: 100px;
}
</style>
