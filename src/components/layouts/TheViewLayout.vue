<template>
  <div>
    <div class="header">
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
.header {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
}
</style>
