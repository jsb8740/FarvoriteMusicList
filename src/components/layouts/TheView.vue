<template>
  <main role="main">
    <RouterView></RouterView>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
main {
  width: 100%;
  height: 100%;
  // background-color: rgb(249, 249, 249);
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
