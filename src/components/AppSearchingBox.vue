<template>
  <div class="searchingBox" @input="test">
    <Search></Search>

    <!-- input은 이벤트 버블링인가 그걸 막아야할듯 -->
    <!-- transition 애니메이션 넣기 -->
    <input type="text" placeholder="Search" />
  </div>
</template>

<script setup lang="ts">
import Search from "./icons/Search.vue";
import axios from "axios";

const test = () => {
  axios.get("/api/search").then((req) => {
    console.log(req.data);
  });
};
</script>

<style scoped lang="scss">
.searchingBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30rem;
  background-color: white;
  border-radius: 1.5rem;
  padding: 0.7rem;

  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.12);
  &:focus {
    border: 1px solid #ef7330;
  }

  input {
    padding-left: 1rem;
    font-size: 1rem;
    border: none;
    outline: none;
    width: 100%;

    &:focus {
    }
  }
}
</style>
