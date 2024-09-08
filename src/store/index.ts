import { createPinia } from 'pinia'

import useSettingStore from './modules/save'

import useSiteStore from './modules/site'

const pinia = createPinia()

export {
  useSettingStore,
  useSiteStore as useWebStore,
}

export default pinia
