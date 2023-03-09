<template>
  <div>
    <div class="iconView" @click="soundMute">
      <img v-show="true" src="@/assets/volumeMute-white.png" />
      <img v-show="false" src="@/assets/volumeLow-white.png" />
      <img v-show="false" src="@/assets/volumeHigh-white.png" />
    </div>
    <div class="soundWrap">
      <div
        class="soundBar"
        @wheel="volumeHandler"
        :style="{ '--soundWidth': dynamicWidth }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const volume = ref(100);

const dynamicWidth = computed(() => `${volume.value}%`);
const dynamicAudioImg = computed(() => {
  if (volume.value === 0) {
    //사운드가 뮤트인경우
  } else if (volume.value <= 50) {
    //50보다 작거나 같으면
  } else {
    //50보다크면
  }
});

const muteFlag = ref(false); //뮤트 확인  플래그
const volumeTmp = ref(0); // 뮤트인 경우 볼륨을 담는 임시변수 뮤트끝나면 복귀시키는 용도
const soundMute = () => {
  muteFlag.value = !muteFlag.value;
  if (muteFlag.value) {
    // 뮤트인 경우
    volumeTmp.value = volume.value;
    volume.value = 0;
  } else {
    //뮤트 아닌 경우
    volume.value = volumeTmp.value;
    volumeTmp.value = 0;
  }
};

const volumeHandler = (e: WheelEvent) => {
  volume.value += volumeUpDown(e.deltaY);
  volumeLimit();
  console.log("현재볼륨", volume.value);
};

const volumeLimit = () => {
  if (volume.value < 0) {
    volume.value = 0;
  } else if (volume.value > 100) {
    volume.value = 100;
  }
};

const volumeUpDown = (upDown: number): number => {
  if (upDown < 0) {
    //up
    console.log("볼륨 업", volume.value);
    return 5;
  } else if (upDown > 0) {
    //down
    console.log("볼륩 다운", volume.value);
    return -5;
  }

  return 0;
};
</script>

<style scoped lang="scss">
.iconView {
  position: relative;
  height: 2rem;
  img {
    position: absolute;
    height: 100%;
    cursor: pointer;
  }
}
.soundWrap {
  overflow: hidden;
  position: relative;
  width: 200px;
  height: 10px;
  cursor: pointer;

  .soundBar {
    background-color: gray;
    width: 100%;
    height: 100%;
    &::before {
      content: "";
      position: absolute;
      background-color: red;
      width: var(--soundWidth);
      height: 100%;
    }
  }
}
</style>
