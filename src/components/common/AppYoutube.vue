<template>
  <div id="player" class="player"></div>
  <!-- <div ref="test" id="test"></div> -->
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import {
  useSoundControllerStore,
  MuteState,
} from "@/stores/soundController.js";
import { storeToRefs } from "pinia";
import { useMusicControllerStore } from "@/stores/musicController";

export interface Props {
  videoId: string;
}

const soundStore = useSoundControllerStore();
const { volume, muteFlag } = storeToRefs(soundStore);
const musicPlayStore = useMusicControllerStore();
const { isPaused, duration, clickedTime, currentTime, currentIndex, playList } =
  storeToRefs(musicPlayStore);
// const test = ref(null);

class youtubePlayer {
  player?: YT.Player;
  currentTimeInterval?: number;

  constructor() {
    // binding
    this.onPlayerReady = this.onPlayerReady.bind(this);
  }
  loadIFrame() {
    return new Promise<any>((resolve, reject) => {
      this.scriptLoad();

      window.onYouTubeIframeAPIReady = () => {
        resolve(window.YT);
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

  private onPlayerStateChange(event: YT.OnStateChangeEvent) {
    console.log("stateChange");
    // console.log(musicPlayStore.dynamicMusicdWidth);
  }
  // class에서는 arrow function 안쓰는게 좋음
  private onPlayerReady(event: YT.PlayerEvent) {
    this.setVolume(volume.value);
    this.setMute(muteFlag.value);
    // console.log(isPaused.value);
    console.log(this.player?.getDuration());
    duration.value = this.player?.getDuration() as number;
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

  private setPaused(isPaused: boolean) {
    if (isPaused) {
      this.player?.pauseVideo();
    } else {
      this.player?.playVideo();
    }
  }

  getCurrentTime() {
    console.log("currentTime", isPaused.value);
    this.currentTimeInterval = setInterval(() => {
      this.player?.getCurrentTime();
    }, 1000);

    if (isPaused.value == false) {
    } else if (isPaused.value) {
      // isPaused가 ture이면 clear
      clearInterval(this.currentTimeInterval);
    }
  }

  async createPlayer() {
    await this.loadIFrame();

    this.player = new YT.Player("player", {
      height: "105",
      width: "200",
      videoId: "iqe220lkJzc",
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange,
      },
    });
  }

  updatedVideo(state: string) {
    switch (state) {
      case "paused":
        this.setPaused(isPaused.value);
        break;
      case "muted":
        this.setMute(muteFlag.value);
        break;
      case "volume":
        this.setVolume(volume.value);
        break;
      case "videoId":
        const videoId = playList.value[currentIndex.value];
        this.player?.loadVideoById({ videoId });
        if (isPaused.value) {
          this.setPaused(isPaused.value);
        }
        break;
      case "videoTime":
        this.player?.seekTo(currentTime.value, true);
        if (isPaused.value) {
          this.setPaused(isPaused.value);
        }
        break;
      default:
        break;
    }
  }
}

// update current Time
watch(isPaused, (newValue) => {
  if (newValue) {
    clearInterval(player.currentTimeInterval);
  } else {
    player.currentTimeInterval = setInterval(() => {
      console.log(player.player?.getCurrentTime());

      // 3.5.. 이렇게 오기에 올림으로 보내줌
      musicPlayStore.setCurrentTitme(
        Math.ceil(player.player?.getCurrentTime() as number)
      );
    }, 1000);

    player.player?.getDuration();
  }
});

// volume update
watch([volume, isPaused], (newValue) => {
  console.log("watch");

  player.updatedVideo("volume");
  player.updatedVideo("paused");
});

// video time update
watch(clickedTime, (newValue) => {
  player.updatedVideo("videoTime");
});

//  video Id update
watch(currentIndex, () => {
  player.updatedVideo("videoId");
});

const player = new youtubePlayer();
onMounted(() => {
  // init();
  player.loadIFrame();
  player.createPlayer();

  // player.getCurrentTime();
  // 추가 할것
  /*
    isPause가 false
    setinterval ㄱㄱ
    ispause가 true면
    clearinterval
    --OK--

    store에 time변수를 추가하거나
    emit으로 위로 올려보내기

    player.seekTo(seconds:Number, allowSeekAhead:Boolean):Void
    로 지정한 시간 이동 ok

    soundcontroll의 작동방식이랑
    videoProgressBar랑 같은 작동 방식으로
    class extends 느낌? ok

    그리고 store의 musiccontroll를
    youtube 폴더 밑의
    videoControll
    soundControll로 분리 ok

    player.getPlayerState로 종료가 뜨면
    다음 곡으로 이동
  */
});
</script>

<style scoped lang="scss">
.player {
  visibility: hidden;
}
</style>
