<template>
  <div class="controller">
    <div class="progress">
      <svg></svg>
    </div>

    <div class="musicPlayer">
      <div class="musicInfo">
        <!-- <img src="@/assets/test/test1.jpg" alt="" /> -->
        <AppYoutube></AppYoutube>

        <div class="music">
          <!-- 전광판 효과 추가 -->
          <div class="title">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </div>
          <div class="artist">artist</div>
        </div>
      </div>

      <!-- <MusicPlayer></MusicPlayer> -->

      <div class="soundControl">
        <!-- <Heart video-id="undefined"></Heart> -->
        <!-- <SoundController></SoundController> -->
        <!-- <AppProgressBar type="sound"></AppProgressBar> -->
        <!-- soundcontroller의 의존성 분리가 필요함 -->
        <!-- TheMusicController를 layouts을 다른 곳을 이동함 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppProgressBar from "../common/AppProgressBar.vue";
import AppYoutube from "@/components/common/AppYoutube.vue";
</script>

<style scoped lang="scss">
@import "@/assets/color.scss";
.controller {
  background-color: white;
  // height: 6.5rem;
  // padding-right: 3rem;

  .musicPlayer {
    display: flex;
    align-items: center;
    user-select: none;
    justify-content: space-between;

    & div {
      flex-basis: 33.3%;
    }

    .musicInfo {
      display: flex;
      gap: 3rem;
    }

    .soundControl {
      display: flex;
      justify-content: flex-end;
    }

    .music {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      padding-top: 0.6rem;

      &:nth-child(1) div {
        user-select: text;
      }

      .title {
        width: 10rem;
      }
      .artist {
        color: $greyColor;
      }
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
