<template>
  <TheViewLayout>
    <template #title> Favorite Musics </template>
    <template #default>
      <div v-if="playList.length !== 0">
        <PlayListItem
          v-for="item in favSongList"
          :video-id="item.videoId"
          :title="item.title"
        >
        </PlayListItem>
      </div>

      <div v-else class="notPlaylist">
        좋아요한 노래가 없어요. 노래를 추가해 주세요!
      </div>
    </template>
  </TheViewLayout>
</template>

<script setup lang="ts">
import TheViewLayout from "@/components/layouts/TheViewLayout.vue";
import PlayListItem from "@/components/playList/PlayListItem.vue";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useIndexedDBStore } from "@/stores/indexedDB";
import AppPlayButton from "@/components/common/AppPlayButton.vue";
import { useMusicControllerStore } from "@/stores/musicController";

const store = useIndexedDBStore();
const { favSongList } = storeToRefs(store);

const musicStore = useMusicControllerStore();
const { playList } = storeToRefs(musicStore);
onMounted(() => {
  store.updateFavList();
  // console.log(favSongList.value);
});
</script>

<style scoped lang="scss">
.notPlaylist {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.35rem;
  margin-top: 10rem;
}
a {
  text-decoration: none;
}
</style>
