<template>
  <!-- <div v-if="initialized" id="container"> -->
  <div id="container">
    <TheHeader class="head"></TheHeader>
    <TheView></TheView>
    <TheFooter class="foot"></TheFooter>
    <!-- <TheMusicController class="controller"></TheMusicController> -->
    <AppYoutube
      v-show="false"
      @unstarted="unstarted"
      @ended="ended"
      @playing="playing"
      @paused="paused"
      @buffering="buffering"
      @stateChange="stateChange"
      @ready="ready"
    ></AppYoutube>
  </div>
</template>
<script setup lang="ts">
import AppYoutube from "@/components/common/AppYoutube.vue";
import TheHeader from "./components/layouts/TheHeader.vue";
import TheView from "./components/layouts/TheView.vue";
import TheFooter from "./components/layouts/TheFooter.vue";
import { onMounted, ref } from "vue";
import { Connector, type TableProperties } from "@/indexedDB/connector";
import { useIndexedDBStore } from "@/stores/indexedDB";
import { useMusicControllerStore } from "./stores/musicController";
import { useSoundControllerStore } from "./stores/soundController";
import { storeToRefs } from "pinia";

const store = useIndexedDBStore();

const initialized = ref(false);

const tables = [
  { name: "favorites" },
  { name: "playlists" },
  { name: "sams" },
] as TableProperties[];

onMounted(() => {
  // initialize();
  store.updateFavList();
});

const initialize = async () => {
  try {
    await Promise.all([initializeIndexedDB()]);
  } finally {
    initialized.value = true;
  }
};

// youtube iframe

const currentTimeInterval = ref(0);

const musicStore = useMusicControllerStore();
const { playList, currentIndex, isPaused, currentTimePercent } =
  storeToRefs(musicStore);

const soundStore = useSoundControllerStore();
const { isMute, volume } = storeToRefs(soundStore);

const initializeIndexedDB = async () => {
  await Connector.create({
    database: "favorite_music",
    tables,
    version: 1,
    sync: true,
  });

  let database = await Connector.instance.getDatabase();
};

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
// #container {
//   // background-color: rgb(249, 249, 249);
//   // width: 100%;
//   // height: 100%;
//   // margin: 0 auto;

//   display: grid;
//   grid-template-columns: 1fr 6fr;
//   grid-template-rows: 7fr auto;
//   height: 100dvh;

//   .controller {
//     grid-column: 1 / 3; // === grid-area: 2 / 1 / span 1 / span 2;
//     // display: none;
//   }

//   main {
//     overflow: hidden scroll;
//   }
// }
#container {
  width: 100%;
  height: 100%;
  background-color: black;
  display: grid;
  grid-template-rows: $headerHeight 100% $footerHeight;
  .head {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: black;
  }
  .foot {
    position: sticky;
    bottom: 0;
    z-index: 1;
    background-color: black;
    align-content: end;
    //
  }
}
</style>
