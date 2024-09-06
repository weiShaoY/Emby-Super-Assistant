<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
const form = ref({

  /**
   * 打开文件夹动作Id
   */
  openFolderId: '',
})
</script>

<template>
  <a-form
    :model="form"
    layout="vertical"
  >

    <!-- 请输入打开文件夹动作Id -->
    <a-form-item
      field="openFolderId"
      label="打开文件夹动作Id"
    >
      <a-input
        v-model="form.openFolderId"
        placeholder="请输入打开文件夹动作Id"
      />
    </a-form-item>
  </a-form>
</template>

<style lang="less" scoped>

</style>
