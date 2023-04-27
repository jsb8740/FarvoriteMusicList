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
const { volume, isMute } = storeToRefs(soundStore);
const musicPlayStore = useMusicControllerStore();
const { isPaused, currentTime, currentIndex, playList, currentTimeClick } =
  storeToRefs(musicPlayStore);

let player: YT.Player;
let currentTimeInterval: number;

const scriptLoad = () => {
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
};

const loadIFrame = () => {
  return new Promise<any>((resolve) => {
    scriptLoad();

    window.onYouTubeIframeAPIReady = () => {
      resolve(window.YT.Player);
    };
  });
};

const createPlayer = async () => {
  await loadIFrame();

  player = new YT.Player("player", {
    height: "200",
    width: "400",
    videoId: "",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
};

const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
  console.log("stateChange", event);
  // console.log(musicPlayStore.dynamicMusicdWidth);
  switch (event.data) {
    case YT.PlayerState.UNSTARTED:
      // unstarted
      break;
    case YT.PlayerState.ENDED:
      // finished
      musicPlayStore.setCurrentTime(0);
      musicPlayStore.nextIndex();
      break;
    case YT.PlayerState.PLAYING:
      // playing
      break;
    case YT.PlayerState.PAUSED:
      // paused
      // updatedVideo("paused");
      break;
    case YT.PlayerState.BUFFERING:
      // buffering

      break;
    case YT.PlayerState.CUED:
      // video cued
      break;
  }
  const fullTime = player.getDuration();
  musicPlayStore.setDuration(fullTime);
  console.log("BUFFERING");
  console.log(fullTime);
};

const onPlayerReady = (event: YT.PlayerEvent) => {
  setVolume(volume.value);
  setMute(isMute.value);
  const fullTime = player.getDuration();
  console.log(fullTime);
  // duration.value = player.getDuration() as number;
  musicPlayStore.setDuration(fullTime);
  // this.player?.playVideo();
};

//////////////////////////////////
// setVideo function
//////////////////////////////////
const setMute = (muteType: boolean) => {
  if (muteType === true) {
    player.mute();
  } else {
    player.unMute();
  }
};
const setVolume = (volume: number) => {
  player.setVolume(volume);
};

const setPaused = (isPaused: boolean) => {
  if (isPaused) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
};
const setVideo = (type: string) => {
  switch (type) {
    case "videoTime":
      //시간 이동
      player.seekTo(currentTime.value, true);
      break;
    case "videoId":
      const videoId = playList.value[currentIndex.value];
      player.loadVideoById({ videoId });
      break;
    default:
  }
  const fullTime = player.getDuration();
  musicPlayStore.setDuration(fullTime);

  if (isPaused.value) {
    setPaused(isPaused.value);
  }
};

const updatedVideo = (state: string) => {
  switch (state) {
    case "paused":
      setPaused(isPaused.value);
      break;
    case "muted":
      setMute(isMute.value);
      break;
    case "volume":
      setVolume(volume.value);
      break;
    case "videoId":
      setVideo(state);
      break;
    case "videoTime":
      setVideo(state);
      break;
    default:
      break;
  }
};

// update current Time
watch(isPaused, (newValue) => {
  if (newValue === true) {
    clearInterval(currentTimeInterval);
  } else {
    currentTimeInterval = setInterval(() => {
      // 3.5.. 이렇게 오기에 올림으로 보내줌
      musicPlayStore.setCurrentTime(
        Math.ceil(player.getCurrentTime() as number)
      );
      console.log(Math.ceil(player.getCurrentTime() as number));
    }, 1000);
  }
});

watch(playList, () => {
  musicPlayStore.changePauseState();
  updatedVideo("videoId");
});

// volume update
watch(volume, () => {
  updatedVideo("volume");
});

watch(isPaused, () => {
  updatedVideo("paused");
});

// video time update
watch(currentTimeClick, (newValue) => {
  updatedVideo("videoTime");
});

//  video Id update
watch(currentIndex, (newValue) => {
  updatedVideo("videoId");
});

onMounted(() => {
  createPlayer();

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
