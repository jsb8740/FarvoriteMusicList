<template>
  <div class="musicController">
    <div class="previous" @click="prev">
      <PreviousIcon></PreviousIcon>
    </div>

    <div class="paused" @click="playListCheck">
      <PlayIcon v-show="isPaused"></PlayIcon>
      <PausedIcon v-show="!isPaused"></PausedIcon>
    </div>

    <div class="next" @click="next">
      <NextIcon></NextIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayIcon from "@/components/icons/playerImg/PlayIcon.vue";
import PausedIcon from "@/components/icons/playerImg/PausedIcon.vue";
import NextIcon from "../icons/playerImg/NextIcon.vue";
import PreviousIcon from "../icons/playerImg/PreviousIcon.vue";
import { storeToRefs } from "pinia";
import { useMusicControllerStore } from "@/stores/musicController";

const musicStore = useMusicControllerStore();
const { isPaused, playList } = storeToRefs(musicStore);

const playListCheck = () => {
  if (playList.value.length === 0) {
    return;
  } else {
    musicStore.changePauseState();
  }
};

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
    // background-color: white;
    border-radius: 100%;
    padding: 0.5rem 0.4rem 0.5rem 0.5rem;
    // box-shadow: 0 0 1rem rgba(0, 0, 0, 0.18);
    width: 3rem;
    height: 3rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
