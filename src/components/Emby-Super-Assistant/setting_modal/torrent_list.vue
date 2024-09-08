<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import useTorrentListStore from '@/store/modules/torrentList'

import AddSvg from '@/assets/svg/add.svg'

const torrentListStore = useTorrentListStore()
</script>

<template>
  <a-form
    :model="torrentListStore.torrentList"
    auto-label-width
  >
    <a-form-item
      field="isShow"
      label="是否显示磁链组件"
    >
      <a-switch
        v-model="torrentListStore.torrentList.isShowTorrentList"
      />
    </a-form-item>

    <!-- 详情页是否滚动到磁链组件位置 -->
    <a-form-item
      field="isScrollToTorrentList"
      label="网站详情页是否滚动到磁链组件位置"
    >
      <a-switch
        v-model="torrentListStore.torrentList.isScrollToTorrentList"
      />
    </a-form-item>

    <!-- 排序规则数组 -->
    <template
      v-for="(item, index) in torrentListStore.torrentList.SortingRuleArray"
      :key="index"
    >

      <a-form-item
        :field="`sortingRuleArray.${index}.name`"

        :label="`排序规则-${index}`"
        :rules="[
          { required: true, message: 'Name is required' },
        ]"
        content-class="flex items-center gap-3 "
      >
        <a-input
          v-model="item.name"
          :style="{
            flex: '1',
          }"
          placeholder="请输入匹配字段"
        />

        <div
          class="!min-w-28"
        >
          <a-color-picker
            v-model="item.backgroundColor"
            show-text
          />
        </div>

        <button
          class="group flex flex-col cursor-pointer items-center justify-center border-1 border-#FFC9C9 rounded-2 bg-#FF5F5F !h-8 !w-8 active:scale-95 hover:bg-#FF0000"
          @click="torrentListStore.deleteTorrentListRule(index)"
        >
          <svg
            class="w-2 origin-right duration-300 group-hover:rotate-45"
            viewBox="0 0 39 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              y1="5"
              x2="39"
              y2="5"
              stroke="white"
              stroke-width="4"
            />

            <line
              x1="12"
              y1="1.5"
              x2="26.0357"
              y2="1.5"
              stroke="white"
              stroke-width="3"
            />
          </svg>

          <svg
            class="w-4"
            viewBox="0 0 33 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="path-1-inside-1_8_19"
              fill="white"
            >
              <path
                d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
              />
            </mask>

            <path
              d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
              fill="white"
              mask="url(#path-1-inside-1_8_19)"
            />

            <path
              d="M12 6L12 29"
              stroke="white"
              stroke-width="4"
            />

            <path
              d="M21 6V29"
              stroke="white"
              stroke-width="4"
            />
          </svg>
        </button>

      </a-form-item>

    </template>

    <button
      type="button"
      class="group relative m-x-auto m-b-30 h-11 w-48 border-2 border-#52B44B rounded-4 bg-white text-center text-4 text-black font-sans"
      @click="torrentListStore.addTorrentListRule()"
    >
      <div
        class="absolute left-1 top-[5px] z-10 h-8 w-8 flex items-center justify-center rounded-xl bg-#52B44B duration-500 group-hover:w-[180px]"
      >

        <img
          :src="AddSvg"
          class="h-5 w-5"
        >
      </div>

      <p
        class="translate-x-2"
      >
        添加排序规则
      </p>
    </button>

  </a-form>
</template>

<style lang="less" scoped>

</style>
