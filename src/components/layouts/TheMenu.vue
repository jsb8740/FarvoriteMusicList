<template>
  <div class="wrap">
    <div class="menu">
      <RouterLink :to="{ name: 'Home' }" @click="checkClicked">
        <Home :clicked="propsClicked"></Home>
        홈
      </RouterLink>
      <RouterLink :to="{ name: 'MyPlayList' }"> My PlayList </RouterLink>
      <RouterLink :to="{ name: 'FavoriteMusic' }">
        <MenuHeart></MenuHeart>
        Favorites
      </RouterLink>
    </div>

    <div class="searching">
      <AppSearchingBox></AppSearchingBox>
      <AppDarkMode></AppDarkMode>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuHeart from "@/components/icons/MenuHeart.vue";
import { ref } from "vue";
import AppDarkMode from "../AppDarkMode.vue";
import AppSearchingBox from "../AppSearchingBox.vue";
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

.wrap {
  display: flex;
  justify-content: space-around;
  background-color: rgb(242, 241, 246);
  justify-content: center;
  align-items: center;
  gap: 3rem;
  .menu {
    display: flex;

    padding: 2rem 0;
    gap: 2rem;

    a {
      width: 12rem;
      font-size: 1.6rem;
      font-weight: 700;
      text-decoration: none;
      align-items: center;
      justify-content: center;
      display: flex;
    }
  }
  .searching {
    display: flex;
    justify-content: space-between;

    //
  }
}
</style>
