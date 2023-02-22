<template>
  <div class="searchingBox" @click="visible = !visible">
    <Search></Search>

    <!-- input은 이벤트 버블링인가 그걸 막아야할듯 -->
    <!-- transition 애니메이션 넣기 -->
    <input type="text" :hidden="visible" />

    <div>검색</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Search from "./icons/Search.vue";

const visible = ref(true);
</script>

<style scoped lang="scss">
.searchingBox {
  cursor: pointer;
  display: flex;

  align-items: center;
  &:hover {
  }
}
</style>
