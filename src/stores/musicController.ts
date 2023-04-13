import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useIndexedDBStore } from "./indexedDB";

export const useMusicControllerStore = defineStore("play", () => {
  const currentTime = ref(0);
  const duration = ref(0);
  const isPaused = ref(true); // 음악 시작 state
  const clickedTime = ref(0);
  const playList = ref<string[]>([]);
  const indexedDBStore = useIndexedDBStore();
  const currentIndex = ref(0);
  // 재생버튼 누를시 inpoutPlayList로 세팅을하고
  // index 0번 나옴

  // computed
  const dynamicMusicdWidth = computed(
    () => `${Math.round((currentTime.value / duration.value) * 100)}%`
  );
  // methods
  const nextIndex = () => {
    currentIndex.value++;
    if (
      playList.value.length === currentIndex.value ||
      playList.value.length === 0
    ) {
      currentIndex.value = 0;
    }
    // return playList.value[currentIndex.value];
  };

  const previousIndex = () => {
    currentIndex.value--;
    if (currentIndex.value < 0) {
      currentIndex.value = playList.value.length - 1;
    }

    // return playList.value[currentIndex.value];
  };

  const inputPlayList = async () => {
    playList.value = await indexedDBStore.getPlayList();
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

    playList.value = shuffleArray;
    console.log("shuffle", playList.value);
  };

  const setDuration = (fullTime: number) => {
    duration.value = Math.round(fullTime);
  };

  const setCurrentTitme = (nowTime: number) => {
    currentTime.value = nowTime;
  };

  const changePauseState = () => {
    isPaused.value = !isPaused.value;
  };

  const updateTime = (offsetX: number, divWidth: number) => {
    clickedTime.value = Math.round(
      duration.value * Number((offsetX / divWidth).toFixed(2))
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
    currentIndex,
    playList,
    previousIndex,
    nextIndex,
    setCurrentTitme,
    setDuration,
    changePauseState,
    updateTime,
    shufflePlaylist,
    inputPlayList,
  };
});
