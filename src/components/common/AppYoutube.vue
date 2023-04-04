<template>
  <div id="player" class="player"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
export interface Props {
  videoId: string;
}

onMounted(() => {
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);

  setTimeout(() => {
    console.log(tag);
    var player!: any;
    player = new (window as any).YT.Player("player", {
      height: "0",
      width: "0",
      videoId: "iqe220lkJzc",
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
    function onPlayerReady(event: Record<string, any>) {
      console.log(typeof event);

      event.target.playVideo();
    }
    var done = false;
    function onPlayerStateChange(event: Record<string, any>) {
      console.log(typeof event);

      if (event.data == (window as any).YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 10000);
        done = true;
      }
    }
    function stopVideo() {
      player.stopVideo();
    }
  }, 1000);
});
</script>

<style scoped lang="scss">
.player {
  visibility: hidden;
}
</style>
