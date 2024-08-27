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

// const isDetailsPage = ref(false)

// /**
//  *  地址栏是否变化
//  */
// document.addEventListener('viewbeforeshow', async (e: any) => {
//   // 重置 isDetailsPage 状态
//   isDetailsPage.value = false

//   // 检查是否为详情页
//   if (e.detail.contextPath.startsWith('/item?id=')) {
//     setTimeout(() => {
//       // const videoElement = document.querySelector(
//       //   'div[is=\'emby-scroller\']:not(.hide) .detailTextContainer',
//       // )
//       const videoElement = document.querySelector(
//         '.itemView:not(.hide) .detailTextContainer',
//       )

//       if (videoElement) {
//       // 移除 videoElement 内所有 id 为 btnTool 的元素
//         document.querySelectorAll('#targetNode').forEach(element => element.remove())

//         // 创建并添加新按钮元素
//         const div = document.createElement('div')

//         div.id = 'targetNode'
//         videoElement.appendChild(div)

//         // 设置 isDetailsPage 状态
//         isDetailsPage.value = true
//       }
//     }, 200)
//   }
// })
</script>

<template>
  <DetailsPage />
</template>

<style lang="less" scoped>

</style>
