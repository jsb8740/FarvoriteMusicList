<template>
  <div class="playerList">
    <img
      src="https://i.ytimg.com/vi/FUcekBiR1aU/mqdefault.jpg"
      alt=""
      class="thumbnail"
    />

    <div class="title">title</div>

    <!-- 나중에 시간도 넣어야할듯함 -->
    <!-- <div>4:23</div> -->

    <div class="paused">
      <PausedIcon></PausedIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import PausedIcon from "@/components/icons/PausedIcon.vue";
</script>

<style scoped lang="scss">
.playerList {
  display: flex;
  align-items: center;
  .thumbnail {
    width: 160px;
    height: 100px;
    border-radius: 10%;
  }

  .title {
    display: flex;
    align-items: center;
  }
  .paused {
    cursor: pointer;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 100%;
    padding: 0.3rem 0.2rem 0.3rem 0.3rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.18);

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
