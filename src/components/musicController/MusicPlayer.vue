<template>
  <div class="player">
    <img src="@/assets/player/playerSkipBack.png" alt="" srcset="" />

    <button class="playerPause" @click="changeMusicState">
      <img v-show="startBtn" src="@/assets/player/playerPause.png" />
      <img v-show="pauseBtn" src="@/assets/player/playerPlay.png" />
    </button>
    <img src="@/assets/player/playerSkipForward.png" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

//true 음악 시작 상태
const musicState = ref(true);
const changeMusicState = () => {
  musicState.value = !musicState.value;
};

const startBtn = computed<boolean>(() => (musicState.value ? false : true));
const pauseBtn = computed<boolean>(() => (musicState.value ? true : false));
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
