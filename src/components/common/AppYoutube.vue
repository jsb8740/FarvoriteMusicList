<template>
  <!-- <div id="player" class="player"></div> -->
  <div ref="test" id="test"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useMusicControllerStore, MuteState } from "@/stores/musicController";
import { storeToRefs } from "pinia";

export interface Props {
  videoId: string;
}

const store = useMusicControllerStore();
const { volume, muteFlag } = storeToRefs(store);

const test = ref(null);

class youtubePlayer {
  private player?: YT.Player;

  private test = 3;
  constructor() {
    // binding
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.loadIFrame();
  }
  private loadIFrame() {
    return new Promise<any>((resolve, reject) => {
      this.scriptLoad();

      window.onYouTubeIframeAPIReady = () => {
        // resolve(window.YT);
        this.createPlayer();
        resolve("d");
      };
    });
  }

  private scriptLoad() {
    const firstScript = document.getElementsByTagName("script")[0];
    const script = document.createElement("script");
    // script를 태그를 만들고
    // script 값을 줌
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;

    script.onerror = function () {
      // this == script
      this.onload = null;
      this.onerror = null;
    };

    if (firstScript) {
      // firstscript.parentNode == head
      // inserBefore는 자식 노드를 삽입
      // script를 firstscript 앞에 삽입
      firstScript.parentNode?.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  // class에서는 arrow function 안쓰는게 좋음
  private onPlayerReady(event: YT.PlayerEvent) {
    // console.log("event", event.target);

    // console.log("test", this.test);

    this.setVolume(volume.value);
    this.setMute(muteFlag.value);
    // this.player?.playVideo();
  }
  private setMute(muteType: MuteState) {
    if (muteType === MuteState.MUTE) {
      this.player?.mute();
    } else {
      this.player?.unMute();
    }
  }
  private setVolume(volume: number) {
    this.player?.setVolume(volume);
  }

  async createPlayer() {
    await this.loadIFrame();

    this.player = new YT.Player("test", {
      height: "360",
      width: "640",
      videoId: "iqe220lkJzc",
      events: {
        onReady: this.onPlayerReady,
        onStateChange: () => {},
      },
    });
  }
}
// const init = async () => {
//   const YT = await loadIFrame();
//   test.value = new YT.Player("test", {
//     height: "360",
//     width: "640",
//     videoId: "iqe220lkJzc",
//     events: {
//       onReady: onPlayerReady,
//       onStateChange: onPlayerStateChange,
//     },
//   });
// };

function onPlayerReady(event: Record<string, any>) {
  console.log(typeof event);
  event.target.setVolume(volume.value);
  event.target.playVideo();
}
var done = false;
function onPlayerStateChange(event: Record<string, any>) {
  console.log(typeof event);

  if (event.data == window.YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 10000);
    done = true;
  }
}
function stopVideo() {
  (test.value as any).stopVideo();
}

onMounted(() => {
  // init();
  const player = new youtubePlayer();
  player.createPlayer();
});

// watch(volume, (newValue) => {
//   console.log(newValue);

//   player.setVolume(newValue);
// });
</script>

<style scoped lang="scss">
.player {
  visibility: hidden;
}
</style>
