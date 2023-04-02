<template>
  <TheViewLayout>
    <template #default>
      <h2>Favorite Musics</h2>
      <div>
        <!-- <MusicItem></MusicItem>
        <MusicItem></MusicItem> -->
        <PlayListItem v-for="item in favSongList" :video-id="item.videoId">
        </PlayListItem>
        <!-- <div v-for="item in favSongList">
            {{ item.videoId }}
          </div> -->
      </div>

      <!-- Music Itme을 2초 정도 누르면 드래그앤 드롭이 가능하게끔 -->
    </template>
  </TheViewLayout>
</template>

<script setup lang="ts">
import TheViewLayout from "@/components/layouts/TheViewLayout.vue";
import PlayListItem from "@/components/playList/PlayListItem.vue";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useIndexedDBStore } from "@/stores/indexedDB";

const store = useIndexedDBStore();
const { favSongList } = storeToRefs(store);

onMounted(() => {
  store.getFavList();
  // console.log(favSongList.value);
});
</script>

<style scoped lang="scss"></style>
