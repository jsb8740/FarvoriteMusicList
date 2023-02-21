<template>
  <div>
    <PlayList>
      <PlayListItem></PlayListItem>
    </PlayList>

    <hr />
    <div>
      <h1>저장한 플레이리스트</h1>
      <div>플레이리스트들</div>
    </div>

    <!-- 컴포넌트화 해야할듯 -->

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
