<!------------------------------------  是否显示文件夹读取成功弹窗  ------------------------------------------------->
<script lang="ts" setup>
import useFolderStore from '@/store/modules/folder'

defineProps({
  /**
   *  读取文件夹耗时
   */
  folderReadTime: {
    type: String,
    required: true,
  },
})

const visible = defineModel({ type: Boolean, default: false })

const folderStore = useFolderStore()

function openFolder() {
  folderStore.openFolder(folderStore.folderName)
}

function handleClose() {
  window.location.reload()
}
</script>

<template>
  <a-modal
    v-model:visible="visible"
    width="auto"
    simple
    :footer="false"
    @cancel="handleClose"
  >
    <template
      #title
    >
      <div
        class="flex items-center font-600"
      >
        <span
          class=""
        >
          文件夹
        </span>

        <a-tooltip
          :content="folderStore.folderName"
          background-color="#52B44B"
        >
          <a-link
            class="m-x-2 w-30 truncate text-center font-700 !block !p-3 !text-4"
            status="success"
            @click="openFolder"
          >
            {{ folderStore.folderName }}
          </a-link>
        </a-tooltip>

        <span
          class=""
        >
          读取成功
        </span>
      </div>
    </template>

    <div
      class="w-auto font-600"
    >
      <div
        class="flex items-center"
      >
        <span>
          耗时
        </span>

        <span
          class="m-x-2 text-5 color-primary"
        >
          {{ folderReadTime }}
        </span>

        <span>
          秒
        </span>
      </div>

      <div
        class="flex items-center"
      >
        <span>
          共读取
        </span>

        <span
          class="m-x-2 text-5 color-primary"
        >
          {{ folderStore.folderFileList.length }}
        </span>

        <span>
          部
        </span>
      </div>

      <div
        class="flex items-center"
      >
        <span>
          共发现
        </span>

        <span
          class="m-x-2 text-5 color-primary"
        >
          {{ folderStore.duplicateFolderFileList.length }}
        </span>

        <span>
          部重复视频
        </span>
      </div>

      <div
        class="flex items-center"
      >
        <span>
          去重后
        </span>

        <span
          class="m-x-2 text-5 color-primary"
        >
          {{ folderStore.uniqueFolderFileNameList.length }}
        </span>

        <span>
          部
        </span>
      </div>

    </div>
  </a-modal>
</template>

<style lang="less" scoped>

</style>
