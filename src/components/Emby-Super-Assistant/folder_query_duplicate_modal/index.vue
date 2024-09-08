<!------------------------------------  文件夹查询重复弹窗  ------------------------------------------------->
<script lang="ts" setup>
import { getFormattedDateFromTimestamp } from '@/utils'

import useFolderStore from '@/store/modules/folder'

const folderStore = useFolderStore()

const visible = defineModel({ type: Boolean, default: false })

/**
 *  是否显示全部
 */
const isShowAll = ref(false)

/**
 *  计算超时时间 *时*分*秒未重新读取文件夹
 */
/**
 * 获取文件夹读取超时提示文本
 * @return {string} 超时提示文本
 */
const getFolderReadTimeoutText = computed(() => {
  const millisecondsInHour = 3600000 // 1 小时 = 3,600,000 毫秒

  const lastReadTime = folderStore.folderReadTime

  if (!lastReadTime) {
    return ''
  }

  const currentTimestamp = Date.now()

  const timeDifference = currentTimestamp - lastReadTime

  if (timeDifference <= 0) {
    return ''
  }

  const hoursElapsed = Math.floor(timeDifference / millisecondsInHour)

  const minutesElapsed = Math.floor((timeDifference % millisecondsInHour) / 60000)

  return `${hoursElapsed} 时 ${minutesElapsed} 分`
})

function openFolder() {
  folderStore.openFolder(folderStore.folderName)
}
</script>

<template>
  <a-modal
    v-model:visible="visible"
    width="auto"
    @cancel="visible = false"
  >
    <template
      #title
    >
      <div
        class="flex cursor-pointer items-center font-700"
        @click="isShowAll = true"
      >
        <span>
          重复
        </span>

        <span
          class="m-x-2 text-5 color-primary"
        >
          {{ folderStore.duplicateFolderFileList.length }}
        </span>

        <span>
          部
        </span>
      </div>

      <div
        class="toggle-container m-x-3 w-10"
      >
        <input
          v-model="isShowAll"
          class="toggle-input"
          type="checkbox"
        >

        <div
          class="toggle-handle-wrapper"
        >
          <div
            class="toggle-handle"
          >
            <div
              class="toggle-handle-knob"
            />

            <div
              class="toggle-handle-bar-wrapper"
            >
              <div
                class="toggle-handle-bar"
              />
            </div>
          </div>
        </div>

        <div
          class="toggle-base"
        >
          <div
            class="toggle-base-inside"
          />
        </div>
      </div>

      <div
        class="flex cursor-pointer items-center font-700"
        @click="isShowAll = false"
      >
        <span>
          去重
        </span>

        <span
          class="m-x-2 text-5 color-primary"
        >
          {{ folderStore.uniqueFolderFileNameList.length }}
        </span>

        <span>
          部
        </span>
      </div>
    </template>

    <a-scrollbar
      type="track"
      class="h-60vh overflow-y-scroll !min-h-60vh"
    >

      <template
        v-if="!isShowAll"
      >
        <EmbyButton
          v-for="(item, index) in folderStore.duplicateFolderFileList"
          :key="index"
          :video-name="item.processedName"
          :is-show-video-name="true"
          :height="40"
          class="m-x-auto m-b-5 !w-80%"
        />
      </template>

      <template
        v-else
      >
        <EmbyButton
          v-for="(item, index) in folderStore.uniqueFolderFileNameList"
          :key="index"
          :video-name="item"
          :is-show-video-name="true"
          :height="40"
          class="m-x-auto m-b-5 !w-80%"
        />
      </template>
    </a-scrollbar>

    <template
      #footer
    >
      <div
        class="w-full flex flex-col items-start font-700 !text-4"
      >

        <div
          class="flex items-center"
        >
          <div
            class="m-r-3 flex items-center"
          >
            <span>
              总共
            </span>

            <span
              class="m-x-2 text-5 color-primary"
            >
              {{ folderStore.folderFileList.length }}
            </span>

            <span>
              部
            </span>

          </div>

        </div>

        <div
          v-if="getFolderReadTimeoutText"
          class="flex items-center"
        >
          <span>
            {{ getFolderReadTimeoutText }}
          </span>

          <span
            class="m-x-3"
          >
            未重新读取文件夹
          </span>
        </div>

        <div
          v-if="folderStore.folderReadTime"
          class="flex items-center"
        >

          <span>
            {{ getFormattedDateFromTimestamp(folderStore.folderReadTime) }}
          </span>

          <span
            class="m-x-3"
          >
            读取文件夹
          </span>

          <a-tooltip
            :content="folderStore.folderName"
            background-color="#52B44B"
          >
            <a-link
              class="m-x-2 w-30 truncate text-center !block !p-1"
              status="success"
              @click="openFolder"
            >
              {{ folderStore.folderName }}
            </a-link>
          </a-tooltip>

        </div>
      </div>

    </template>

  </a-modal>
