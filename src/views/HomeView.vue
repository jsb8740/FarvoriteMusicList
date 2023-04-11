<template>
  <TheViewLayout>
    <template #default>
      <div>
        <PlayList>
          <!-- <PlayListItem></PlayListItem>
          <PlayListItem></PlayListItem>
          <PlayListItem></PlayListItem>
          <PlayListItem></PlayListItem> -->
          <div>
            <AppProgressBar type="music-palyer"></AppProgressBar>
            <br />
            <AppProgressBar type="sound"></AppProgressBar>
            <br />
            <MusicListShuffleVue></MusicListShuffleVue>
          </div>
        </PlayList>
      </div>
    </template>
  </TheViewLayout>
</template>

<script setup lang="ts">
import TheViewLayout from "@/components/layouts/TheViewLayout.vue";
import PlayListItem from "@/components/playList/PlayListItem.vue";
import PlayList from "@/components/playList/PlayList.vue";
import SoundController from "@/components/musicController/SoundController.vue";
import AppProgressBar from "@/components/common/AppProgressBar.vue";
import MusicListShuffleVue from "@/components/musicController/MusicListShuffle.vue";
</script>
<style scoped lang="scss">
img {
  width: 24px;
}
</style>
