<template>
  <div class="controller">
    <div class="progress">
      <svg></svg>
    </div>

    <div class="musicPlayer">
      <div class="musicInfo">
        <!-- <img src="@/assets/test/test1.jpg" alt="" /> -->
        <AppYoutube
          :video-id="currentMusic"
          @unstarted="unstarted"
          @ended="ended"
          @playing="playing"
          @paused="paused"
          @buffering="buffering"
          @stateChange="stateChange"
          @ready="ready"
        ></AppYoutube>

        <div class="music">
          <!-- 전광판 효과 추가 -->
          <div class="title">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </div>
          <div class="artist">artist</div>
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
import AppYoutube from "@/components/common/AppYoutube.vue";
import { useMusicControllerStore } from "@/stores/musicController";
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useSoundControllerStore } from "@/stores/soundController";
const currentTimeInterval = ref(0);

const musicStore = useMusicControllerStore();
const { playList, currentIndex, isPaused } = storeToRefs(musicStore);

const soundStore = useSoundControllerStore();
const { isMute, volume } = storeToRefs(soundStore);

// const currentMusic = computed(() => playList.value[currentIndex.value]);

const currentMusic = ref(playList.value[currentIndex.value]);

const unstarted = (player: YT.Player) => {
  musicStore.setCurrentTime(0);
  console.log("unstarted");
};

const ended = (player: YT.Player) => {
  clearInterval(currentTimeInterval.value);

  // update video
  musicStore.nextIndex();
  const videoId = playList.value[currentIndex.value];
  player.loadVideoById({ videoId, startSeconds: 0 });
  musicStore.setCurrentTime(0);
};
const playing = (player: YT.Player) => {
  if (!isPaused.value) {
    clearInterval(currentTimeInterval.value);
    currentTimeInterval.value = setInterval(() => {
      const currentTime = Math.ceil(player.getCurrentTime() as number);
      musicStore.setCurrentTime(currentTime);
      console.log(currentTime);
    }, 1000);
  }
};
const paused = (player: YT.Player) => {
  if (isPaused.value) {
    clearInterval(currentTimeInterval.value);
  }
};

const buffering = (player: YT.Player) => {};

const stateChange = (player: YT.Player) => {
  const fullTime = player.getDuration();
  musicStore.setDuration(fullTime);
  if (isPaused.value) {
    clearInterval(currentTimeInterval.value);
  }
};

const ready = (player: YT.Player) => {
  soundStore.volumeInit();
  player.setVolume(volume.value);
  if (isMute.value === true) {
    player.mute();
  } else {
    player.unMute();
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/color.scss";
.controller {
  background-color: white;
  // height: 6.5rem;
  // padding-right: 3rem;

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

  .progress {
    background-color: rgb(222, 222, 222);
    svg {
      display: block;
      background-color: $orangeColor;
      height: 7px;
      width: 75%;
    }
  }

  img {
    width: 6.5rem;
  }
}
</style>
