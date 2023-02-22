<template>
  <div class="listItem">
    <img src="@/assets/test/test1.jpg" class="" />
    <div>
      <slot name="title">title</slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
img {
  width: 200px;
  height: 200px;
}
.listItem {
  margin: 0 2rem;
}
</style>
