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

    // 创建加载 SVG 的元素
    const loadingSVGContainer = document.createElement('div')

    loadingSVGContainer.className = 'loading-svg'
    loadingSVGContainer.innerHTML = `
      <svg viewBox="0 0 84 24">
        <defs>
          <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: #ffa830; stop-opacity: 1" />
            <stop offset="100%" style="stop-color: #fd565d; stop-opacity: 1" />
          </linearGradient>
        </defs>
        <circle cx="18" cy="12" r="6" fill="url(#yellowGradient)"></circle>
        <circle cx="18" cy="12" r="6" fill="url(#yellowGradient)"></circle>
        <circle cx="42" cy="12" r="6" fill="url(#yellowGradient)"></circle>
        <circle cx="66" cy="12" r="6" fill="url(#yellowGradient)"></circle>
      </svg>
    `

    overlay.appendChild(loadingSVGContainer)
    el.overlay = overlay

    // el.style.position = 'relative' // 设置相对定位
    el.appendChild(overlay)

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
