<template>
  <div class="searchingBox">
    <Search></Search>

    <!-- input은 이벤트 버블링인가 그걸 막아야할듯 -->
    <!-- transition 애니메이션 넣기 -->
    <input type="text" placeholder="검색" @click.stop />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Search from "./icons/Search.vue";
</script>

<style scoped lang="scss">
.searchingBox {
  display: flex;
  align-items: center;
  background-color: white;

  width: 20em;

  input {
    // border: 0;
  }
}

@keyframes inputWidth {
  0% {
    width: 10px;
  }
  100% {
    width: 100px;
  }
}
</style>
