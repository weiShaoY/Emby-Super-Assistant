<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

</script>

<template>
  <button>
    <span>
      Enter
    </span>
  </button>
</template>

<style lang="less" scoped>
button {
  all: unset;
  position: relative;
  height: 4em;
  width: 10em;
  padding: 8px 24px;
  border-radius: 10px;
  background: linear-gradient(180deg, #282828, #202020);
  box-shadow:
    inset -8px 0 8px rgba(0, 0, 0, 0.15),
    inset 0 -8px 8px rgba(0, 0, 0, 0.25),
    0 0 0 2px rgba(0, 0, 0, 0.75),
    10px 20px 25px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

button::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 4px;
  bottom: 14px;
  right: 12px;
  background: linear-gradient(90deg, #232323, #4a4a4a);
  border-radius: 10px;
  box-shadow:
    -10px -10px 10px rgba(255, 255, 255, 0.25),
    10px 5px 10px rgba(0, 0, 0, 0.15);
  border-left: 1px solid #0004;
  border-bottom: 1px solid #0004;
  border-top: 1px solid #0009;
}

button span {
  font-size: 1.5rem;
  color: white;
  position: relative;
  margin-top: -8px;
}
</style>
