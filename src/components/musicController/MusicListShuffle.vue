<template>
  <div>
    <button @click="store.inputPlayList">input test</button>
    <br />
    <button @click="store.shufflePlaylist">shuffle test</button>
  </div>
</template>

<script setup lang="ts">
import { useMusicControllerStore } from "@/stores/musicController";
const store = useMusicControllerStore();
</script>

<style scoped lang="scss"></style>
