<template>
  <div id="container">
    <TheSide></TheSide>
    <TheView></TheView>
  </div>
</template>
<script setup lang="ts">
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
