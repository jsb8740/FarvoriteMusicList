<template>
  <div>
    <!-- <input
    type="range"
    min="0"
    max="100"
    ref="slider"
    :value="sliderValue"
    @input="onInput"
    @wheel="onMouseWheel"
    :style="initStyle"
  /> -->
    <input
      type="range"
      :min="min"
      :max="max"
      ref="slider"
      v-model="progress"
      @input="onInput"
      @wheel="onMouseWheel"
    />
    {{ progress }}
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

const min = 0;
const max = 100;

type ProgressType = "sound" | "time";

export interface Props {
  modelValue?: number;
  progressType: ProgressType;
}
export interface Emits {
  (e: "update:modelValue", value: Props["modelValue"]): void;
  (e: "update:modelValue", value: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  progressType: "sound",
});
const emit = defineEmits<Emits>();

const slider = ref<HTMLElement | null>(null);
const innerProgress = ref(0);
const isModelValueNull = computed(() => props.modelValue == null);

const progress = computed({
  get: () => {
    if (isModelValueNull.value) {
      console.log("df");

      return innerProgress.value;
    }

    return props.modelValue as number;
  },
  set: (value) => {
    let temp = value;

    if (typeof value === "string") {
      temp = Number(value);
    }

    if (isModelValueNull.value) {
      innerProgress.value = temp;
    }
    emit("update:modelValue", temp);
  },
});

const onMouseWheel = ({ deltaY }: WheelEvent) => {
  switch (props.progressType) {
    case "sound":
      if (deltaY > 0) {
        progress.value = Math.max(min, progress.value - 5);
      } else if (deltaY < 0) {
        progress.value = Math.min(max, progress.value + 5);
      }
      break;

    default:
      break;
  }
};

const onInput = (e: Event) => {
  const value = Number((e.target as HTMLInputElement).value);
  progress.value = value;
};

const setProgressCss = (width: number) => {
  console.log(width);
  (slider.value as HTMLElement).style.setProperty(
    "--ProgressPercent",
    `${width}%`
  );
};

watch(
  () => progress.value,
  (newVal) => {
    setProgressCss(newVal);
  }
);

onMounted(() => {
  if (props.progressType !== "sound") {
    (slider.value as HTMLInputElement).defaultValue = "0";
  }
  setProgressCss(
    isModelValueNull.value ? innerProgress.value : (props.modelValue as number)
  );
});

// const musicStore = useMusicControllerStore();
// const { currentTimePercent } = storeToRefs(musicStore);
// const soundStore = useSoundControllerStore();

// const sliderValue = ref(modelValue);
// const slider = ref<HTMLElement | null>(null);

// const initStyle = computed(() => `--ProgressPercent: ${modelValue}%`);

// handler
// const onInput = (e: Event) => {
//   const value = Number((e.target as HTMLInputElement).value);
//   sliderValue.value = value;
// };

// const onMouseWheel = (e: WheelEvent) => {
//   if (progressType === "sound") {
//     sliderValue.value = soundStore.volumeUpDownHandler(e.deltaY);
//   }
// };

// onMounted
// onMounted(() => {
//   console.log(sliderValue.value);

//   soundStore.volumeInit();
//   if (progressType !== "sound") {
//     // (slider.value as HTMLInputElement).defaultValue = "0";
//   }
// });

// // watch
// watch(currentTimePercent, (newModelValue, old) => {
//   console.log("newModelValue", newModelValue);
//   console.log("old", old);

//   // if (slider.value && progressType !== "sound") {
//   //   setProgressCss(newModelValue);
//   // }
// });
// watch(sliderValue, (newSliderValue) => {
//   console.log(newSliderValue);
//   if (slider.value) {
//     switch (progressType) {
//       case "sound":
//         soundStore.setVolume(newSliderValue);
//         break;
//       case "time":
//         musicStore.setCurrentTimeClick(newSliderValue);
//         break;
//     }

//     emit("update:modelValue", sliderValue.value);
//     setProgressCss(newSliderValue);
//   }
// });
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
</style>
