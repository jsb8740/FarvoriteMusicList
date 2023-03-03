<template>
  <div class="listItem">
    <div class="thumbnail">
      <img src="@/assets/test/test1.jpg" class="" />
      <Heart class="favorite" />
    </div>
    <div>
      <slot name="title">title</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Heart from "@/components/icons/Heart.vue";
</script>

<style scoped lang="scss">
.listItem {
  margin: 0 2rem;
  display: inline-block;
  .thumbnail {
    position: relative;
    img {
      width: 200px;
      height: 200px;

      border-radius: 1rem;
    }
    .favorite {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
}
</style>
