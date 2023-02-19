<template>
  <div class="header">
    <RouterLink :to="{ name: 'Home' }">
      <div>홈</div>
    </RouterLink>
    <RouterLink :to="{ name: 'OpenPlayList' }">
      <div>플레이리스트</div>
    </RouterLink>

    <div>TOP100</div>
    <div>
      <input type="text" />
      검색
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.header {
  display: flex;
  gap: 30px;
  justify-content: center;
  font-size: x-large;
  position: sticky;
  top: 8px;
}
</style>
