import { Message } from '@arco-design/web-vue'

import { ref } from 'vue'

import { defineStore } from 'pinia'

const useSettingStore = defineStore(
  'setting',
  () => {
    /**
     *  是否显示设置弹窗
     */
    const isShowSettingModal = ref(false)

    return {

      isShowSettingModal,

    }
  },

)

export default useSettingStore
