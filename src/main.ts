import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'

import 'uno.css'

import './style/index.less'

import App from './App.vue'

// 导入自定义指令以及样式
import directives from './directives'

import './directives/style.less'

import store from './store'

createApp(App)

  .use(store)

  .use(directives)

  .mount(
    (() => {
      const app = document.createElement('div')

      document.body.append(app)

      return app
    })(),
  )
