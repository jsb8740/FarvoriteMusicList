<template>
  <div class="controller">
    <!-- <div class="progress">
      <svg></svg>
    </div> -->
    <AppProgressBar
      v-model="currentTimePercent"
      progress-type="time"
      @input="onInput"
      class="progress"
    />

    <div class="musicPlayer">
      <PlayerController></PlayerController>
      <div class="musicInfo">
        <!-- <img src="@/assets/test/test1.jpg" alt="" /> -->

        <div class="music">
          <!-- 전광판 효과 추가 -->
          <!-- <div class="title">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </div>
          <div class="artist">artist</div> -->
        </div>
      </div>

      <!-- <MusicPlayer></MusicPlayer> -->

      <div class="soundControl">
        <!-- <Heart video-id="undefined"></Heart> -->
        <!-- <SoundController></SoundController> -->
        <!-- <AppProgressBar type="sound"></AppProgressBar> -->
        <!-- soundcontroller의 의존성 분리가 필요함 -->
        <!-- TheMusicController를 layouts을 다른 곳을 이동함 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMusicControllerStore } from "@/stores/musicController";
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useSoundControllerStore } from "@/stores/soundController";
import PlayerController from "../player/PlayerController.vue";
import AppProgressBar from "../common/AppProgressBar.vue";

const musicStore = useMusicControllerStore();
const { playList, currentIndex, isPaused, currentTimePercent } =
  storeToRefs(musicStore);

const soundStore = useSoundControllerStore();
const { isMute, volume } = storeToRefs(soundStore);

// const currentMusic = computed(() => playList.value[currentIndex.value]);

const onInput = (e: Event) => {
  const value = Number((e.target as HTMLInputElement).value);
  musicStore.setCurrentTimeClick(value);
};

const currentMusic = ref(playList.value[currentIndex.value]);
</script>

<style scoped lang="scss">
.controller {
  background-color: white;
  position: relative;
  // height: 6.5rem;
  // padding-right: 3rem;
  .progress {
    position: absolute;
    top: 0;
    z-index: 1;
    border-radius: 0;
    &::before {
      border-radius: 0;
    }
    &::-webkit-slider-runnable-track {
      border-radius: 0;
    }
    &::-webkit-slider-thumb {
      width: 0%;
    }
  }

  .musicPlayer {
    display: flex;
    align-items: center;
    user-select: none;
    justify-content: space-between;

    & div {
      flex-basis: 33.3%;
    }

    .musicInfo {
      display: flex;
      gap: 3rem;
    }

    .soundControl {
      display: flex;
      justify-content: flex-end;
    }

    .music {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      padding-top: 0.6rem;

      &:nth-child(1) div {
        user-select: text;
      }

      .title {
        width: 10rem;
      }
      .artist {
        color: $greyColor;
      }
    }
  }

  // .progress {
  //   background-color: rgb(222, 222, 222);
  //   svg {
  //     display: block;
  //     background-color: $orangeColor;
  //     height: 7px;
  //     width: 75%;
  //   }
  // }

  img {
    width: 6.5rem;
  }
}
</style>
