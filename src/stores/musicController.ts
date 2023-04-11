import { computed, ref, toRef, toRefs } from "vue";
import { defineStore } from "pinia";
import { useIndexedDBStore } from "./indexedDB";

export const useMusicControllerStore = defineStore("play", () => {
  const currentTime = ref(0);
  const duration = ref(0);
  const isPaused = ref(true); // 음악 시작 state
  const clickedTime = ref(0);
  const playList = ref<string[]>([]);
  const indexedDBStore = useIndexedDBStore();

  const dynamicMusicdWidth = computed(
    () => `${Math.round((currentTime.value / duration.value) * 100)}%`
  );

  const inputPlayList = async () => {
    playList.value = await indexedDBStore.getPlayList;
    console.log(playList.value);
  };
  const shufflePlaylist = () => {
    if (playList.value.length === 0) return;

    // 원본 복사
    const originalArray: string[] = Object.values(playList.value);

    const shuffleArray: string[] = [];

    // 피셔 예이츠 셔플
    while (true) {
      if (originalArray.length === 0) {
        break;
      }
      const randomNumberIndex = Math.floor(
        Math.random() * originalArray.length
      );
      const sliceValue = originalArray.splice(randomNumberIndex, 1).toString();
      shuffleArray.push(sliceValue);
    }

    console.log(shuffleArray);
  };

  const setCurrentTitme = (nowTime: number) => {
    currentTime.value = nowTime;
  };

  const changePauseState = () => {
    isPaused.value = !isPaused.value;
  };

  const updateTime = (offsetX: number) => {
    clickedTime.value = Math.round(
      duration.value * Number((offsetX / 200).toFixed(2))
    );
    currentTime.value = clickedTime.value;
    console.log(currentTime.value);

    // 200은 div의 넓이
  };

  return {
    clickedTime,
    currentTime,
    isPaused,
    duration,
    dynamicMusicdWidth,
    setCurrentTitme,
    changePauseState,
    updateTime,
    shufflePlaylist,
    inputPlayList,
  };
});
