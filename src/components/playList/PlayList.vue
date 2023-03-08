<template>
  <div>
    <div class="PlayList">
      <h1>
        <slot name="playListTitle">PlayList</slot>
      </h1>

      <RouterLink :to="{ name: 'MorePlayList' }" class="moreView">
        Show More →
      </RouterLink>
    </div>

    <div class="playListItem">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
.playListItem {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  margin-bottom: 6.5rem;

  &:deep(.listItem):nth-child(1) {
    margin-left: 0;
  }

  &:deep(.listItem):nth-last-child(1) {
    margin-right: 0;
  }
}
.PlayList {
  display: flex;
  justify-content: space-between;

  .moreView {
    align-self: center;
    text-decoration: none;
  }
}
</style>
