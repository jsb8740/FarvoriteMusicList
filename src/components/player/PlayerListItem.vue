<template>
  <div class="playerList">
    <img :src="thumbnailURL" alt="" class="thumbnail" />

    <AppMarquee>
      <template #default>
        <div class="title" v-html="title"></div>
      </template>
    </AppMarquee>

    <!-- 클릭시 이 노래로 시작 -->
    <div class="paused" @click="clickPlay">
      <PlayIcon></PlayIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayIcon from "@/components/icons/PlayIcon.vue";
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
    display: flex;
    align-items: center;
    white-space: nowrap;

    width: 100%;
  }
  .paused {
    cursor: pointer;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 100%;
    padding: 0.3rem 0.2rem 0.3rem 0.3rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.18);

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
