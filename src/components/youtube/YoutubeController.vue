<template>
  <div class="controller">
    <div class="previous" @click="youtubePlayerStore.nextOrPrev(-1)">
      <PreviousIcon></PreviousIcon>
    </div>

    <div class="paused" @click="pausedClick">
      <PlayIcon v-show="youtubePlayerStore.isPaused"></PlayIcon>
      <PausedIcon v-show="!youtubePlayerStore.isPaused"></PausedIcon>
    </div>

    <div class="next" @click="youtubePlayerStore.nextOrPrev(1)">
      <NextIcon></NextIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayIcon from '@/components/icons/youtubeController/PlayIcon.vue';
import NextIcon from '@/components/icons/youtubeController/NextIcon.vue';
import PreviousIcon from '@/components/icons/youtubeController/PreviousIcon.vue';
import PausedIcon from '@/components/icons/youtubeController/PausedIcon.vue';
import { useYoutubePlayerStore } from '@/stores/youtubeplayer';

const youtubePlayerStore = useYoutubePlayerStore();
const pausedClick = () => {
  youtubePlayerStore.togglePause();
};
</script>

<style scoped>
.controller {
  display: flex;
  align-items: center;
}

.previous,
.next {
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 100%;

  display: flex;
}

.paused {
  cursor: pointer;

  border-radius: 100%;
  padding: 0.3rem 0.5rem;

  width: 3rem;
  height: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
