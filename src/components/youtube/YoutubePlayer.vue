<template>
  <div id="player"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

interface Props {
  videoId: string;
  isPaused: boolean;
}

interface Emits {
  (e: 'ready', player: YT.Player): void;
  (e: 'unstarted', player: YT.Player): void;
  (e: 'ended', player: YT.Player): void;
  (e: 'playing', player: YT.Player): void;
  (e: 'paused', player: YT.Player): void;
  (e: 'buffering', player: YT.Player): void;
  (e: 'stateChange', player: YT.Player): void;
  (e: 'changeVideoId', videoId: string): void;
  (e: 'changeVideoIdSample', videoId: string): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const player = ref<YT.Player | null>(null);

const initYoutubePlayer = async () => {
  try {
    await loadYouTubeIframeAPI();
    console.log('YouTube iframe API script loaded');
    if (window.youtubeIframeAPIReady) {
      createPlayer();
    } else {
      console.error('Failed to initialize YouTube iframe API');
    }
  } catch (error) {
    console.error('Failed to load YouTube iframe API script:', error);
  }
};
const loadYouTubeIframeAPI = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;

    script.onerror = reject;

    window.onYouTubeIframeAPIReady = () => {
      window.youtubeIframeAPIReady = true;
      resolve();
    };

    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(script, firstScript);
  });
};

const createPlayer = () => {
  const playerElement = document.getElementById('player') as HTMLElement;

  const videoID = props.videoId;
  const autoPlay = props.isPaused ? 0 : 1;

  player.value = new YT.Player(playerElement, {
    height: 315,
    width: 560,
    videoId: videoID,
    playerVars: { start: 0, autoplay: autoPlay },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
      // "onPlaybackQualityChange": onPlaybackQualityChange,
      // "onPlaybackRateChange": onPlaybackRateChange,
      // "onError": onError,
    }
  });
};
const onPlayerReady = (event: YT.PlayerEvent) => {
  emit('ready', event.target);
};

const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
  switch (event.data) {
    case window.YT.PlayerState.UNSTARTED:
      emit('unstarted', event.target);
      break;
    case window.YT.PlayerState.ENDED:
      emit('ended', event.target);
      break;
    case window.YT.PlayerState.PLAYING:
      emit('playing', event.target);
      break;
    case window.YT.PlayerState.PAUSED:
      emit('paused', event.target);
      break;
    case window.YT.PlayerState.BUFFERING:
      emit('buffering', event.target);
      break;
  }
  emit('stateChange', event.target);
};

onMounted(() => {
  initYoutubePlayer().then(() => {
    console.log('success YoutubePlayer');
  });
});

watch(
  () => props.videoId,
  (newVideoId: string) => {
    player.value?.loadVideoById(props.videoId);
    if (props.isPaused) {
      player.value?.pauseVideo();
    }
    emit('changeVideoId', newVideoId);
  }
);

watch(
  () => props.isPaused,
  (newIsPaused) => {
    console.log(newIsPaused);

    if (newIsPaused) {
      player.value?.pauseVideo();
    } else {
      player.value?.playVideo();
    }
  }
);
</script>

<style scoped lang="scss"></style>
