<script setup lang="ts">
import Javdb from '@/javdb/index.vue'

import Javbus from '@/javbus/index.vue'

import Emby from '@/emby/index.vue'

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
  }
  else if (isEmby) {
    bodyElement.classList.add('emby')
  }
}

// function openFolder() {
//   // const filePath = 'file:///C:/系统图标'

//   // GM_openInTab(filePath, { active: true, insert: true })

// }
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

  <!-- <Personality /> -->
</template>

<style scoped lang="less">

</style>
