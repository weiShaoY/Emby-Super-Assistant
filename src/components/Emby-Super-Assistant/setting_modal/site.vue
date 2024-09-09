<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import useSiteStore from '@/store/modules/site'

const siteStore = useSiteStore()
</script>

<template>
  <a-form
    :model="siteStore.site.javdb"
  >
    <!-- 盘符选择 -->
    <a-form-item
      field="driveLetter"
      label="Javdb 域名"
    >
      <template
        #label
      >
        <img
          :src="siteStore.site.javdb.logo"
          class="h-8 w-8"
        >
      </template>

      <a-input
        v-model="siteStore.site.javdb.url"
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
          :src="siteStore.site.btsow.logoHover"
          class="h-8 w-8"
        >
      </template>

      <a-input
        v-model="siteStore.site.btsow.url"
        placeholder="请输入Btsow 域名"
      />
    </a-form-item>

  </a-form>
</template>

<style lang="less" scoped>

</style>
