<template>
  <aside class="side" role="navigation">
    <img src="@/assets/test/Logo-Test.png" alt="TestLogo" />

    <div>
      <div class="category">Menu</div>

      <RouterLink :to="{ name: 'Home' }" @click="checkClicked">
        <Home :clicked="propsClicked"></Home>
        홈
      </RouterLink>

      <RouterLink :to="{ name: 'FavoriteMusic' }">
        <MenuHeart></MenuHeart>
        Favorites
      </RouterLink>

      <RouterLink :to="{ name: 'OpenPlayList' }"> 카테고리 </RouterLink>

      <RouterLink :to="{ name: 'Home' }" class=""> TOP100 </RouterLink>
    </div>

    <div>
      <div class="category">Playlists</div>

      <RouterLink :to="{ name: 'OpenPlayList' }"> Open PlayList </RouterLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
import Home from "@/components/icons/Home.vue";
import MenuHeart from "@/components/icons/MenuHeart.vue";

import { ref, computed } from "vue";
const propsClicked = ref(false);

const checkClicked = (event: InputEvent) => {
  propsClicked.value = (event.target as HTMLInputElement).classList.contains(
    "router-link-exact-active"
  );
  console.log(propsClicked.value);
};
</script>

<style scoped lang="scss">
@import "@/assets/color.scss";
.router-link-exact-active {
  border-radius: 0.8rem;
  // width: 100%;

  background-color: white;
  color: $orangeColor;
  // >>> svg.fill {
  //   fill: $orangeColor;
  // }
}

.side {
  display: flex;
  flex-direction: column;
  min-width: 10rem;

  gap: 2rem;
  font-size: 1.4rem;

  background-color: rgb(242, 241, 246);
  padding: 0 2.4rem;

  .category {
    color: rgb(164, 164, 174);
    margin: 1em 0;
    font-weight: 700;
  }
}

a {
  display: flex !important;
  gap: 0.7rem;
  align-items: center;
  text-decoration: none;
  color: black;
  width: 100%;
  display: block;
  padding: 0.5rem;
  margin: 0.4rem 0;
}
</style>
