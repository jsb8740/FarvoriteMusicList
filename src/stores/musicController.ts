import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useMusicControllerStore = defineStore("play", () => {
  const currentTime = ref(0);
  const duration = ref(0);
  const isPaused = ref(true); // 음악 시작 state
  const clickedTime = ref(0);

  const dynamicMusicdWidth = computed(
    () => `${Math.round((currentTime.value / duration.value) * 100)}%`
  );

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
  };
});
