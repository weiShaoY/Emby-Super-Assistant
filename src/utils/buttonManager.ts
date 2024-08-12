type ButtonOptions = {
  text: string
  style: Record<string, string>
  class: string
  onClick: () => void
}

/**
 *  按钮管理器
 */
class ButtonManager {
  /**
   * 创建一个按钮元素
   * @param {string} className - 按钮的类名
   * @param {string} textContent - 按钮的文本内容
   * @param {Record<string, string>} style - 按钮的样式对象
   * @param {() => void} onClick - 按钮的点击事件处理函数
   * @returns {HTMLElement} 按钮元素
   */
  private createButtonElement(
    className: string,
    textContent: string,
    style: Record<string, string>,
    onClick: () => void,
  ): HTMLElement {
    const buttonElement = document.createElement('div')

    buttonElement.className = className
    buttonElement.textContent = textContent

    Object.assign(buttonElement.style, style)

    buttonElement.addEventListener('click', (event) => {
      event.preventDefault()
      onClick()
    })

    return buttonElement
  }

  /**
   * 添加按钮到指定元素中
   * @param {HTMLElement} container - 目标容器元素
   * @param {HTMLElement} buttonElement - 按钮元素
   */
  private appendButton(container: HTMLElement, buttonElement: HTMLElement) {
    const tagsContainer = container.querySelector('.tags')

    if (tagsContainer) {
      tagsContainer.appendChild(buttonElement)
    }
  }

  /**
   * 创建并添加一个自定义按钮到指定元素中
   * @param {HTMLElement} container - 目标容器元素
   * @param {ButtonOptions} options - 按钮选项
   */
  createBtn(container: HTMLElement, options: ButtonOptions) {
    if (options.class) {
      container.querySelector(`.${options.class}`)?.remove()
    }

    if (!container.querySelector(`.${options.class}`)) {
      const customBtnElement = this.createButtonElement(
        options.class,
        options.text,
        options.style,
        options.onClick,
      )

      this.appendButton(container, customBtnElement)
    }
  }

  /**
   * 删除指定类名或ID的按钮
   * @param {HTMLElement} container - 目标容器元素
   * @param {string} selector - 按钮的类名或ID
   */
  removeButton(container: HTMLElement, selector: string) {
    const buttonElement = container.querySelector(selector)

    if (buttonElement) {
      buttonElement.remove()
    }
  }
}

export default new ButtonManager()

// // 导出 ButtonManager 的单例实例
// export default new ButtonManager()

// // 示例用法
// const containerElement = document.querySelector('.some-element') as HTMLElement
// const videoTitle = 'example-video-title'
// const btsowUrl = 'https://btsow.example.com/?q='

// // 使用 ButtonManager 创建一个 Btsow 按钮
// ButtonManager.createCustomBtn(containerElement, {
//   text: 'Btsow',
//   style: {
//     marginLeft: '10px',
//     color: '#fff',
//     backgroundColor: '#FF8400'
//   },
//   class: 'tag btsow-btn',
//   onClick: () => {
//     window.open(`${btsowUrl}${videoTitle}`, '_blank')
//   }
// })
