<template>
  <div>
    <progress id="file" max="100" value="70" @click="test"></progress>
    <input type="range" name="" id="" />
  </div>
</template>

<script setup lang="ts">
const test = (e: any) => {
  console.log(e.offsetX);
};
</script>

<style scoped>
progress {
  border: 1px solid red;
}
</style>
