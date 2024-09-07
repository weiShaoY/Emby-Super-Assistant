<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import useWebStore from '@/store/modules/web'

const webStore = useWebStore()
</script>

<template>
  <a-form>
    <!-- 盘符选择 -->
    <a-form-item
      field="driveLetter"
      label="Javdb 域名"
    >
      <template
        #label
      >
        <img
          :src="webStore.web.javdb.icon"
          class="h-8 w-8"
        >
      </template>

      <a-input
        v-model="webStore.web.javdb.url"
        placeholder="请输入Javdb 域名"
      />
    </a-form-item>

    <!-- 是否启用定时提示 -->
    <a-form-item
      field="Btsow 域名"
      label="Btsow 域名"
    >
      <template
        #label
      >
        <img
          :src="webStore.web.btsow.iconHover"
          class="h-8 w-8"
        >
      </template>

      <a-input
        v-model="webStore.web.btsow.url"
        placeholder="请输入Btsow 域名"
      />
    </a-form-item>

  </a-form>
</template>

<style lang="less" scoped>

</style>
