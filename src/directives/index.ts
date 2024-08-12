import type { App, Directive } from 'vue'

import loadingDirective from './loading/index'

import fullScreenLoadingDirective from './fullScreenLoading/index'

const directives: { [key: string]: Directive } = {
  /**
   *  加载
   */
  loading: loadingDirective,

  /**
   *  全屏加载
   */
  fullScreenLoading: fullScreenLoadingDirective,
}

export default {
  install(app: App) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  },
}
