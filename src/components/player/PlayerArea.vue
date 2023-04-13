<template>
  <div class="playerArea">
    <div class="player">
      <img :src="thumbnailURL" class="" />

      <div class="marquee">
        <div class="title">
          <span>{{ title }}</span>
          <span>{{ title }}</span>
        </div>
      </div>
      <AppProgressBar type="video"></AppProgressBar>
      <AppProgressBar type="sound"></AppProgressBar>
    </div>
    <div class="playList">노래 리스트</div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import AppProgressBar from "../common/AppProgressBar.vue";
import { useMusicControllerStore } from "@/stores/musicController";
import { storeToRefs } from "pinia";
import { useIndexedDBStore } from "@/stores/indexedDB";

const dbStore = useIndexedDBStore();

const MusicStore = useMusicControllerStore();
const { currentIndex, playList } = storeToRefs(MusicStore);
const title = ref("");

const thumbnailURL = computed(
  () =>
    `https://i.ytimg.com/vi/${playList.value[currentIndex.value]}/hqdefault.jpg`
);

onMounted(async () => {
  title.value = await dbStore.getPlaylistTitle(
    playList.value[currentIndex.value]
  );
});
</script>

<style scoped lang="scss">
.playerArea {
  gap: 2%;
  display: flex;
  width: 70rem;
  margin: 0 auto;
  height: 30rem;

  .player {
    width: 49%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 7rem;
    box-sizing: border-box;

    img {
      width: 100%;
    }
    .marquee {
      position: relative;
      width: 100%;
      height: 2.5rem;
      overflow: hidden;
      .title {
        position: absolute;
        animation: textLoop 7s linear infinite;
        white-space: nowrap;
        height: 2.5rem;
        span {
          font-weight: 700;
          font-size: 1.5em;

          white-space: nowrap;
          float: left;
          width: 100%;
        }
      }
    }
  }
  .playList {
    width: 49%;
    overflow-y: scroll;
    border: 1px solid black;
  }
}

@keyframes textLoop {
  0% {
    //transform: translate3d(0, 0, 0);
    left: 0;
  }
  100% {
    //transform: translate3d(-100%, 0, 0);
    left: -100%;
  }
}
</style>
