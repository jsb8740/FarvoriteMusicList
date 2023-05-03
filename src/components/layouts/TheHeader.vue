<template>
  <header class="header" role="navigation">
    <!-- <img src="@/assets/test/Logo-Test.png" alt="TestLogo" /> -->

    <div class="menu">
      <div class="routes" v-show="!isSearch">
        <RouterLink :to="{ name: 'Home' }">
          <Home></Home>
          홈
        </RouterLink>

        <RouterLink :to="{ name: 'FavoriteMusic' }">
          <MenuHeart></MenuHeart>
          Favorites
        </RouterLink>
        <RouterLink :to="{ name: 'MyPlayList' }"> My PlayList </RouterLink>

        <div @click="clickSearchBtn" class="searchIcon">
          <Search></Search>
          검색
        </div>
      </div>

      <AppSearchingBox
        v-show="isSearch"
        class="searchBox"
        :is-search="isSearch"
        @close="closeEmit"
      ></AppSearchingBox>
    </div>
  </header>
</template>

<script setup lang="ts">
import Home from "@/components/icons/Home.vue";
import MenuHeart from "@/components/icons/MenuHeart.vue";
import AppSearchingBox from "@/components/AppSearchingBox.vue";
import Search from "../icons/Search.vue";
import { ref } from "vue";

const isSearch = ref(false);

const clickSearchBtn = () => {
  isSearch.value = !isSearch.value;
};
const closeEmit = (value: boolean) => {
  isSearch.value = value;
};
</script>

<style scoped lang="scss">
.router-link-exact-active {
  border-radius: 0.8rem;
  // width: 100%;

  background-color: white;
  color: $orangeColor;
  &::v-deep(svg) {
    // color: $orangeColor;
    fill: $orangeColor;
  }
}
// color: rgb(164, 164, 174);
.header {
  color: white;
  display: block;
  font-size: $headerFontSize;
  // background-color: $pastel3;
  background-color: inherit;
  margin: 0 auto;
  width: 100%;
  .menu {
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    height: 100%;
    gap: 12%;
    .routes {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12%;
      flex-basis: 0;
    }

    .searchIcon {
      cursor: pointer;
    }
    .searchBox {
      width: 50%;
      height: 70%;
    }

    &::v-deep(.searchIcon) {
      // color: $orangeColor;
      fill: $orangeColor;
    }
  }
}

a {
  appearance: none;
  display: flex !important;
  gap: 0.7rem;
  align-items: center;
  text-decoration: none;
  color: white;
  display: block;
  padding: 0.2rem 0.5rem;
  height: 100%;
}
</style>
