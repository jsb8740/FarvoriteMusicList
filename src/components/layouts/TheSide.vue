<template>
  <aside class="header" role="navigation">
    <img src="@/assets/test/Logo-Test.png" alt="" />

    <div>
      <div class="category">Menu</div>

      <RouterLink :to="{ name: 'Home' }">
        <div>홈</div>
      </RouterLink>

      <div>카테고리</div>

      <div>TOP100</div>
    </div>

    <div>
      <div class="category">Playlists</div>

      <RouterLink :to="{ name: 'OpenPlayList' }">
        <div>공개된 플레이리스트</div>
      </RouterLink>
    </div>
  </aside>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: column;

  max-width: 12rem;

  gap: 2rem;
  font-size: 1.4rem;
  position: sticky;
  top: 0px;

  background-color: rgb(242, 241, 246);
  padding: 0 2.4rem;

  .category {
    color: rgb(164, 164, 174);
    margin: 1em 0;
  }
}
</style>
