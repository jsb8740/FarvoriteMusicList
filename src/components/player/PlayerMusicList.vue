<template>
  <div class="playList">
    <div class="top">노래 리스트</div>
    <ul class="listItem">
      <li v-for="item in props.musicList">
        <PlayerListItem :video-id="item"> </PlayerListItem>
      </li>
    </ul>
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

  border: 1px solid black;
  display: flex;
  flex-direction: column;

  .top {
    padding: 1.2rem 0 1.2rem 1.2rem;
    font-weight: 700;
    font-size: 1.6rem;
    background-color: rgb(214, 212, 219);
  }

  li {
    list-style: none;
    &:nth-child(odd) {
    }
    &:nth-child(even) {
    }
  }

  .listItem {
    margin: 0;
    overflow-y: scroll;
  }
}
</style>
