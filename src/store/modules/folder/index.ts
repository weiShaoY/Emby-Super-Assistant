import { Message } from '@arco-design/web-vue'

import { ref } from 'vue'

import { defineStore } from 'pinia'

const useFolderStore = defineStore(
  'folder',
  () => {
    const folder = ref({
      /**
       * 选择的盘符（如 C、D、E、F）
       */
      driveLetter: '',

      /**
       * 是否启用定时提示读取文件夹
       */
      isEnableReminder: true,

      /**
       * 提示读取文件夹的时间间隔（小时）
       */
      reminderInterval: 12,

      /**
       * 定时器检查读取提示的时间间隔（小时）
       */
      checkInterval: 1,

      /**
       *  Quicker打开文件夹动作Id
       */
      quickerOpenFolderId: 'a186251d-2767-4729-838c-757647bed39e',
    })

    return {
      folder,
    }
  },

)

export default useFolderStore
