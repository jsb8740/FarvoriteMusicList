<template>
  <div @click="soundStore.soundMute">
    <VolumeHigh v-show="soundHighImg" />
    <VolumeLow v-show="soundLowImg" />
    <VolumeMute v-show="soundMuteImg" />
    <!-- <img v-show="soundMuteImg" src="@/assets/volumeMute-white.png" />
    <img v-show="soundLowImg" src="@/assets/volumeLow-white.png" />
    <img v-show="soundHighImg" src="@/assets/volumeHigh-white.png" /> -->
  </div>
</template>

<script setup lang="ts">
import { useSoundControllerStore } from "@/stores/soundController";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import VolumeHigh from "@/components/icons/volumeImg/VolumeHigh.vue";
import VolumeLow from "@/components/icons/volumeImg/VolumeLow.vue";
import VolumeMute from "@/components/icons/volumeImg/VolumeMute.vue";
const soundStore = useSoundControllerStore();
const { volume } = storeToRefs(soundStore);
// // sound img 컨트롤
const soundMuteImg = computed<boolean>(() =>
  volume.value === 0 ? true : false
);
const soundLowImg = computed<boolean>(() =>
  volume.value > 0 && volume.value <= 50 ? true : false
);
const soundHighImg = computed<boolean>(() =>
  volume.value > 50 && volume.value <= 100 ? true : false
);
</script>

<style scoped lang="scss">
div {
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    width: 1.1rem;
    height: 1.1em;
    margin: 0;
  }
}
</style>
