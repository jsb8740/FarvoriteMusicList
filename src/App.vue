<template>
  <div id="container">
    <TheSide></TheSide>
    <TheView></TheView>
    <TheMusicController></TheMusicController>
  </div>
</template>
<script setup lang="ts">
import TheMusicController from "./components/layouts/TheMusicController.vue";
import TheSide from "./components/layouts/TheSide.vue";
import TheView from "./components/layouts/TheView.vue";
</script>

<style scoped lang="scss">
#container {
  display: flex;
  height: 100dvh;
  width: 100dvw;
}
</style>
