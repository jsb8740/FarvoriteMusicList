<template>
  <div class="playerArea">
    <div class="player">
      <img :src="thumbnailURL" class="" />

      <AppMarquee>
        <template #default>
          <div v-html="title" class="title"></div>
        </template>
      </AppMarquee>

      <PlayerController></PlayerController>

      <!-- 밑에 현재시간도 같이 출력해야할듯 -->
      <AppProgressBar type="video"></AppProgressBar>
      <div>
        {{ currentTime }}
        &nbsp;
        {{ duration }}
      </div>

      <AppProgressBar type="sound"></AppProgressBar>

      <test></test>
    </div>

    <PlayerMusicList :music-list="playList"></PlayerMusicList>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import AppProgressBar from "../common/AppProgressBar.vue";
import { useMusicControllerStore } from "@/stores/musicController";
import { useIndexedDBStore } from "@/stores/indexedDB";
import AppMarquee from "../common/AppMarquee.vue";
import test from "@/components/common/test.vue";
import { storeToRefs } from "pinia";
import PlayerMusicList from "./PlayerMusicList.vue";
import PlayerController from "./PlayerController.vue";

const dbStore = useIndexedDBStore();

const musicStore = useMusicControllerStore();
const { currentIndex, playList, currentTime, duration } =
  storeToRefs(musicStore);
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
</script>

<style scoped lang="scss">
.playerArea {
  gap: 1.8%;
  display: flex;
  flex-wrap: wrap;
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

    .title {
      display: flex;
      align-items: center;
      white-space: nowrap;

      width: 100%;
    }

    img {
      width: 100%;
    }
  }
}
</style>
