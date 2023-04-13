<template>
  <TheViewLayout>
    <template #default>
      <div class="test">
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

        <PlayerArea></PlayerArea>
        <AppMarquee></AppMarquee>
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
import PlayerArea from "@/components/player/PlayerArea.vue";
import AppMarquee from "@/components/common/AppMarquee.vue";
</script>
<style scoped lang="scss">
img {
  width: 24px;
}
.test {
  width: 100%;
}
</style>
