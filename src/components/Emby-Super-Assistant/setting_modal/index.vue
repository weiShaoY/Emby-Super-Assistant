<!------------------------------------  设置 弹框  ------------------------------------------------->
<script lang="ts" setup>
import Folder from './folder.vue'

import Quicker from './quicker.vue'

const visible = defineModel({ type: Boolean, default: false })

// import { useSettingStore } from '@/store'

// const settingStore = useSettingStore()
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
      class="h-150"
    >
      <a-tabs
        position="left"
        type="card-gutter"
        class="h-full"
      >
        <a-tab-pane
          key="1"
          title="文件夹"
        >
          <Folder />
        </a-tab-pane>

        <a-tab-pane
          key="2"
          title="Quicker"
        >
          <Quicker />
        </a-tab-pane>

        <a-tab-pane
          key="3"
          title="Tab 3"
        >
          Content of Tab Panel 3
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
