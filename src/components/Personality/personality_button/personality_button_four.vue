<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
</script>

<template>
  <button
    class="btn"
  >
    Hover Me
  </button>
</template>

<style lang="less" scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  width: 170px;
  height: 60px;
  font-size: 18px;
  background: #fff;
  border: none;
  border-radius: 50px;
  color: #000;
  outline: none;
  cursor: pointer;
  transition: all 0.4s;
}

.btn:hover {
  box-shadow:
    inset 0 0 0 4px #ef476f,
    inset 0 0 0 8px #ffd166,
    inset 0 0 0 12px #06d6a0,
    inset 0 0 0 16px #118ab2;
  background: #073b4c;
  color: #fff;
}
</style>
