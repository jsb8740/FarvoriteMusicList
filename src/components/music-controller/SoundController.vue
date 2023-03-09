<template>
  <div>
    <button class="iconView" @click="soundMute">
      <img v-show="soundMuteImg" src="@/assets/volumeMute-white.png" />
      <img v-show="soundLowImg" src="@/assets/volumeLow-white.png" />
      <img v-show="soundHighImg" src="@/assets/volumeHigh-white.png" />
    </button>
    <div class="soundWrap">
      <div
        class="soundBar"
        @drag="volumeDrag"
        @click="volumeClick"
        @wheel="volumeHandler"
        :style="{ '--soundWidth': dynamicWidth }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const volume = ref(100);

const dynamicWidth = computed(() => `${volume.value}%`);

// sound img 컨트롤
const soundMuteImg = computed<boolean>(() =>
  volume.value === 0 ? true : false
);
const soundLowImg = computed<boolean>(() =>
  volume.value > 0 && volume.value <= 50 ? true : false
);
const soundHighImg = computed<boolean>(() =>
  volume.value > 50 && volume.value <= 100 ? true : false
);

const muteFlag = ref(false); //뮤트 확인  플래그
const volumeTmp = ref(0); // 뮤트인 경우 볼륨을 담는 임시변수 뮤트끝나면 복귀시키는 용도

// 사운드 이미지 클릭시 소리 mute
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

// 볼륨 핸들러
const volumeHandler = (e: WheelEvent) => {
  volume.value += volumeUpDown(e.deltaY);
  volumeLimit();
  console.log("현재볼륨", volume.value);
};

//볼륨 0, 100 밖으로 안벗어나게
const volumeLimit = () => {
  if (volume.value < 0) {
    volume.value = 0;
  } else if (volume.value > 100) {
    volume.value = 100;
  }
};

// 마우스 휠 이벤트 컨트롤
const volumeUpDown = (upDown: number): number => {
  if (muteFlag.value === false) {
    // 뮤트가 아닌 경우

    if (upDown < 0) {
      //up
      console.log("볼륨 업", volume.value);
      return 5;
    } else if (upDown > 0) {
      //down
      console.log("볼륩 다운", volume.value);
      return -5;
    }
  }
  // 뮤트인 경우
  return 0;
};

const volumeClick = (e: MouseEvent) => {
  // console.log("click", e);
  // 마우스 클릭
  muteFlag.value = false;
  volumeTmp.value = 0;
  volume.value = Math.round((e.offsetX / 200) * 100);
};

const volumeDrag = (e: DragEvent) => {
  console.log("drag", e.offsetX);
  muteFlag.value = false;
  volumeTmp.value = 0;
  volume.value = Math.round((e.offsetX / 200) * 100);

  // 할것 드래그하면 이미지 사라지는것 고치기
  // 드래그 할때 pointer로 교체
};
</script>

<style scoped lang="scss">
.iconView {
  position: relative;
  height: 2rem;
  width: 2rem;
  img {
    inset: 0;
    position: absolute;
    height: 100%;
    cursor: pointer;
    transition: 0.3s;
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
