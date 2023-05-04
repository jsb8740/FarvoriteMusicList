<template>
  <div class="listItem">
    <div class="thumbnail">
      <img :src="thumbnailURL" class="" />
      <Heart :title="props.title" class="favorite" :video-id="props.videoId" />
    </div>

    <!-- <img :src="item.snippet.thumbnails.default.url" /> -->

    <!-- css 변경 -->
    <!-- 가로로 흐르는 텍스트 구현하기 -->
    <AppMarquee :stop="titleLength">
      <div v-html="props.title" class="title" />
    </AppMarquee>
  </div>
</template>

<script setup lang="ts">
import Heart from "@/components/icons/Heart.vue";
import { computed, onMounted, ref } from "vue";
import AppMarquee from "../common/AppMarquee.vue";
export interface Props {
  videoId: string;
  title: string;
}

const props = withDefaults(defineProps<Props>(), {
  videoId: "undefined",
});

const titleLength = computed(() => {
  if (props.title.length < 24) {
    return "stop";
  }
});

// 작은 크기 default
// 중간 mqdefault
// 큰크기 hqdefault
const thumbnailURL = computed(
  () => `https://i.ytimg.com/vi/${props.videoId}/mqdefault.jpg`
);

onMounted(() => {});
</script>

<style scoped lang="scss">
.listItem {
  margin: 0 3%;
  display: inline-block;
  width: 320px;
  .title {
    display: flex;
    align-items: center;
    white-space: nowrap;
    font-size: 1.1rem;
    width: 100%;
  }

  .thumbnail {
    position: relative;
    img {
      border-radius: 1rem;
    }
    .favorite {
      position: absolute;
      inset: 5% 85%;
    }
  }
}
</style>
