<!------------------------------------  在线播放 设置 ------------------------------------------------->
<script lang="ts" setup>
import useOnlinePlayStore from '@/store/modules/onlinePlay'

const onlinePlayStore = useOnlinePlayStore()
</script>

<template>
  <a-form>

    <!-- 是否启用定时提示 -->
    <a-form-item
      field="isShowOnlinePlay"
      label="是否显示在线播放组件"
    >
      <a-switch
        v-model="onlinePlayStore.onlinePlay.isShowOnlinePlay"
      />
    </a-form-item>
  </a-form>

  <div
    class="grid grid-cols-3 gap-col-4 gap-row-1 p-2"
  >

    <a-checkbox
      v-for="siteItem in onlinePlayStore.onlinePlay.siteList"
      :key="siteItem.name"
      v-model="siteItem.isVisible"
    >

      <a-link
        class="m-l-2 !flex !p-3"
        @click="onlinePlayStore.openSite($event, siteItem)"
      >
        <div
          class="m-r-2 text-center !h-10 !min-h-10 !min-w-10 !w-10"
        >
          <img
            v-if="siteItem.icon"
            :src="siteItem.icon"
            class="!h-10 !min-h-10 !min-w-10 !w-10"
          >
        </div>

        <span>
          {{ siteItem.hostname }}
        </span>
      </a-link>
    </a-checkbox>
  </div>
</template>

<style lang="less" scoped>

</style>
