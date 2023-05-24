import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useYoutubePlayerStore = defineStore('youtubePlayer', () => {
  const isPaused = ref(true);
  const playList = ref<string[]>(['Xp67XibsxKs', 'IJkGt2d5DHU', 'M7b1iEgQN_M']);
  const currentIndex = ref(0);

  const currentMusic = computed(() => {
    if (playList.value.length === 0) return 'undefined';
    return playList.value[currentIndex.value];
  });

  const nextOrPrev = (next: number) => {
    currentIndex.value += next;

    if (currentIndex.value < 0) {
      currentIndex.value = playList.value.length - 1;
    }
    currentIndex.value = currentIndex.value % playList.value.length;
  };

  const togglePause = () => {
    isPaused.value = !isPaused.value;
  };
  return { isPaused, currentIndex, currentMusic, togglePause, nextOrPrev };
});
