<template>
  <div class="playList">
    <div class="top">노래 리스트</div>
    <ol class="listItem">
      <li v-for="item in props.musicList" :key="item">
        <PlayerListItem :video-id="item"> </PlayerListItem>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import PlayerListItem from "@/components/player/PlayerListItem.vue";
export interface Props {
  musicList: string[];
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.playList {
  width: 49%;
  height: 100%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;

  .top {
    padding: 1.2rem 0 1.2rem 1.2rem;
    font-weight: 700;
    font-size: 1.6rem;
    background-color: rgb(214, 212, 219);
  }

  ol {
    li {
      &:nth-child(odd) {
      }
      &:nth-child(even) {
      }
    }
    margin: 0;
    overflow-y: scroll;
  }

  .listItem {
  }
}
</style>
