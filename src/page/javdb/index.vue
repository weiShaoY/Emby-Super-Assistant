<script lang="ts" setup>
import ListPage from './list_page/index.vue'

import DetailsPage from './details_page/index.vue'

/**
 * 判断是列表页还是详情页
 */
const isListPage = ref(false)

const movieListElement = document.querySelector('.movie-list')

const bodyElement = document.querySelector('body')

// 检查 movieListElement 是否有元素
if (movieListElement) {
  bodyElement?.classList.add('javdb', 'javdb-list-page')

  isListPage.value = true
}
else {
  bodyElement?.classList.add('javdb', 'javdb-details-page')

  isListPage.value = false
}
</script>

<template>
  <ListPage
    v-if="isListPage"
  />

  <DetailsPage
    v-else
  />
</template>

<style lang="less" scoped></style>
