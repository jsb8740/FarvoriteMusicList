<template>
  <header class="header" role="navigation" ref="header">
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
import Home from "@/components/icons/menu/MenuHome.vue";
import MenuHeart from "@/components/icons/menu/MenuHeart.vue";
import AppSearchingBox from "@/components/AppSearchingBox.vue";
import Search from "../icons/searchingBox/Search.vue";
import { ref } from "vue";

const header = ref<HTMLElement | null>(null);
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
  // border-radius: 0.8rem;
  // width: 100%;

  // background-color: white;
  border-bottom: 0.23rem solid $orangeColor;
  color: $orangeColor;
  &::v-deep(svg) {
    // color: $orangeColor;
    fill: $orangeColor;
  }

  &:hover {
    border-bottom: 0.23rem solid $orangeColor;
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
  display: block;
  padding: 0.2rem 0.5rem;
  height: 100%;

  &:hover {
    border-bottom: 0.2rem solid $orangeColor;
  }
}
</style>
