<template>
  <div class="controller" @click.prevent>
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
      <div class="playerControl">
        <PlayerController></PlayerController>
        <div class="time">
          <span>
            {{ startTime }}
          </span>
          <span>
            {{ lastTime }}
          </span>
        </div>
      </div>

      <div class="musicInfo">
        <!-- <img src="@/assets/test/test1.jpg" alt="" /> -->

        <AppMarquee is-play="play">
          <template #default>
            <div v-html="title" class="title"></div>
          </template>
        </AppMarquee>
      </div>

      <!-- <MusicPlayer></MusicPlayer> -->

      <div class="soundControl" @wheel.prevent>
        <PlayerSoundImg></PlayerSoundImg>
        <div>
          <AppProgressBar
            v-model="volume"
            progress-type="sound"
            @wheel="onMouseWheel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMusicControllerStore } from "@/stores/musicController";
import { storeToRefs } from "pinia";
import PlayerController from "../player/PlayerController.vue";
import AppProgressBar from "../common/AppProgressBar.vue";
import { useSoundControllerStore } from "@/stores/soundController";
import AppMarquee from "../common/AppMarquee.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useIndexedDBStore } from "@/stores/indexedDB";
import PlayerSoundImg from "../player/PlayerSoundImg.vue";
import timeFormat from "@/common/PlayTimeFormat";

const dbStore = useIndexedDBStore();
const musicStore = useMusicControllerStore();
const { currentTimePercent, currentIndex, playList, currentTime, duration } =
  storeToRefs(musicStore);
const soundStore = useSoundControllerStore();
const { volume, isMute } = storeToRefs(soundStore);
// const currentMusic = computed(() => playList.value[currentIndex.value]);

const startTime = computed(() => {
  const current = currentTime.value;
  const [hours, minutes, seconds] = timeFormat(current);
  if (hours === 0) {
    return `${minutes}:${seconds}`;
  } else {
    return `${hours}:${minutes}:${seconds}`;
  }
});
const lastTime = computed(() => {
  const current = duration.value;
  const [hours, minutes, seconds] = timeFormat(current);
  if (hours === 0) {
    return `${minutes}:${seconds}`;
  } else {
    return `${hours}:${minutes}:${seconds}`;
  }
});

const onInput = (e: Event) => {
  const value = Number((e.target as HTMLInputElement).value);
  musicStore.setCurrentTimeClick(value);
};

const onMouseWheel = ({ deltaY }: WheelEvent) => {
  let value;
  if (isMute.value) return;
  if (deltaY > 0) {
    // progress.value = Math.max(min, progress.value - 5);
    value = Math.max(0, volume.value - 5);
    console.log(value);
  } else {
    value = Math.min(100, volume.value + 5);
    console.log(value);
  }
  soundStore.setVolume(value);
};

const title = ref("");
// watch(currentIndex, async () => {
//   title.value = await dbStore.getPlaylistTitle(
//     playList.value[currentIndex.value]
//   );
// });
watch(currentIndex, () => {
  getPlaylist(playList.value[currentIndex.value]);
});
watch(playList, () => {
  getPlaylist(playList.value[currentIndex.value]);
});

const getPlaylist = async (item: string) => {
  title.value = await dbStore.getPlaylistTitle(item);
};
onMounted(() => {
  setTimeout(() => {
    getPlaylist(playList.value[currentIndex.value]);
  }, 1000);
});
</script>

<style scoped lang="scss">
// props로 보내줄 class

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
    flex-shrink: 1;
    align-items: center;
    user-select: none;
    justify-content: space-between;
    padding: 0 3%;
    height: 100%;
    .playerControl {
      display: flex;
      align-items: center;
      gap: 1rem;

      .time {
        display: flex;
        gap: 1rem;
      }
    }

    // & div {
    //   flex-basis: 20% 50% 30%;
    // }

    .musicInfo {
      display: flex;
      gap: 3rem;
      width: 50%;
      .title {
        color: white;
      }
    }

    .soundControl {
      display: flex;
      gap: 0.3rem;
      div {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
