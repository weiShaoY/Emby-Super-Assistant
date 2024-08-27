<script setup lang="ts">
import Javdb from '@/javdb/index.vue'

import Javbus from '@/javbus/index.vue'

import Emby from '@/emby/index.vue'

// 获取 当前 网站 url
const currentUrl = window.location.href

const isJavdb = currentUrl.includes('javdb')

const isJavbus = currentUrl.includes('javbus')

const isEmby = currentUrl.includes('8096/web/index.html')
</script>

<template>
  <Javdb
    v-if="isJavdb"
  />

  <Javbus
    v-else-if="isJavbus"
  />

  <Emby
    v-else-if="isEmby"
  />
  <!-- <Personality /> -->1
</template>

<style scoped lang="less">

</style>
