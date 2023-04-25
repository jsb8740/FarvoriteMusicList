<template>
  <main role="main">
    <div class="searching">
      <AppSearchingBox></AppSearchingBox>
      <AppDarkMode></AppDarkMode>
    </div>
    <RouterView></RouterView>
  </main>
</template>

<script setup lang="ts">
import AppDarkMode from "../AppDarkMode.vue";
import AppSearchingBox from "../AppSearchingBox.vue";
</script>

<style scoped lang="scss">
@import "@/assets/color.scss";
main {
  width: 100%;
  height: 100%;
  background-color: $mainbackground;
  // background-color: $pastel4;
  padding: 2rem 3rem;
  box-sizing: border-box;
  .searching {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
    //
  }
}
</style>
