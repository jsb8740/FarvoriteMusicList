import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";

export const enum MuteState {
  MUTE = 0,
  UN_MUTE = 1,
}

export const useSoundControllerStore = defineStore("music", () => {
  const storage = parseInt(localStorage.getItem("volume") as string);
  const volume = ref(storage);
  const volumeTmp = ref(0); // 뮤트인 경우 볼륨을 담는 임시변수 뮤트끝나면 복귀시키는 용도
  const isMute = ref(false); //뮤트 확인  플래그

  // 사운드 이미지 클릭시 소리 mute
  const setVolume = (newVolume: number) => {
    volume.value = newVolume;
  };

  const soundMute = () => {
    if (isMute.value === true) {
      // UN_MUTE인 상태
      isMute.value = false;
    } else {
      // Mute인 상태
      isMute.value = true;
    }

    switch (isMute.value) {
      case false:
        //뮤트 아닌 경우
        volume.value = volumeTmp.value;
        volumeTmp.value = 0;
        break;
      case true:
        // 뮤트인 경우
        volumeTmp.value = volume.value;
        volume.value = 0;
        break;
    }
  };

  // 마우스 휠 볼륨 핸들러
  const volumeUpDownHandler = (deltaY: number) => {
    volume.value += volumeUpDown(deltaY);
    volumeLimit();
  };

  const updateVolume = (offsetX: number, divWidth: number) => {
    isMute.value = false;
    volumeTmp.value = 0;
    volume.value = Math.round((offsetX / divWidth) * 100);
    // 200은 div의 넓이
  };

  // init
  const volumeInit = (): void => {
    if (localStorage.getItem("volume") === null) {
      // set Local Storage
      volume.value = 100;
      localStorage.setItem("volume", volume.value.toString());
      localStorage.setItem("volumeTmp", volumeTmp.value.toString());
      localStorage.setItem("mute", isMute.value.toString());
      return;
    }

    // get Local Storage
    volume.value = parseInt(localStorage.getItem("volume") as string);
    volumeTmp.value = parseInt(localStorage.getItem("volumeTmp") as string);
    isMute.value = JSON.parse(localStorage.getItem("mute") as string);
    return;
  };

  // private function
  const volumeUpDown = (upDown: number): number => {
    if (isMute.value === false) {
      // 뮤트가 아닌 경우

      if (upDown < 0) {
        //up
        return 5;
      } else if (upDown > 0) {
        //down
        return -5;
      }
    }
    // 뮤트인 경우
    return 0;
  };

  // private function
  //볼륨 0, 100 밖으로 안벗어나게
  const volumeLimit = () => {
    if (volume.value < 0) {
      volume.value = 0;
    } else if (volume.value > 100) {
      volume.value = 100;
    }
  };

  // auto set Local Storage
  watch(
    [volume, isMute, volumeTmp],
    (newValue, oldValue) => {
      if (newValue[0] !== oldValue[0]) {
        localStorage.setItem("volume", newValue[0].toString());
      }
      if (newValue[1] !== oldValue[1]) {
        localStorage.setItem("mute", newValue[1].toString());
      }
      if (newValue[2] !== oldValue[2]) {
        localStorage.setItem("volumeTmp", newValue[2].toString());
      }
    },
    { immediate: false }
  );
  return {
    volume,
    isMute,
    soundMute,
    updateVolume,
    volumeInit,
    volumeUpDownHandler,
    setVolume,
  };
});
