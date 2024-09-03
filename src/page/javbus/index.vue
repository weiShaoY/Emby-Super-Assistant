<script lang="ts" setup>
import ListPage from './list_page/index.vue'

import DetailsPage from './details_page/index.vue'

/**
 * 判断是列表页还是详情页
 */
const isListPage = ref(false)

const waterfallElement = document.querySelector('#waterfall')

const bodyElement = document.querySelector('body')

// 检查 movieListElement 是否有元素
if (waterfallElement) {
  isListPage.value = true
  bodyElement?.classList.add('javbus', 'javbus-list-page')
}
else {
  isListPage.value = false
  bodyElement?.classList.add('javbus', 'javbus-details-page')
}
</script>

<template>
  <EmbyFolder />

  <ListPage
    v-if="isListPage"
  />

  <DetailsPage
    v-else
  />
</template>

<style lang="less" scoped></style>
