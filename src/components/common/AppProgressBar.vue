<template>
  <div style="width: 100%">
    <input
      type="range"
      class="progress"
      v-model="typeWidth"
      @wheel.prevent.stop="onMouseWheel"
      @click="onMouseClick"
      ref="bar"
    />
  </div>
</template>

<script setup lang="ts">
import { useMusicControllerStore } from "@/stores/musicController";
import { useSoundControllerStore } from "@/stores/soundController";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
export interface Props {
  type: string;
}

const props = defineProps<Props>();
const bar = ref<HTMLFormElement | null>(null);

const soundStore = useSoundControllerStore();
const musicPlayStore = useMusicControllerStore();
const { volume } = storeToRefs(soundStore);
const { currentTime, duration } = storeToRefs(musicPlayStore);

const typeWidth = computed({
  get() {
    {
      if (props.type === "sound") {
        return volume.value;
      } else {
        const time = Math.round((currentTime.value / duration.value) * 100);
        if (isNaN(time)) {
          return 0;
        } else {
          return time;
        }
      }
    }
  },
  set() {},
});

const onMouseWheel = (e: WheelEvent) => {
  if (props.type === "sound") {
    soundStore.volumeUpDownHandler(e.deltaY);
  }
};

const onMouseClick = (e: MouseEvent) => {
  // 클릭시 마우스 체크
  console.log("click", e.offsetX, progressBarWidth);

  if (props.type === "sound") {
    soundStore.updateVolume(e.offsetX, progressBarWidth);
  } else {
    musicPlayStore.updateTime(e.offsetX, progressBarWidth);
  }
};

const onMouseUp = (e: MouseEvent) => {
  console.log("release", e.offsetX, progressBarWidth);
  if (props.type === "sound") {
    soundStore.updateVolume(e.offsetX, progressBarWidth);
  } else {
    musicPlayStore.updateTime(e.offsetX, progressBarWidth);
  }
};

let progressBarWidth: number;
onMounted(() => {
  soundStore.volumeInit();
  progressBarWidth = (bar.value as HTMLFormElement).clientWidth;
});
</script>

<style scoped lang="scss">
@import "@/assets/color.scss";
input[type="range"] {
  // appearance: none;
  // -webkit-appearance: none;
  // background: transparent;

  // cursor: pointer;

  // width: 100%;
  // border: 1px solid black;
  // height: 0.3rem;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  cursor: pointer;
  outline: none;
  border-radius: 15px;
  height: 6px;
  background: #ccc;

  &::-webkit-slider-thumb {
    // appearance: none;
    // -webkit-appearance: none;

    // background-color: $yellowPastel;
    // cursor: pointer;
    // border: 0.1px solid $yellowPastel;
    // height: 1rem;
    // width: 1rem;
    // border-radius: 100%;
    // // box-shadow: -100vw 0 100vw dodgerblue;

    // box-shadow: -1000% 0 0 1000% dodgerblue;
    -webkit-appearance: none;
    appearance: none;
    height: 15px;
    width: 15px;
    background-color: #f50;
    border-radius: 50%;
    border: none;
    transition: 0.2s ease-in-out;
  }

  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    background-color: red;
  }
}
</style>
