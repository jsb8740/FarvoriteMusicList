<template>
  <TheViewLayout>
    <template #title> Favorite Musics </template>
    <template #default>
      <div>
        <PlayListItem
          v-for="item in favSongList"
          :video-id="item.videoId"
          :title="item.title"
        >
        </PlayListItem>
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

const store = useIndexedDBStore();
const { favSongList } = storeToRefs(store);

onMounted(() => {
  store.updateFavList();
  // console.log(favSongList.value);
});
</script>

<style scoped lang="scss">
.content-header {
  display: flex;
  justify-content: space-between;
  .text {
    font-weight: 700;
  }
}
a {
  text-decoration: none;
}
</style>
