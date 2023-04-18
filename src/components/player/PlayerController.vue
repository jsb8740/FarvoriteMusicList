<template>
  <div class="musicController">
    <div class="previous" @click="prev">
      <PreviousIcon></PreviousIcon>
    </div>

    <div class="paused" @click="musicStore.changePauseState">
      <PlayIcon v-show="isPaused"></PlayIcon>
      <PausedIcon v-show="!isPaused"></PausedIcon>
    </div>

    <div class="next" @click="next">
      <NextIcon></NextIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayIcon from "@/components/icons/PlayIcon.vue";
import PausedIcon from "@/components/icons/PausedIcon.vue";
import NextIcon from "../icons/NextIcon.vue";
import PreviousIcon from "../icons/PreviousIcon.vue";
import { storeToRefs } from "pinia";
import { useMusicControllerStore } from "@/stores/musicController";

const musicStore = useMusicControllerStore();
const { isPaused } = storeToRefs(musicStore);

const next = () => {
  console.log(musicStore.nextIndex());
};

const prev = () => {
  console.log(musicStore.previousIndex());
};
</script>

<style scoped lang="scss">
.musicController {
  display: flex;
  align-items: center;
  gap: 3.4rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;

  .previous,
  .next {
    cursor: pointer;
    padding: 0.3rem;
    border-radius: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .paused {
    cursor: pointer;
    background-color: white;
    border-radius: 100%;
    padding: 0.5rem 0.4rem 0.5rem 0.5rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.18);
    width: 2rem;
    height: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
