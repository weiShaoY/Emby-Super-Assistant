<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

</script>

<template>
  <button
    class="button type1"
  />
</template>

<style lang="less" scoped>
.button {
  height: 50px;
  width: 150px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.button:hover {
  box-shadow: 0.5px 0.5px 150px #252525;
}

.type1::after {
  content: 'THANK YOU';
  height: 50px;
  width: 150px;
  background-color: #4617ec;
  color: #fff;
  transform: translateY(100px);
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
}

.type1::before {
  content: 'SUBSCRIBE';
  height: 50px;
  width: 150px;
  background-color: rgb(240, 9, 9);
  color: #f5f8f8;
  position: absolute;
  transform: translateY(0px) scale(1.1);
  font-size: 1.2rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
}

.type1:hover::after {
  transform: translateY(-2px) scale(1.2) rotate(0deg);
}

.type1:hover::before {
  transform: translateY(-50px) rotate(290deg);
}
</style>
