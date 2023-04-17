<template>
  <div class="playerList">
    <img :src="thumbnailURL" alt="" class="thumbnail" />

    <AppMarquee>
      <template #default>
        <div class="title" v-html="title"></div>
      </template>
    </AppMarquee>

    <!-- 클릭시 이 노래로 시작 onclick사용-->
    <div class="paused">
      <PlayIcon></PlayIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayIcon from "@/components/icons/PlayIcon.vue";
import { useIndexedDBStore } from "@/stores/indexedDB";
import { computed, ref } from "vue";
import AppMarquee from "@/components/common/AppMarquee.vue";
export interface Props {
  videoId: string;
}
const props = defineProps<Props>();

const thumbnailURL = computed(
  () => `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`
);

const dbStore = useIndexedDBStore();
const title = ref("");
const getPlaylist = async (item: string) => {
  title.value = await dbStore.getPlaylistTitle(item);
};

getPlaylist(props.videoId);
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
    overflow: hidden;
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