</template>

<style lang="less" scoped>
.toggle-container {
  --knob-size: 1.75em;
  display: flex;
  justify-content: center;
  position: relative;
}

.toggle-input {
  position: absolute;
  z-index: 2;
  bottom: 132.5%;
  border-radius: 50%;
  transform: rotate(-25deg);
  transform-origin: 50% 4.75em;
  width: var(--knob-size);
  height: var(--knob-size);
  opacity: 0;
  /* fix em sizing */
  font: inherit;
  transition: transform 0.24s cubic-bezier(0.65, 1.35, 0.5, 1);
  cursor: pointer;
}

.toggle-input:checked {
  transform: rotate(25deg);
}

.toggle-handle-wrapper {
  position: absolute;
  z-index: 1;
  bottom: -135%;
  -webkit-mask-image: linear-gradient(to bottom, #000 62.125%, transparent 50%);
  mask-image: linear-gradient(to bottom, #000 62.125%, transparent 50%);
  width: 200%;
  overflow: hidden;
}

.toggle-handle {
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: rotate(-25deg);
  transform-origin: bottom center;
  transition: transform 0.24s cubic-bezier(0.65, 1.35, 0.5, 1);
}

.toggle-input:checked + .toggle-handle-wrapper > .toggle-handle {
  transform: rotate(25deg);
}

.toggle-handle-knob {
  position: relative;
  z-index: 1;
  border-radius: 50%;
  width: var(--knob-size);
  height: var(--knob-size);
  background-image: radial-gradient(
    farthest-corner at 70% 30%,
    #fedee2 4%,
    #d63534 12% 24%,
    #a81a1a 50% 65%,
    #d63534 75%
  );
  transition: transform 0.24s cubic-bezier(0.65, 1.35, 0.5, 1);
}

.toggle-input:checked + .toggle-handle-wrapper .toggle-handle-knob {
  transform: rotate(-90deg);
}

/* toggle handle knob hover inner shadow */
.toggle-handle-knob::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 8px 2px rgb(255 255 255 / 0.4);
  opacity: 0;
  transition: opacity 0.2s;
}

@media (hover: hover) {
  .toggle-input:hover + .toggle-handle-wrapper .toggle-handle-knob::after,
  .toggle-input:focus-visible
    + .toggle-handle-wrapper
    .toggle-handle-knob::after {
    opacity: 1;
  }
}

.toggle-handle-bar-wrapper {
  position: relative;
  width: 0.5em;
  height: 3em;
}

.toggle-handle-bar {
  position: absolute;
  top: calc(var(--knob-size) / 2 * -1);
  left: 0;
  width: 100%;
  height: calc(100% + var(--knob-size) / 2);
  background-image: linear-gradient(
    to right,
    #777475,
    #a4a4a4,
    #fff 45% 55%,
    #a4a4a4,
    #777475
  );
  background-position-x: 0.06125em;
  transition: background-position-x 0.24s cubic-bezier(0.65, 1.35, 0.5, 1);
  box-shadow: inset 0 1em 0.25em rgb(0 0 0 / 0.4);
}

.toggle-input:checked + .toggle-handle-wrapper .toggle-handle-bar {
  background-position-x: -0.06125em;
}

.toggle-base {
  position: relative;
  border-radius: 3.125em;
  padding: 0.25em;
  width: 3.5em;
  height: 1.125em;
  background-color: #fff;
  background-image: linear-gradient(to bottom, #fff, #d7d7d7);
  box-shadow:
    0 -0.25em 0.5em #fff,
    0 0.25em 0.5em #d7d7d7;
}

.toggle-base-inside {
  position: relative;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, #a6a6a6, #7d7d7d);
  box-shadow:
    inset 0 0.0625em rgb(255 255 255 / 0.2),
    inset 0 -0.03125em rgb(255 255 255 / 1),
    inset 0 -0.0625em 0.25em rgb(0 0 0 / 0.1);
}

/* toggle base inside active */
.toggle-base-inside::after {
  content: '';
  position: absolute;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, #5ab054, #438c3c);
  box-shadow: inherit;
  opacity: 0;
  transition: opacity 0.24s cubic-bezier(0.65, 1.35, 0.5, 1);
}

.toggle-input:checked ~ .toggle-base .toggle-base-inside::after {
  opacity: 1;
}
</style>
