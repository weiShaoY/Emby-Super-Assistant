import type { DirectiveBinding } from 'vue'

type ElType = {
  overlay: HTMLElement | null
} & HTMLElement

const loadingDirective = {
  // 在元素挂载时调用
  mounted(el: ElType, binding: DirectiveBinding) {
    // 创建遮罩层
    const overlay = document.createElement('div')

    overlay.className = 'directives-loading-overlay' // 稍后在样式文件中定义
    overlay.style.display = 'none'

    // 创建 中间旋转 的元素
    const spinner = document.createElement('div')

    spinner.className = 'directives-loading-spinner' // 稍后在样式文件中定义

    overlay.appendChild(spinner)
    el.overlay = overlay
    el.style.position = 'relative' // 设置相对定位
    el.appendChild(overlay)

    // 根据元素的大小设置加载动画的尺寸
    const size = Math.min(Math.min(el.clientWidth, el.clientHeight) / 2, 30)

    spinner.style.width = `${size}px`
    spinner.style.height = `${size}px`
    spinner.style.borderWidth = `${size / 10}px`

    if (binding.value) {
      el.overlay!.style.display = 'flex'
      el.classList.add('directives-loading-active') // 稍后在样式文件中定义
    }
    else {
      el.overlay!.style.display = 'none'
    }
  },

  // 在绑定值更新时调用
  updated(el: ElType, binding: DirectiveBinding) {
    // 根据绑定值的变化显示或隐藏加载效果
    if (binding.value) {
      el.overlay!.style.display = 'flex'
      el.classList.add('directives-loading-active')
    }
    else {
      el.overlay!.style.display = 'none'
      el.classList.remove('directives-loading-active')
    }
  },
  unmounted(el: ElType) {
    // 移除加载元素
    el.removeChild(el.overlay!)
    el.overlay = null
  },
}

export default loadingDirective
