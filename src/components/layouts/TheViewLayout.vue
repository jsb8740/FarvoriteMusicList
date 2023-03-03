<template>
  <div class="contentLayout">
    <div class="searching">
      <AppSearchingBox></AppSearchingBox>
      <AppDarkMode></AppDarkMode>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import AppDarkMode from "../AppDarkMode.vue";
import AppSearchingBox from "../AppSearchingBox.vue";
</script>

<style scoped lang="scss">
.contentLayout {
  padding: 2rem 3rem;
  //   height: 100%;
}
.searching {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  //
}
</style>
