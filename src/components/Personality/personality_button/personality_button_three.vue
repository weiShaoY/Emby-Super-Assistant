<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
</script>

<template>
  <button
    class="c-button c-button--gooey"
  >
    Hover me11
    <div
      class="c-button__blobs"
    >
      <div />

      <div />

      <div />
    </div>
  </button>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    style="display: block; height: 0; width: 0;"
  >
    <defs>
      <filter
        id="goo"
      >
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="10"
          result="blur"
        />

        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          result="goo"
        />

        <feBlend
          in="SourceGraphic"
          in2="goo"
        />
      </filter>
    </defs>
  </svg>
</template>

<style lang="less" scoped>
.c-button {
  color: #000;
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  padding: 0.9em 1.6em;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  z-index: 1;
}

.c-button--gooey {
  color: #00a97f;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 4px solid #00a97f;
  border-radius: 0;
  position: relative;
  transition: all 700ms ease;
}

.c-button--gooey .c-button__blobs {
  height: 100%;
  filter: url(#goo);
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: -3px;
  right: -1px;
  z-index: -1;
}

.c-button--gooey .c-button__blobs div {
  background-color: #00a97f;
  width: 34%;
  height: 100%;
  border-radius: 100%;
  position: absolute;
  transform: scale(1.4) translateY(125%) translateZ(0);
  transition: all 700ms ease;
}

.c-button--gooey .c-button__blobs div:nth-child(1) {
  left: -5%;
}

.c-button--gooey .c-button__blobs div:nth-child(2) {
  left: 30%;
  transition-delay: 60ms;
}

.c-button--gooey .c-button__blobs div:nth-child(3) {
  left: 66%;
  transition-delay: 25ms;
}

.c-button--gooey:hover {
  color: #fff;
}

.c-button--gooey:hover .c-button__blobs div {
  transform: scale(1.4) translateY(0) translateZ(0);
}
</style>
