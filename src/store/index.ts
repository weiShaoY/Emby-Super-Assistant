import { createPinia } from 'pinia'

import useSettingStore from './modules/save'

import useWebStore from './modules/web'

const pinia = createPinia()

export {
  useSettingStore,
  useWebStore,
}

export default pinia
