<template>
  <input
    type="range"
    min="0"
    max="100"
    :value="type === 'sound' ? volume : currentTimePercent"
    @input="onInputSlidereValue"
    @wheel.prevent="onMouseWheel"
    ref="slider"
  />
  <!-- :style="inputStyle" -->
</template>

<script setup lang="ts">
import { useMusicControllerStore } from "@/stores/musicController";
import { useSoundControllerStore } from "@/stores/soundController";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";

export interface Props {
  type: string;
  // typeValue: number;
}
const props = defineProps<Props>();
const soundStore = useSoundControllerStore();
const { volume } = storeToRefs(soundStore);
const musicStore = useMusicControllerStore();
const { currentTime, duration, currentTimePercent } = storeToRefs(musicStore);
const slider = ref<HTMLElement | null>(null);

const inputStyle = computed(() =>
  props.type === "sound"
    ? `--ProgressPercent: ${volume.value}%`
    : "--ProgressPercent: 0%"
);

const onInputSlidereValue = (event: Event) => {
  const value = Number((event.target as HTMLInputElement).value);
  if (props.type === "sound") {
    soundStore.setVolume(value);
  } else {
    console.log(value);
    musicStore.setCurrentTime(value, "percent");
    // musicStore.setCurrentTimePercent(value);
  }
};
const onMouseWheel = (e: WheelEvent) => {
  if (props.type === "sound") {
    soundStore.volumeUpDownHandler(e.deltaY);
  }
};

const getProgressWidth = (value: number, min: number, max: number) => {
  const widthPercent = ((value - min) / (max - min)) * 100;
  return widthPercent;
};

const setProgressCss = (width: number) => {
  (slider.value as HTMLElement).style.setProperty(
    "--ProgressPercent",
    `${width}%`
  );
};

onMounted(() => {
  soundStore.volumeInit();
  if (props.type !== "sound") {
    (slider.value as HTMLInputElement).defaultValue = "0";
  }
});

watch(currentTime, () => {
  if (props.type !== "sound") {
    const percent = Math.round((currentTime.value / duration.value) * 100);
    // const extraWidth = (100 - percent) / 10;
    musicStore.setCurrentTimePercent(percent);
  }
});

watch(currentTimePercent, () => {
  if (props.type !== "sound") {
    setProgressCss(Math.ceil(currentTimePercent.value));
  }
});

watch(volume, () => {
  // console.log(props.typeValue);
  if (volume.value === 0 && props.type === "sound") {
    setProgressCss(0);
  }

  if (props.type === "sound") {
    // const min = Number((slider.value as HTMLInputElement).min);
    // const max = Number((slider.value as HTMLInputElement).max);
    // const widthPercent = getProgressWidth(volume.value as number, min, max);
    setProgressCss(volume.value);
  }
});
</script>

<style scoped lang="scss">
@import "@/assets/color.scss";

/* style the input element with type "range" */
input[type="range"] {
  display: inline-block;
  width: 100%;
  position: relative;
  appearance: none;
  /* pointer-events: none; */
  border-radius: 999px;
  z-index: 0;
  cursor: pointer;

  --trackHeight: 0.3rem;
  --thumbRadius: 0.8rem;
  &::before {
    content: "";
    position: absolute;
    //   100% -> default value
    width: var(--ProgressPercent, 0);
    height: 100%;
    background: $orangeColor;
    /* z-index: -1; */
    pointer-events: none;
    border-radius: 999px;
  }

  &::-webkit-slider-runnable-track {
    appearance: none;
    background: rgb(222, 222, 222);
    height: var(--trackHeight);
    border-radius: 999px;
  }

  &::-moz-range-track {
    appearance: none;
    background: rgb(222, 222, 222);
    height: var(--trackHeight);
    border-radius: 999px;
  }

  &::-webkit-slider-thumb {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    width: var(--thumbRadius);
    height: var(--thumbRadius);
    /* margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2); */
    background: $orangeColor;
    border-radius: 999px;
    pointer-events: all;
    appearance: none;
    z-index: 1;
  }
}

/* ::before element to replace the slider track */

/* `::-webkit-slider-runnable-track` targets the track (background) of a range slider in chrome and safari browsers. */

/* `::-moz-range-track` targets the track (background) of a range slider in Mozilla Firefox. */
</style>
