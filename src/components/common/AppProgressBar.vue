<template>
  <input type="range" :min="min" :max="max" ref="slider" v-model="progress" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

const min = 0;
const max = 100;

type ProgressType = "sound" | "time";

interface Props {
  modelValue?: number;
  progressType: ProgressType;
}
interface Emits {
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
    console.log("progess", temp);

    emit("update:modelValue", temp);
  },
});

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
    console.log("watch", newVal);
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
</script>

<style scoped lang="scss">
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
    // background: rgb(222, 222, 222);
    background-color: $progressBackground;
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
