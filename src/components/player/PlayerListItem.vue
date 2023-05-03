<template>
  <div class="playerList">
    <img :src="thumbnailURL" alt="" class="thumbnail" />

    <AppMarquee :stop="titleLength">
      <span class="title" v-html="title"></span>
    </AppMarquee>

    <!-- 클릭시 이 노래로 시작 -->
    <div class="play" @click="clickPlay">
      <PlayIcon></PlayIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayIcon from "@/components/icons/playerImg/PlayIcon.vue";
import { useIndexedDBStore } from "@/stores/indexedDB";
import { computed, ref, onMounted } from "vue";
import AppMarquee from "@/components/common/AppMarquee.vue";
import { useMusicControllerStore } from "@/stores/musicController";
export interface Props {
  videoId: string;
}
const props = defineProps<Props>();

const thumbnailURL = computed(
  () => `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`
);

const dbStore = useIndexedDBStore();
const title = ref("");
const titleLength = computed(() => {
  if (title.value.length < 43) {
    return "stop";
  }
});
// 자꾸 업데이트가 안되는게 있음 상위 컴포넌트 v-for의 li에 key값을 줘서
// 업데이트하게 만듦
const getPlaylist = async (item: string) => {
  title.value = await dbStore.getPlaylistTitle(item);
};

const musicStore = useMusicControllerStore();

const clickPlay = () => {
  musicStore.moveMusic(props.videoId);
};

onMounted(() => {
  getPlaylist(props.videoId);
});
</script>

<style scoped lang="scss">
.playerList {
  display: flex;
  align-items: center;
  .thumbnail {
    width: 160px;
    height: 100px;
    border-radius: 10%;
  }

  .title {
    white-space: nowrap;
    display: flex;
    width: 100%;
    padding-left: 0.6rem;
  }
  .play {
    margin-left: 1rem;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    background-color: transparent;
    border-radius: 100%;
    border: 2px solid $buttonColor;
    padding: 0.3rem 0.2rem 0.3rem 0.3rem;
    // box-shadow: 0 0 1rem rgba(0, 0, 0, 0.18);

    display: flex;
    justify-content: center;
    align-items: center;
    &::v-deep(svg) {
      // color: $orangeColor;

      &:hover {
        fill: $orangeColor;
      }
    }

    &:hover {
      border: 2px solid $orangeColor;
    }
  }
}
</style>
