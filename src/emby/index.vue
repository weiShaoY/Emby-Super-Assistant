<!-- eslint-disable lines-around-comment -->
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
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
</script>

<template>
  <div
    class=""
  />
</template>

<style lang="less" scoped>

</style>
