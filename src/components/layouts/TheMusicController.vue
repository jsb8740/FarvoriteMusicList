<template>
  <div class="controller">
    <div class="progress">
      <svg></svg>
    </div>

    <div class="MusicPlayer">
      <img src="@/assets/test/test1.jpg" alt="" />

      <div class="test">ff</div>
      <div class="soundControl">
        <Heart></Heart>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Heart from "../icons/Heart.vue";
</script>

<style scoped lang="scss">
@import "@/assets/color.scss";
.controller {
  background-color: white;
  // height: 6.5rem;
  // padding-right: 3rem;

  .MusicPlayer {
    display: flex;
    align-items: center;
    .test {
      display: flex;
      width: 100%;
      justify-content: center;
      background-color: greenyellow;
    }
  }

  .progress {
    background-color: rgb(222, 222, 222);
    svg {
      display: block;
      background-color: $orangeColor;
      height: 7px;
      width: 75%;
    }
  }

  img {
    width: 6.5rem;
  }
}
</style>
