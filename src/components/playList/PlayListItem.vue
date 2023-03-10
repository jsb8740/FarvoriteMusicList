<template>
  <div class="listItem">
    <div class="thumbnail">
      <img src="@/assets/test/test1.jpg" class="" />
      <Heart class="favorite" />
    </div>

    <div class="title">
      <slot name="title">title</slot>
    </div>

    <div class="byWriter">
      <slot name="by">by test</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Heart from "@/components/icons/Heart.vue";
</script>

<style scoped lang="scss">
@import "@/assets/color.scss";
.listItem {
  margin: 0 2rem;
  display: inline-block;
  .byWriter {
    margin-top: 0.3rem;
    color: $greyColor;
  }

  .title {
    margin-top: 0.3rem;
  }

  .thumbnail {
    position: relative;
    img {
      width: 250px;
      height: 250px;

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
