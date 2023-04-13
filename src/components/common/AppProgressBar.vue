<template>
  <div class="progressWrap" @wheel.prevent.stop>
    <div
      class="progressBar"
      @mousedown="onMouseClick"
      @mouseup="onMouseRelease"
      @mousemove="onMouseMove"
      @wheel="onMouseWheel"
      :style="{ '--progressWidth': typeWidth }"
      ref="bar"
    ></div>

    <!-- 애니메이션 css가 필요할듯함 -->
  </div>
</template>

<script setup lang="ts">
import { useMusicControllerStore } from "@/stores/musicController";
import { useSoundControllerStore } from "@/stores/soundController.js";
import { computed, onMounted, ref } from "vue";

export interface Props {
  type: string;
}

enum VolumeControllerState {
  IDLE,
  DRAGGING,
}

// soundStore
const soundStore = useSoundControllerStore();
const musicPlayStore = useMusicControllerStore();

const bar = ref<HTMLFormElement | null>(null);
let progressBarWidth: number;
onMounted(() => {
  progressBarWidth = (bar.value as HTMLFormElement).clientWidth;
});

const props = defineProps<Props>();
const volumeControllerState = ref<VolumeControllerState>(
  VolumeControllerState.IDLE
);

const typeWidth = computed(() => {
  if (props.type === "sound") {
    return soundStore.dynamicSoundWidth;
  } else {
    return musicPlayStore.dynamicMusicdWidth;
  }
});

// videostore

// 볼륨 핸들러
const onMouseWheel = (e: WheelEvent) => {
  if (props.type === "sound") {
    soundStore.volumeUpDownHandler(e.deltaY);
  }
};

const onMouseClick = (e: MouseEvent) => {
  // 클릭시 볼륨 컨트롤 상태 -> 드래그
  if (volumeControllerState.value === VolumeControllerState.IDLE) {
    volumeControllerState.value = VolumeControllerState.DRAGGING;
  }

  // 클릭시 마우스 체크
  if (props.type === "sound") {
    soundStore.updateVolume(e.offsetX, progressBarWidth);
  } else {
    musicPlayStore.updateTime(e.offsetX, progressBarWidth);
  }
};

const onMouseRelease = (e: MouseEvent) => {
  if (volumeControllerState.value === VolumeControllerState.DRAGGING) {
    volumeControllerState.value = VolumeControllerState.IDLE;
  }
};

const onMouseMove = (e: MouseEvent) => {
  //mouseMove 상태이고 드래그인 상태
  if (volumeControllerState.value === VolumeControllerState.DRAGGING) {
    if (props.type === "sound") {
      soundStore.updateVolume(e.offsetX, progressBarWidth);
    } else {
      musicPlayStore.updateTime(e.offsetX, progressBarWidth);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/color.scss";

.progressWrap {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 12px;
  cursor: pointer;
  margin: 0.3rem;

  $radius: 0.5rem;
  .progressBar {
    background-color: $progressBackColor;
    width: 100%;
    height: 100%;
    border-radius: $radius;

    &::before {
      content: "";
      position: absolute;
      background-color: $orangeColor;
      width: var(--progressWidth);
      height: 100%;
      border-radius: $radius;
    }
  }
}
</style>
