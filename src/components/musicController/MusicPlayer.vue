<template>
  <div class="player">
    <img
      src="@/assets/player/playerSkipBack.png"
      @click="prev"
      class="moveSong"
    />

    <button class="playerPause" @click="store.changePauseState">
      <img v-show="startBtn" src="@/assets/player/playerPause.png" />
      <img v-show="pauseBtn" src="@/assets/player/playerPlay.png" />
    </button>
    <img
      src="@/assets/player/playerSkipForward.png"
      @click="next"
      class="moveSong"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useMusicControllerStore } from "@/stores/musicController";

const store = useMusicControllerStore();
const { isPaused } = storeToRefs(store);
//true 음악 시작 상태

const startBtn = computed<boolean>(() => (isPaused.value ? false : true));
const pauseBtn = computed<boolean>(() => (isPaused.value ? true : false));

const next = () => {
  console.log(store.nextIndex());
};

const prev = () => {
  console.log(store.previousIndex());
};
</script>

<style scoped lang="scss">
$imgSize: 2.3rem;

.player {
  display: flex;
  width: 100%;
  justify-content: center;
  //   background-color: grey;
  gap: 3rem;
  //   position: absolute;
  .moveSong {
    cursor: pointer;
  }

  .playerPause {
    width: $imgSize;
    position: relative;
    img {
      inset: 0;

      position: absolute;
    }
  }

  img {
    width: $imgSize;
    height: $imgSize;
  }
}
</style>
