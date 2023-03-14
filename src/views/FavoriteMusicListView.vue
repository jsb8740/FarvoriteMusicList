<template>
  <TheViewLayout>
    <template #default>
      <h2>Favorite Musics</h2>
      <div>
        <MusicItem></MusicItem>
        <MusicItem></MusicItem>
      </div>

      <!-- Music Itme을 2초 정도 누르면 드래그앤 드롭이 가능하게끔 -->
    </template>
  </TheViewLayout>
</template>

<script setup lang="ts">
import TheViewLayout from "@/components/layouts/TheViewLayout.vue";
import MusicItem from "@/components/playList/musicList/MusicItem.vue";
</script>

<style scoped></style>
