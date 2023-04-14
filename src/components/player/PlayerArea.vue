<template>
  <div class="playerArea">
    <div class="player">
      <img :src="thumbnailURL" class="" />

      <AppMarquee>
        <template #default>
          <div v-html="title"></div>
        </template>
      </AppMarquee>

      <div class="musicController">
        <div class="previous">
          <PreviousIcon></PreviousIcon>
        </div>

        <div class="paused">
          <PausedIcon></PausedIcon>
        </div>

        <div class="next">
          <NextIcon></NextIcon>
        </div>
      </div>

      <!-- 밑에 현재시간도 같이 출력해야할듯 -->
      <AppProgressBar type="video"></AppProgressBar>
      <div>0:00 4:23</div>

      <AppProgressBar type="sound"></AppProgressBar>

      <test></test>
    </div>

    <div class="playList">
      <div class="">노래 리스트</div>
      <PlayerList v-for="i in 3"></PlayerList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import AppProgressBar from "../common/AppProgressBar.vue";
import { useMusicControllerStore } from "@/stores/musicController";
import { storeToRefs } from "pinia";
import { useIndexedDBStore } from "@/stores/indexedDB";
import AppMarquee from "../common/AppMarquee.vue";
import PausedIcon from "@/components/icons/PausedIcon.vue";
import test from "@/components/common/test.vue";
import NextIcon from "../icons/NextIcon.vue";
import PreviousIcon from "../icons/PreviousIcon.vue";
import PlayerList from "@/components/player/PlayerList.vue";

const dbStore = useIndexedDBStore();

const MusicStore = useMusicControllerStore();
const { currentIndex, playList } = storeToRefs(MusicStore);
const title = ref("");

const thumbnailURL = computed(
  () =>
    `https://i.ytimg.com/vi/${playList.value[currentIndex.value]}/hqdefault.jpg`
);

watch(thumbnailURL, async () => {
  title.value = await dbStore.getPlaylistTitle(
    playList.value[currentIndex.value]
  );
});

onMounted(async () => {});
</script>

<style scoped lang="scss">
.playerArea {
  gap: 2%;
  display: flex;
  width: 70rem;
  margin: 0 auto;
  height: 40rem;

  .player {
    width: 49%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 7rem;
    box-sizing: border-box;

    .musicController {
      display: flex;
      align-items: center;
      gap: 3.4rem;
      margin-top: 0.5rem;
      margin-bottom: 1rem;

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
        background-color: white;
        border-radius: 100%;
        padding: 0.5rem 0.4rem 0.5rem 0.5rem;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.18);

        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    img {
      width: 100%;
    }
  }
  .playList {
    width: 49%;
    overflow-y: scroll;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
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
