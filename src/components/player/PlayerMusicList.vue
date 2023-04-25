<template>
  <div class="playList">
    <div class="header">
      노래 리스트
      <AppRandomButton @click="musicStore.shufflePlaylist"></AppRandomButton>
    </div>
    <ul class="listItem">
      <li v-for="item in props.musicList" :key="item">
        <PlayerListItem :video-id="item"> </PlayerListItem>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import PlayerListItem from "@/components/player/PlayerListItem.vue";
import AppRandomButton from "@/components/common/AppRandomButton.vue";
import { useMusicControllerStore } from "@/stores/musicController";

export interface Props {
  musicList: string[];
}

const props = defineProps<Props>();

const musicStore = useMusicControllerStore();
</script>

<style scoped lang="scss">
@import "@/assets/color.scss";
.playList {
  border: 0.3rem solid $pastel3;
  border-radius: 10%;
  width: 57%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .header {
    padding: 1.2rem 0 1.2rem 1.2rem;
    font-weight: 700;
    font-size: 1.6rem;
    background-color: $pastel4;
    display: flex;
  }

  .listItem {
    overflow-y: scroll;
    margin: 0;
    list-style: none;
    padding: 0 1rem;
  }
}
</style>
