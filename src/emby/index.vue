<!-- eslint-disable lines-around-comment -->
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import DetailsPage from './details_page/index.vue'

/**
 *  判断是否为来自Javdb的视频
 */
function checkIfReferredFromJavdb() {
  const videoName = GM_getValue('EMBY-BTN-VALUE')

  if (!videoName) {
    return
  }

  onMounted(() => {
    const observer = new MutationObserver(() => {
      const inputElement = document.querySelector(
        'input[is="emby-input"][type="search"]',
      ) as any

      if (inputElement) {
        inputElement.value = videoName

        inputElement.dispatchEvent(
          new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            charCode: 13,
          }),
        )

        // 停止观察
        observer.disconnect()
        GM_setValue('EMBY-BTN-VALUE', '')
      }
    })

    // 开始观察 DOM 变化
    observer.observe(document.body, { childList: true, subtree: true })
  })
}

checkIfReferredFromJavdb()

const isDetailsPage = ref(false)

const bodyElement = document.querySelector('body')

/**
 *  地址栏是否变化
 */
document.addEventListener('viewbeforeshow', async (e: any) => {
  // 重置 isDetailsPage 状态
  isDetailsPage.value = false

  // 检查是否为详情页
  if (e.detail.contextPath.startsWith('/item?id=')) {
    // 先移除所有包含 'emby' 的类名
    bodyElement?.classList.forEach((className) => {
      if (className.includes('emby')) {
        bodyElement.classList.remove(className)
      }
    })

    // 然后添加新的类名
    bodyElement?.classList.add('emby', 'emby-details-page')

    isDetailsPage.value = true
  }
  else {
    // 先移除所有包含 'emby' 的类名
    bodyElement?.classList.forEach((className) => {
      if (className.includes('emby')) {
        bodyElement.classList.remove(className)
      }
    })

    // 然后添加新的类名
    bodyElement?.classList.add('emby', 'emby-list-page')
  }
})
</script>

<template>
  <DetailsPage
    v-if="isDetailsPage"
  />
</template>

<style lang="less" scoped>

</style>
