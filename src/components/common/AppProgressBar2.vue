<template>
  <div class="custom-slider">
    <input type="range" min="0" max="100" v-model="sliderValue" ref="slider" />
    <br />
    {{ sliderValue }}
    <button @click="sliderValue++">gdgd</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const sliderValue = ref(100);
const slider = ref<HTMLElement | null>(null);

const getProgress = (value: number, min: number, max: number) => {};
watch(sliderValue, () => {
  if (slider.value) {
    const min = Number((slider.value as HTMLInputElement).min);
    const max = Number((slider.value as HTMLInputElement).max);
    const test = ((sliderValue.value - min) / (max - min)) * 100;
    console.log("test", test);
    const extraWidth = (100 - test) / 10;
    console.log("extraWidth", extraWidth);
    slider.value.style.setProperty("--ProgressPercent", `${test}%`);
  }
});
</script>

<style scoped lang="scss">
@import "@/assets/color.scss";
// input[type="range"] {
//   appearance: none;
//   -webkit-appearance: none;
//   background: transparent;

//   cursor: pointer;

//   width: 100%;
//   border: 1px solid black;
//   height: 0.3rem;

//   &::-webkit-slider-thumb {
//     appearance: none;
//     -webkit-appearance: none;

//     background-color: $yellowPastel;
//     cursor: pointer;
//     border: 0.1px solid $yellowPastel;
//     height: 1rem;
//     width: 1rem;
//     border-radius: 100%;
//   }
// }
.custom-slider {
  --trackHeight: 0.5rem;
  --thumbRadius: 1rem;
}

/* style the input element with type "range" */
.custom-slider input[type="range"] {
  position: relative;
  appearance: none;
  /* pointer-events: none; */
  border-radius: 999px;
  z-index: 0;
}

/* ::before element to replace the slider track */
.custom-slider input[type="range"]::before {
  content: "";
  position: absolute;
  //   100% -> default value
  width: var(--ProgressPercent, 100%);
  height: 100%;
  background: #00865a;
  /* z-index: -1; */
  pointer-events: none;
  border-radius: 999px;
}

/* `::-webkit-slider-runnable-track` targets the track (background) of a range slider in chrome and safari browsers. */
.custom-slider input[type="range"]::-webkit-slider-runnable-track {
  appearance: none;
  background: #005a3c;
  height: var(--trackHeight);
  border-radius: 999px;
}

/* `::-moz-range-track` targets the track (background) of a range slider in Mozilla Firefox. */
.custom-slider input[type="range"]::-moz-range-track {
  appearance: none;
  background: #005a3c;
  height: var(--trackHeight);
  border-radius: 999px;
}

.custom-slider input[type="range"]::-webkit-slider-thumb {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  width: var(--thumbRadius);
  height: var(--thumbRadius);
  /* margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2); */
  background: #00bd7e;
  border-radius: 999px;
  pointer-events: all;
  appearance: none;
  z-index: 1;
}
</style>
