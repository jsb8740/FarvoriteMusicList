<template>
  <button class="wrapper" @click="favoriteClick">
    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none">
      <path
        d="M4.3314 12.0474L12 20L19.6686 12.0474C20.5211 11.1633 21 9.96429 21 8.71405C21 6.11055 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12 6.66667L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5.03517 4 3 6.11055 3 8.71405C3 9.96429 3.47892 11.1633 4.3314 12.0474Z"
        :fill="favoriteColorCheck"
      />
      <path
        d="M4.3314 12.0474L12 20L19.6686 12.0474C20.5211 11.1633 21 9.96429 21 8.71405C21 6.11055 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12 6.66667L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5.03517 4 3 6.11055 3 8.71405C3 9.96429 3.47892 11.1633 4.3314 12.0474Z"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useIndexedDBStore } from "@/stores/indexedDB";

export interface Props {
  videoId: string;
  title: string;
}
export interface DbField {
  videoId: string;
  id: number;
  title: string;
}

const props = defineProps<Props>();

const store = useIndexedDBStore();
// const dataBase = DataBase.getInstance();
const favorite = ref(false);
let playList: string[];

const checkFavSong = async () => {
  // 원본 복사
  playList = await store.getPlayList();
  playList.find((videoId) => {
    if (videoId === props.videoId) favorite.value = true;
  });
};

const favoriteClick = async () => {
  favorite.value = !favorite.value;

  // 클릭을 했는데 추가인 상태이면
  if (favorite.value === true) {
    await store.addSong(props.videoId, props.title);
  } else {
    //클릭을 했는데 해제하는 상태
    await store.removeSong(props.videoId);
    await store.updateFavList();
  }
  await checkFavSong();
  // 2번체크해야 사라지는 걸 고처야함
  // 비동기 문제였음 await로 해결
};
const favoriteColorCheck = computed(() =>
  favorite.value ? "#FF8400" : "#fff"
);

onMounted(() => {
  checkFavSong();
});
</script>

<style scoped lang="scss">
$svg-size: 2.2em;
.wrapper {
  display: inline-flex;
  // background-color: rgba($color: #000, $alpha: 0.3);
  //   background-color: black;
  border: 0;
  width: $svg-size;
  height: $svg-size;
  border-radius: 50%;
  align-items: center;
  justify-content: center;

  svg {
    width: $svg-size;
    height: auto;
    // cursor: pointer;
  }

  //   height: 100%;
}
</style>
