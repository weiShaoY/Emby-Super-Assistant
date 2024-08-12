<script setup lang="ts">
import Javdb from '@/javdb/index.vue'

import Javbus from '@/javbus/index.vue'

// 获取 当前 网站 url
const currentUrl = window.location.href

const isJavdb = currentUrl.includes('javdb')

const isJavbus = currentUrl.includes('javbus')

const isEmby = currentUrl.includes('8096/web/index.html')

const bodyElement = document.querySelector('body')

// 给每个页面的 body 添加类名
if (bodyElement) {
  if (isJavdb) {
    bodyElement.classList.add('javdb')
  }
  else if (isJavbus) {
    bodyElement.classList.add('javbus')
    console.log('%c Line:24 🍅 bodyElement', 'color:#42b983', bodyElement)
  }
  else if (isEmby) {
    bodyElement.classList.add('emby')
  }
}
</script>

<template>
  <Javdb
    v-if="isJavdb"
  />

  <Javbus
    v-else-if="isJavbus"
  />

  <!-- <Personality /> -->
</template>

<style scoped lang="less">

</style>
