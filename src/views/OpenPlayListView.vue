<template>
  <div>
    <PlayList>
      <div v-for="index in 4" :key="index">
        <PlayListItem></PlayListItem>
      </div>
    </PlayList>

    <hr />

    <PlayList>
      <template #playListTitle>저장한 플레이리스트</template>
      <div v-for="index in 4" :key="index">
        <PlayListItem></PlayListItem>
      </div>
    </PlayList>

    <hr />

    <div>
      <h1>공개된 플레이리스트</h1>
      <div>플레이리스트들</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayList from "@/components/playList/PlayList.vue";
import PlayListItem from "@/components/playList/PlayListItem.vue";
</script>

<style scoped></style>
