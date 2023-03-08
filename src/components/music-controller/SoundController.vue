<template>
  <div class="soundBar" @wheel="test"></div>
</template>

<script setup lang="ts">
const test = (e: WheelEvent) => {
  {
    console.log(e);
  }
};
</script>

<style scoped lang="scss">
.soundBar {
  background-color: gray;
  width: 200px;
  height: 10px;
}
</style>
