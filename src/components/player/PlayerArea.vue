<template>
  <div class="playerArea">
    <div class="player">
      <img :src="thumbnailURL" class="" />

      <AppMarquee is-play="play">
        <template #default>
          <div v-html="title" class="title"></div>
        </template>
      </AppMarquee>

      <PlayerController></PlayerController>

      <div class="sound">
        <div @click="soundStore.soundMute">
          <img v-show="soundMuteImg" src="@/assets/volumeMute-white.png" />
          <img v-show="soundLowImg" src="@/assets/volumeLow-white.png" />
          <img v-show="soundHighImg" src="@/assets/volumeHigh-white.png" />
        </div>

        <div>
          <AppProgressBar type="sound"></AppProgressBar>
        </div>
      </div>

      <br />

      <div class="timeLine">
        <AppProgressBar type="time"></AppProgressBar>
        {{ startTime }}
        ///
        {{ lastTime }}
      </div>
      <!-- <test type="sound"></test> -->
    </div>

    <PlayerMusicList :music-list="playList"></PlayerMusicList>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useMusicControllerStore } from "@/stores/musicController";
import { useIndexedDBStore } from "@/stores/indexedDB";
import AppMarquee from "../common/AppMarquee.vue";
import { storeToRefs } from "pinia";
import PlayerMusicList from "./PlayerMusicList.vue";
import PlayerController from "./PlayerController.vue";
import AppProgressBar from "../common/AppProgressBar.vue";
import { useSoundControllerStore } from "@/stores/soundController";

export interface Props {
  type: string;
}
const props = defineProps<Props>();

const dbStore = useIndexedDBStore();

const soundStore = useSoundControllerStore();
const { volume } = storeToRefs(soundStore);
const musicStore = useMusicControllerStore();
const { currentIndex, playList, currentTime, duration, currentTimePercent } =
  storeToRefs(musicStore);
const title = ref("");

const thumbnailURL = computed(
  () =>
    `https://i.ytimg.com/vi/${playList.value[currentIndex.value]}/hqdefault.jpg`
);

const checkProps = () => {
  if (props.type === "favorites") {
    musicStore.inputPlayList();
  } else {
  }
};

const formattingTime = (time: number) => {
  const value = Math.floor(time) % 60;
  console.log(value);

  if (value < 10) {
    return `0${value}`;
  }
  return value;
};

const startTime = computed(() => {
  const current = currentTime.value;
  const hours = Math.floor((current / 3600) % 24);
  const minutes = formattingTime(current / 60);

  const seconds = formattingTime(current);
  if (hours === 0) {
    return `${minutes}:${seconds}`;
  } else {
    return `${hours}:${minutes}:${seconds}`;
  }
});
const lastTime = computed(() => {
  const current = duration.value;
  const hours = Math.floor((current / 3600) % 24);
  const minutes = formattingTime(current / 60);

  const seconds = formattingTime(current);
  if (hours === 0) {
    return `${minutes}:${seconds}`;
  } else {
    return `${hours}:${minutes}:${seconds}`;
  }
});

// // sound img 컨트롤
const soundMuteImg = computed<boolean>(() =>
  volume.value === 0 ? true : false
);
const soundLowImg = computed<boolean>(() =>
  volume.value > 0 && volume.value <= 50 ? true : false
);
const soundHighImg = computed<boolean>(() =>
  volume.value > 50 && volume.value <= 100 ? true : false
);

watch(thumbnailURL, async () => {
  title.value = await dbStore.getPlaylistTitle(
    playList.value[currentIndex.value]
  );
});
onMounted(() => {
  checkProps();
});
</script>

<style scoped lang="scss">
@import "@/assets/color.scss";
.playerArea {
  gap: 1.8%;
  display: flex;
  flex-wrap: wrap;
  width: 70rem;
  margin: 0 auto;
  height: 40rem;

  .player {
    width: 40%;
    border: 0.3rem solid $pastel3;
    border-radius: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
    box-sizing: border-box;
    .sound {
      width: 25%;
      align-self: flex-end;
      display: flex;
      justify-self: center;
      gap: 0.3rem;

      div {
        display: flex;
        align-items: center;
        img {
          width: 1.1rem;
          height: 1.1em;
          margin: 0;
        }
      }
    }

    .title {
      display: flex;
      align-items: center;
      white-space: nowrap;
      font-size: 1.7rem;
      font-weight: 500;
      width: 100%;
    }

    img {
      width: 100%;
      margin-bottom: 2rem;
    }
  }
}
</style>
