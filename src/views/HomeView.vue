<template>
  <TheViewLayout>
    <template #default>
      <div>
        <PlayList>
          <PlayListItem></PlayListItem>
          <PlayListItem></PlayListItem>
          <PlayListItem></PlayListItem>
          <PlayListItem></PlayListItem>
        </PlayList>
      </div>
    </template>
  </TheViewLayout>
</template>

<script setup lang="ts">
import TheViewLayout from "@/components/layouts/TheViewLayout.vue";
import PlayListItem from "@/components/playList/PlayListItem.vue";
import PlayList from "@/components/playList/PlayList.vue";
import SoundController from "@/components/music-controller/SoundController.vue";
</script>
<style scoped lang="scss">
img {
  width: 24px;
}
</style>
