<template>
  <div class="wrap">
    <div :class="classCheck">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

export interface Props {
  isPlay?: string;
  stop?: string;
}
const props = defineProps<Props>();
const classCheck = computed(() => {
  if (props.stop) {
    return "";
  }
  if (props.isPlay) {
    return "marqueePlaying";
  } else {
    return "marqueeList";
  }
});
// props가 필요할듯 list용인지  main용인지
// class도 2개나눠서 list용 -> 글자가 width를 넘어가는 경우 hover시에는 marquee 실행
// 다른 main용 클래스
</script>

<style scoped lang="scss">
.wrap {
  width: 100%;
  overflow: hidden;
  .marqueePlaying {
    animation: marqueePlaying 6s linear infinite;
    display: inline-block;
    white-space: nowrap;
    animation-play-state: running;
    &:hover {
      animation-play-state: paused;
    }
    // &: focusout;
  }
  &:hover .marqueeList {
    animation: marqueeList 6s linear infinite;
    display: inline-block;
    white-space: nowrap;
    animation-play-state: running;
  }
}
@keyframes marqueePlaying {
  0% {
    margin-left: 100%;
    transform: translateX(0%);
  }
  100% {
    margin-left: 0;
    transform: translateX(-100%);
  }
}
@keyframes marqueeList {
  0% {
    margin-left: 0%;
    transform: translateX(0%);
  }
  100% {
    margin-left: 0;
    transform: translateX(-100%);
  }
}
</style>
