<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import useFolderStore from '@/store/modules/folder'

const folderStore = useFolderStore()
</script>

<template>
  <a-form>
    <!-- 盘符选择 -->
    <a-form-item
      field="driveLetter"
      label="盘符"
    >
      <!-- <a-input
        v-model="folderStore.folder.driveLetter"
        placeholder="请输入要读取的盘符 (例如:C、D、E、F)"
      /> -->
      <a-select
        v-model="folderStore.folder.driveLetter"
        placeholder="请选择要读取的盘符"
      >
        <a-option
          value="C"
        >
          C
        </a-option>

        <a-option
          value="D"
        >
          D
        </a-option>

        <a-option
          value="Z"
        >
          Z
        </a-option>
      </a-select>
    </a-form-item>

    <!-- 是否启用定时提示 -->
    <a-form-item
      field="enableReminder"
      label="启用定时提示读取文件夹"
    >
      <a-switch
        v-model="folderStore.folder.isEnableReminder"
      />
    </a-form-item>

    <template
      v-if="folderStore.folder.isEnableReminder"
    >
      <!-- 提示间隔（小时） -->
      <a-form-item
        field="reminderInterval"
        label="提示读取间隔（小时）"
      >
        <a-input-number
          v-model="folderStore.folder.reminderInterval"
          placeholder="请输入提示读取文件夹的时间间隔（单位：小时）"
        />
      </a-form-item>

      <!-- 定时器检查间隔（小时） -->
      <a-form-item
        field="checkInterval"
        label="定时器检查间隔（小时）"
      >
        <a-input-number
          v-model="folderStore.folder.checkInterval"
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
        v-model="folderStore.folder.quickerOpenFolderId"
        placeholder="请输入打开文件夹动作Id"
      />
    </a-form-item>
  </a-form>
</template>

<style lang="less" scoped>

</style>
