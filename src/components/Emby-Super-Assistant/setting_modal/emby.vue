<script lang="ts" setup>
import useEmbyStore from '@/store/modules/emby'

const embyStore = useEmbyStore()
</script>

<template>
  <a-form
    :model="embyStore.emby"
  >
    <a-form-item
      field="url"
      label="域名"
    >
      <a-input
        v-model="embyStore.emby.url"
        placeholder="请输入 域名"
      />
    </a-form-item>

    <a-form-item
      field="port"
      label="端口"
    >
      <a-input
        v-model="embyStore.emby.port"
        placeholder="请输入 端口"
      />
    </a-form-item>

    <a-form-item
      field="userId"
      label="服务器用户ID"
    >
      <a-input
        v-model="embyStore.emby.userId"
        placeholder="请输入 服务器用户ID"
      />
    </a-form-item>

    <a-form-item
      field="deviceName"
      label="设备名称"
    >
      <a-input
        v-model="embyStore.emby.deviceName"
        placeholder="请输入 设备名称"
      />
    </a-form-item>

    <a-form-item
      field="deviceId"
      label="设备ID"
    >
      <a-input
        v-model="embyStore.emby.deviceId"
        placeholder="请输入 设备ID"
      />
    </a-form-item>

    <a-form-item
      field="clientVersion"
      label="客户端版本号"
    >
      <a-input
        v-model="embyStore.emby.clientVersion"
        placeholder="请输入 客户端版本号"
      />
    </a-form-item>

    <a-form-item
      field="language"
      label="语言代码"
    >
      <a-input
        v-model="embyStore.emby.language"
        placeholder="请输入 语言代码"
      />
    </a-form-item>

    <a-form-item
      field="token"
      label="认证令牌"
    >
      <a-input
        v-model="embyStore.emby.token"
        placeholder="请输入 认证令牌"
      />
    </a-form-item>

    <a-form-item
      field="Fields"
      label="返回字段列表"
    >
      <a-input
        v-model="embyStore.emby.queryParams.Fields"
        placeholder="请输入 返回字段列表"
      />
    </a-form-item>

    <a-form-item
      field="StartIndex"
      label="起始索引"
    >
      <a-input-number
        v-model="embyStore.emby.queryParams.StartIndex"
      />
    </a-form-item>

    <a-form-item
      field="SortBy"
      label="排序字段"
    >
      <a-input
        v-model="embyStore.emby.queryParams.SortBy"
        placeholder="请输入 排序字段"
      />
    </a-form-item>

    <a-form-item
      field="SortOrder"
      label="排序顺序"
    >
      <a-select
        v-model="embyStore.emby.queryParams.SortOrder"
      >
        <a-option
          value="Ascending"
        >
          升序  Ascending
        </a-option>

        <a-option
          value="Descending"
        >
          降序  Descending
        </a-option>
      </a-select>
    </a-form-item>

    <a-form-item
      field="EnableImageTypes"
      label="启用图像类型"
    >
      <a-input
        v-model="embyStore.emby.queryParams.EnableImageTypes"
        placeholder="请输入 启用图像类型"
      />
    </a-form-item>

    <a-form-item
      field="ImageTypeLimit"
      label="图像数量限制"
    >
      <a-input-number
        v-model="embyStore.emby.queryParams.ImageTypeLimit"
      />
    </a-form-item>

    <a-form-item
      field="Recursive"
      label="是否递归查询"
    >
      <a-switch
        v-model="embyStore.emby.queryParams.Recursive"
      />
    </a-form-item>

    <a-form-item
      field="GroupProgramsBySeries"
      label="按系列分组节目"
    >
      <a-switch
        v-model="embyStore.emby.queryParams.GroupProgramsBySeries"
      />
    </a-form-item>

    <a-form-item
      field="Limit"
      label="结果限制数量"
    >
      <a-input-number
        v-model="embyStore.emby.queryParams.Limit"
      />
    </a-form-item>
  </a-form>
</template>

<style lang="less" scoped></style>
