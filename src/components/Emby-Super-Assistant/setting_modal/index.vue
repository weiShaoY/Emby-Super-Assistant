<!------------------------------------  设置 弹窗  ------------------------------------------------->
<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'

import Folder from './folder.vue'

import TorrentList from './torrent_list.vue'

import OnlinePlaySetting from './online_play_setting.vue'

import Site from './site.vue'

import Emby from './emby.vue'

import useEmbyStore from '@/store/modules/emby'

import useFolderStore from '@/store/modules/folder'

import useOnlinePlayStore from '@/store/modules/onlinePlay'

import useSiteStore from '@/store/modules/site'

import useTorrentListStore from '@/store/modules/torrentList'

const visible = defineModel({ type: Boolean, default: false })

const embyStore = useEmbyStore()

const folderStore = useFolderStore()

const onlinePlayStore = useOnlinePlayStore()

const siteStore = useSiteStore()

const torrentListStore = useTorrentListStore()

/**
 *  导出配置
 */
function exportConfig() {
  const config = {

    emby: embyStore.emby,

    folder: folderStore.folder,

    onlinePlay: onlinePlayStore.onlinePlay,

    site: siteStore.site,

    torrentList: torrentListStore.torrentList,
  }

  const data = JSON.stringify(config)

  const blob = new Blob([data], {
    type: 'text/plain;charset=utf-8',
  })

  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')

  a.href = url

  a.target = '_blank'

  a.download = 'Emby-超级助手-配置.json'

  document.body.appendChild(a)

  a.click()

  document.body.removeChild(a)

  URL.revokeObjectURL(url)

  Message.success('配置已成功导出！')
}

/**
 *  导入配置
 */
function importConfig() {
  const input = document.createElement('input')

  input.type = 'file'
  input.accept = '.json'

  // 当用户选择文件后读取其内容
  input.onchange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]

    if (!file)
      return

    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)

        // 将导入的数据应用到各个 store
        embyStore.emby = data.emby
        folderStore.folder = data.folder
        onlinePlayStore.onlinePlay = data.onlinePlay
        siteStore.site = data.site
        torrentListStore.torrentList = data.torrentList

        console.log('配置已成功导入！', data)

        Message.success('配置已成功导入！')
      }
      catch (error) {
        console.error('导入配置时出错:', error)

        Message.error('导入配置时出错, 请检查配置文件格式是否正确！')
      }
    }

    reader.readAsText(file)
  }

  // 触发文件选择对话框
  input.click()
}
</script>

<template>
  <a-modal
    v-model:visible="visible"
    width="80%"
    modal-class="modal_class"
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
          <Site />
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

    <template
      #footer
    >

      <div
        class="w-full flex items-center justify-between"
      >
        <a-button
          type="primary"
          @click="exportConfig"
        >
          导出配置
        </a-button>

        <a-button
          type="outline"
          @click="importConfig"
        >
          导入配置
        </a-button>

      </div>

    </template>
  </a-modal>
</template>

<style lang="less" scoped>
.modal_class {
  height: 100px;
}
</style>
