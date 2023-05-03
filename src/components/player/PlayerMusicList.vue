<template>
  <div class="playList">
    <div class="header">
      <div class="text">노래 리스트</div>

      <AppRandomButton @click="musicStore.shufflePlaylist">
        랜덤 재생
      </AppRandomButton>
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
.playList {
  border: 0.3rem solid $playListBorder;
  border-radius: 2%;
  width: 57%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .header {
    padding: 1.4rem;
    background-color: transparent;
    border-bottom: solid 3px $listItemBorder;
    display: flex;
    justify-content: space-between;
    .text {
      font-weight: 700;
      font-size: 2rem;
      color: white;
    }
  }

  .listItem {
    overflow-y: scroll;
    margin: 0;
    list-style: none;
    padding: 0 1rem;
    li {
      // border: solid 1px $listItemBorder;
      border-bottom: solid 1px $listItemBorder;

      &:nth-last-child(-n + 1) {
        border: none;
      }
    }
  }
}

::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: $progressBackground;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: $orangeColor;
  border-radius: 999px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: $orangeSoftColor;
}
</style>
