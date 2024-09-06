<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
const form = ref({

  /**
   * 选择的盘符（如 C、D、E、F）
   */
  driveLetter: '',

  /**
   * 是否启用定时提示读取文件夹
   */
  enableReminder: true,

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
</script>

<template>
  <a-form
    :model="form"
    layout="vertical"
  >
    <!-- 盘符选择 -->
    <a-form-item
      field="driveLetter"
      label="选择盘符"
    >
      <a-input
        v-model="form.driveLetter"
        placeholder="请输入要读取的盘符（例如：C、D、E、F）"
      />
    </a-form-item>

    <!-- 是否启用定时提示 -->
    <a-form-item
      field="enableReminder"
      label="启用定时提示读取文件夹"
    >
      <a-switch
        v-model="form.enableReminder"
      />
    </a-form-item>

    <template
      v-if="form.enableReminder"
    >
      <!-- 提示间隔（小时） -->
      <a-form-item
        field="reminderInterval"
        label="提示读取间隔（小时）"
      >
        <a-input-number
          v-model="form.reminderInterval"
          placeholder="请输入提示读取文件夹的时间间隔（单位：小时）"
        />
      </a-form-item>

      <!-- 定时器检查间隔（小时） -->
      <a-form-item
        field="checkInterval"
        label="定时器检查间隔（小时）"
      >
        <a-input-number
          v-model="form.checkInterval"
          placeholder="请输入定时器检查的时间间隔（单位：小时）"
        />
      </a-form-item>
    </template>

    <!-- 请输入quicker打开文件夹动作Id -->
    <a-form-item
      field="quickerOpenFolderId"
      label="Quicker打开文件夹动作Id"
    >
      <a-input
        v-model="form.quickerOpenFolderId"
        placeholder="请输入打开文件夹动作Id"
      />
    </a-form-item>
  </a-form>
</template>

<style lang="less" scoped>

</style>
