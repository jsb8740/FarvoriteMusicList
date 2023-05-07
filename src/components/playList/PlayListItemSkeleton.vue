<template>
  <div class="skeletons">
    <div class="thumbnail"></div>
    <div class="text"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.skeletons {
  margin: 0 1% 1.2% 1%;
  display: inline-block;
  width: 320px;
  height: 210px;
  .thumbnail {
    width: 100%;
    height: 180px;
    background-color: $skeletonsColor;
    border-radius: 0.2rem;
    margin-bottom: 5px;
    animation: pulse 2s infinite ease-in-out;
  }
  .text {
    height: 25px;
    width: 100%;
    background-color: $skeletonsColor;
    border-radius: 0.1rem;
    animation: pulse 2s infinite ease-in-out;
  }
}

@keyframes pulse {
  0% {
    background-color: $skeletonsColor;
  }

  50% {
    background-color: $skeletonsColor2;
  }

  100% {
    background-color: $skeletonsColor;
  }
}
</style>
