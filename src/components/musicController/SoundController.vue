<template>
  <div class="soundController">
    <button class="iconView" @click="store.soundMute">
      <img v-show="soundMuteImg" src="@/assets/volumeMute-white.png" />
      <img v-show="soundLowImg" src="@/assets/volumeLow-white.png" />
      <img v-show="soundHighImg" src="@/assets/volumeHigh-white.png" />
    </button>

    <div class="soundWrap" @wheel.prevent.stop>
      <div
        class="soundBar"
        @mousedown="onMouseClick"
        @mouseup="onMouseRelease"
        @mousemove="onMouseMove"
        @wheel="onMouseWheel"
        :style="{ '--soundWidth': dynamicWidth }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useSoundControllerStore } from "@/stores/soundController.js";
import { storeToRefs } from "pinia";

enum VolumeControllerState {
  IDLE,
  DRAGGING,
}

const store = useSoundControllerStore();
const { volume } = storeToRefs(store);

onMounted(() => {
  store.volumeInit();
});

const volumeControllerState = ref<VolumeControllerState>(
  VolumeControllerState.IDLE
);

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

// 볼륨 핸들러
const onMouseWheel = (e: WheelEvent) => {
  store.volumeUpDownHandler(e.deltaY);
};

const onMouseClick = (e: MouseEvent) => {
  // 클릭시 볼륨 컨트롤 상태 -> 드래그
  if (volumeControllerState.value === VolumeControllerState.IDLE) {
    volumeControllerState.value = VolumeControllerState.DRAGGING;
  }

  // 클릭시 마우스 체크
  store.updateVolume(e.offsetX);
};

const onMouseRelease = (e: MouseEvent) => {
  if (volumeControllerState.value === VolumeControllerState.DRAGGING) {
    volumeControllerState.value = VolumeControllerState.IDLE;
  }
};

const onMouseMove = (e: MouseEvent) => {
  //mouseMove 상태이고 드래그인 상태
  if (volumeControllerState.value === VolumeControllerState.DRAGGING) {
    store.updateVolume(e.offsetX);
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/color.scss";

.soundController {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
}

.iconView {
  $imgSize: 1.5rem;
  position: relative;
  height: $imgSize;
  width: $imgSize;
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
  height: 12px;
  cursor: pointer;

  $radius: 0.5rem;
  .soundBar {
    background-color: $progressBackColor;
    width: 100%;
    height: 100%;
    border-radius: $radius;

    &::before {
      content: "";
      position: absolute;
      background-color: $orangeColor;
      width: var(--soundWidth);
      height: 100%;
      border-radius: $radius;
    }
  }
}
</style>
