<template>
  <TheViewLayout>
    <template #default>
      <h2>Favorite Musics</h2>
      <div>
        <PlayListItem
          v-for="item in favSongList"
          :video-id="item.videoId"
          :title="item.title"
        >
        </PlayListItem>
      </div>

      <!-- <AppYoutube></AppYoutube> -->
    </template>
  </TheViewLayout>
</template>

<script setup lang="ts">
import TheViewLayout from "@/components/layouts/TheViewLayout.vue";
import PlayListItem from "@/components/playList/PlayListItem.vue";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useIndexedDBStore } from "@/stores/indexedDB";
import AppYoutube from "@/components/common/AppYoutube.vue";

const store = useIndexedDBStore();
const { favSongList } = storeToRefs(store);

onMounted(() => {
  store.updateFavList();
  // console.log(favSongList.value);
});
</script>

<style scoped lang="scss"></style>
