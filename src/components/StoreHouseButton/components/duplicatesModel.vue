<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { videoManager } from '@/utils'

const duplicatesVideoList = ref <VideoType.Video[]>([])

const duplicatesVideoNameList = ref <string[]>([])

const visible = defineModel({ type: Boolean, default: false })

/**
 *  是否显示全部
 */
const isShowAll = ref(false)

function main() {
  const duplicate = videoManager.duplicate()

  duplicatesVideoList.value = duplicate.duplicatesVideoList

  console.log('%c Line:22 🍊 所有重复的影片列表', 'color:#b03734', duplicatesVideoList)

  duplicatesVideoNameList.value = duplicate.duplicatesVideoNameList

  console.log('%c Line:26 🍕 Emby去重的影片标题列表', 'color:#7f2b82', duplicatesVideoNameList)
}

main()
</script>

<template>
  <a-modal
    v-model:visible="visible"
    modal-class="modal_class"
    @cancel="visible = false"
  >
    <template
      #title
    >

      <span
        class="font-bold"
      >
        去重
      </span>

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

      <span
        class="font-bold"
      >
        全部
      </span>
    </template>

    <a-scrollbar
      type="track"
      class="h-60vh overflow-y-scroll !min-h-60vh"
    >

      <template
        v-if="isShowAll"
      >
        <EmbyButton
          v-for="(item, index) in duplicatesVideoList"
          :key="index"
          :video-name="item.videoProcessedName"
          :is-show-video-name="true"
          :height="40"
          class="m-x-auto m-b-5 !w-80%"
        />
      </template>

      <template
        v-else
      >
        <EmbyButton
          v-for="(item, index) in duplicatesVideoNameList"
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
        class="w-full flex items-center justify-between"
      >

        <div
          class="flex-center"
        >
          <div>
            <span>
              共发现:
            </span>

            <span
              class="m-x-1 text-5 font-bold"
            >
              {{ duplicatesVideoList.length }}
            </span>

            <span>
              部视频重复
            </span>
          </div>

          <div
            class="m-l-3"
          >
            <span>去重后</span>

            <span
              class="m-x-1 text-5 font-bold"
            >
              {{ duplicatesVideoNameList.length }}
            </span>

            <span>
              部
            </span>

          </div>
        </div>

        <a-button
          :style="{
            backgroundColor: '#52B54B',
            color: '#fff',
          }"
          @click="visible = false"
        >
          确定
        </a-button>
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
