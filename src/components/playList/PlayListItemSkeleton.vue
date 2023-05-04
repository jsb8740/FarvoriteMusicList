<template>
  <div class="skeletons">
    <div class="thumbnail"></div>
    <div class="text"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.skeletons {
  margin: 0 3%;
  display: inline-block;
  width: 320px;
  height: 210px;
  .thumbnail {
    width: 100%;
    height: 180px;
    background-color: $skeletonsColor;
    border-radius: 1rem;
    margin-bottom: 5px;
  }
  .text {
    height: 25px;
    width: 100%;
    background-color: $skeletonsColor;
    border-radius: 0.3rem;
  }
}
</style>
