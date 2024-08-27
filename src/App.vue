<script setup lang="ts">
import Javdb from '@/javdb/index.vue'

import Javbus from '@/javbus/index.vue'

import Emby from '@/emby/index.vue'

// 获取 当前 网站 url
const currentUrl = window.location.href

console.log('%c Line:10 🍻 currentUrl', 'color:#7f2b82', currentUrl)

const isJavdb = currentUrl.includes('javdb')

const isJavbus = currentUrl.includes('javbus')

console.log('%c Line:14 🥑 isJavbus', 'color:#93c0a4', isJavbus)

const isEmby = currentUrl.includes('8096/web/index.html')

const bodyElement = document.querySelector('body')

// 给每个页面的 body 添加类名
if (bodyElement) {
  if (isJavdb) {
    bodyElement.classList.add('javdb')
  }

  else if (isJavbus) {
    console.log('%c Line:26 🍔 isJavbus', 'color:#e41a6a', isJavbus)
    bodyElement.classList.add('javbus')
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

  <Emby
    v-else-if="isEmby"
  />
  <!-- <Personality /> -->1
</template>

<style scoped lang="less">

</style>
