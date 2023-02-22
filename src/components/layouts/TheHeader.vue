<template>
  <div class="header" role="search">
    <RouterLink :to="{ name: 'Home' }">
      <div>홈</div>
    </RouterLink>
    <RouterLink :to="{ name: 'OpenPlayList' }">
      <div>플레이리스트</div>
    </RouterLink>

    <div>TOP100</div>
    <AppSearchingBox></AppSearchingBox>
  </div>
</template>

<script setup lang="ts">
import AppSearchingBox from "../AppSearchingBox.vue";
</script>

<style scoped lang="scss">
.header {
  display: flex;
  gap: 3rem;
  justify-content: center;
  font-size: x-large;
  position: sticky;
  top: 8px;
  margin-bottom: 4rem;
}
</style>
