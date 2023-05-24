<template>
  <div>
    <div>
      <YoutubePlayer
        :video-id="youtubePlayerStore.currentMusic"
        :is-paused="youtubePlayerStore.isPaused"
      ></YoutubePlayer>
    </div>
    <br /><br /><br />
    <SearchingBox></SearchingBox>
    <RouterView></RouterView>
    <YoutubeController></YoutubeController>
  </div>
</template>
<script setup lang="ts">
import SearchingBox from '@/components/search/SearchingBox.vue';
import YoutubePlayer from '@/components/youtube/YoutubePlayer.vue';
import YoutubeController from '@/components/youtube/YoutubeController.vue';
import { useYoutubePlayerStore } from '@/stores/youtubeplayer';

const youtubePlayerStore = useYoutubePlayerStore();
</script>

<style scoped></style>
