import { computed, getCurrentInstance, ref } from "vue";
import { defineStore } from "pinia";
import { useIndexedDBStore } from "./indexedDB";

export const useMusicControllerStore = defineStore("music", () => {
  const currentTime = ref(0);
  const duration = ref(0);
  const isPaused = ref(true); // 음악 시작 state
  const playList = ref<string[]>([]);
  const currentTimePercent = ref(0); // 현재 음악 % input value
  const currentTimeClick = ref(0); //누른 음악 시간
  const currentIndex = ref(0);
  // 재생버튼 누를시 inpoutPlayList로 세팅을하고
  // index 0번 나옴
  const indexedDBStore = useIndexedDBStore();

  // methods
  const moveMusic = (videoId: string) => {
    // console.log(playList.value.findIndex((item) => item === videoId));
    const index = playList.value.findIndex((item) => item === videoId);
    currentIndex.value = index;
  };

  const setCurrentTimePercent = (percent: number) => {
    currentTimePercent.value = percent;
    // console.log(currentTimePercent.value);
    // currentTime.value = Math.round((duration.value * percent) / 100);
  };

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
    // (status + 1) % 4
    // return playList.value[currentIndex.value];
  };

  const inputPlayList = async () => {
    playList.value = await indexedDBStore.getPlayList();
    // console.log(playList.value);
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

  const setCurrentTime = (nowTime: number) => {
    let time = nowTime;
    currentTime.value = time;
  };
  const setCurrentTimeClick = (percent: number) => {
    currentTimeClick.value = percent;
  };

  const changePauseState = () => {
    isPaused.value = !isPaused.value;
  };

  return {
    currentTime,
    isPaused,
    duration,
    currentIndex,
    playList,
    currentTimePercent,
    currentTimeClick,
    previousIndex,
    nextIndex,
    setCurrentTime,
    setDuration,
    changePauseState,
    shufflePlaylist,
    inputPlayList,
    moveMusic,
    setCurrentTimePercent,
    setCurrentTimeClick,
  };
});
