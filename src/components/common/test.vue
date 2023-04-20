<template>
  <progress id="file" max="100" value="70" @click="test"></progress>
  <input type="range" name="" id="" />
</template>

<script setup lang="ts">
const test = (e: any) => {
  console.log(e.offsetX);
};
</script>

<style scoped>
progress {
  border: 1px solid red;
  width: 100%;
}
input[type="range"] {
  /* appearance: none;
  -webkit-appearance: none; */
  background: transparent;

  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;

  /* outline: none; */
  width: 100%;
}
</style>
