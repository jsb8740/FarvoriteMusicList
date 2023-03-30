<template>
  <div v-if="initialized" id="container">
    <TheSide></TheSide>
    <TheView></TheView>

    <TheMusicController class="controller"></TheMusicController>
  </div>
</template>
<script setup lang="ts">
import TheMusicController from "./components/layouts/TheMusicController.vue";
import TheSide from "./components/layouts/TheSide.vue";
import TheView from "./components/layouts/TheView.vue";
import { onMounted, ref } from "vue";
import { Connector, type TableProperties } from "@/indexedDB/connector";

const initialized = ref(false);

const tables = [
  { name: "favorites" },
  { name: "playlists" },
  { name: "sams" },
] as TableProperties[];

onMounted(() => {
  initialize();
});

const initialize = async () => {
  try {
    await Promise.all([initializeIndexedDB()]);
  } finally {
    initialized.value = true;
  }
};

const initializeIndexedDB = async () => {
  await Connector.create({
    database: "favorite_music",
    tables,
    version: 1,
    sync: true,
  });
};
</script>

<style scoped lang="scss">
#container {
  display: grid;
  grid-template-columns: 1fr 6fr;
  grid-template-rows: 7fr auto;
  height: 100dvh;

  .controller {
    grid-column: 1 / 3; // === grid-area: 2 / 1 / span 1 / span 2;
    // display: none;
  }

  main {
    overflow: hidden scroll;
  }
}
</style>
