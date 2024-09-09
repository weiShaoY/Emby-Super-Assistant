<script setup lang="ts">
import useSiteStore from './store/modules/site'

import useFolderStore from '@/store/modules/folder'

import Javdb from '@/page/javdb/index.vue'

import Javbus from '@/page/javbus/index.vue'

import Emby from '@/page/emby/index.vue'

const siteStore = useSiteStore()

const folderStore = useFolderStore()

/**
 *  获取 当前 网站 url
 */
const currentUrl = window.location.href

const isJavdb = currentUrl.includes('javdb')

const isJavbus = currentUrl.includes('javbus')

const isEmby = currentUrl.includes(new URL(siteStore.site.emby.url).hostname)

folderStore.getFolder()
</script>

<template>
  <Emby-Super-Assistant
    v-if="isJavdb || isJavbus "
  />

  <Javdb
    v-if="isJavdb"
  />

  <Javbus
    v-else-if="isJavbus"
  />

  <Emby
    v-else-if="isEmby"
  />

  <!-- <Personality /> -->
</template>

<style scoped lang="less">

</style>
