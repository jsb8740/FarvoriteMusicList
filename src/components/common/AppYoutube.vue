<template>
  <div ref="player" id="player"></div>
</template>

<script setup lang="ts">
import { useMusicControllerStore } from "@/stores/musicController";
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useSoundControllerStore } from "@/stores/soundController";

export interface Props {
  videoId?: string;
}

export interface Emits {
  (e: "ready", player: YT.Player): void;
  (e: "unstarted", player: YT.Player): void;
  (e: "ended", player: YT.Player): void;
  (e: "playing", player: YT.Player): void;
  (e: "paused", player: YT.Player): void;
  (e: "buffering", player: YT.Player): void;
  (e: "stateChange", player: YT.Player): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const player = ref<YT.Player | null>(null);
const loadAPI = () => {
  const firstScript = document.getElementsByTagName("script")[0];
  const script = document.createElement("script");
  script.src = "https://www.youtube.com/iframe_api";
  script.async = true;
  if (firstScript) {
    firstScript.parentNode?.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }
};

const checkTYLoaded = () => {
  return new Promise<void>((resolve) => {
    window.onYouTubeIframeAPIReady = () => {
      resolve();
    };
  });
};

const createPlayer = () => {
  const playerElement = document.getElementById("player") as HTMLElement;
  // const videoID = props.videoId;
  const videoID = props.videoId;

  player.value = new YT.Player(playerElement, {
    height: 0,
    width: 0,
    videoId: "x3MY6ueZNNA",
    playerVars: { start: 0 },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
      // "onPlaybackQualityChange": onPlaybackQualityChange,
      // "onPlaybackRateChange": onPlaybackRateChange,
      // "onError": onError,
      // "onApiChange": onApiChange,
    },
  });
};
const onPlayerReady = (event: YT.PlayerEvent) => {
  emit("ready", event.target);
};

const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
  switch (event.data) {
    case window.YT.PlayerState.UNSTARTED:
      emit("unstarted", event.target);
      break;
    case window.YT.PlayerState.ENDED:
      emit("ended", event.target);
      break;
    case window.YT.PlayerState.PLAYING:
      emit("playing", event.target);
      break;
    case window.YT.PlayerState.PAUSED:
      emit("paused", event.target);
      break;
    case window.YT.PlayerState.BUFFERING:
      emit("buffering", event.target);
      break;
  }
  emit("stateChange", event.target);
};

onMounted(async () => {
  loadAPI();
  await checkTYLoaded();
  createPlayer();
  setTimeout(() => {
    (player.value as YT.Player).loadVideoById(musicStore.getVideoId);
    (player.value as YT.Player).stopVideo();
  }, 1300);
});

const musicStore = useMusicControllerStore();
const {
  playList,
  currentIndex,
  isPaused,
  duration,
  currentTime,
  currentTimeClick,
} = storeToRefs(musicStore);

const soundStore = useSoundControllerStore();
const { volume } = storeToRefs(soundStore);

const setVideoPlay = (isPausedValue: boolean) => {
  if (isPausedValue) {
    (player.value as YT.Player).pauseVideo();
  } else {
    (player.value as YT.Player).playVideo();
  }
};
// Update Sound
watch(volume, (newVolume, old) => {
  if (!player.value) {
    return;
  }
  (player.value as YT.Player).setVolume(newVolume);
});

// Update video
watch(currentTimeClick, (newCurrentTimeClick) => {
  if (!player.value) {
    return;
  }

  if (duration.value === 0) {
    musicStore.setCurrentTimePercent(0);
  }
  const time = Math.round((duration.value * newCurrentTimeClick) / 100);
  musicStore.setCurrentTime(time);
  (player.value as YT.Player).seekTo(time, !isPaused.value);
});

watch(currentTime, (newCurrentTime) => {
  if (!player.value) {
    return;
  }
  console.log("newCurrentTime", newCurrentTime);

  const time = Math.round((newCurrentTime / duration.value) * 100);
  if (newCurrentTime === 0 || duration.value === 0)
    musicStore.setCurrentTimePercent(0);
  else musicStore.setCurrentTimePercent(time);
});

watch(currentIndex, (newCurrentIndex) => {
  if (!player.value) {
    return;
  }
  const videoId = playList.value[newCurrentIndex];
  (player.value as YT.Player).loadVideoById(videoId);
  setVideoPlay(isPaused.value);
});

watch(playList, (newPlayList, oldPlayList) => {
  // 예외처리 f5시 아무것도 안하는거
  if (oldPlayList.length === 0) {
    return;
  }
  const videoId = newPlayList[currentIndex.value];
  (player.value as YT.Player).loadVideoById({ videoId });
  setVideoPlay(isPaused.value);
});

watch(isPaused, (newIsPaused) => {
  if (!player.value) {
    return;
  }
  setVideoPlay(newIsPaused);
});
</script>

<style scoped lang="scss"></style>
