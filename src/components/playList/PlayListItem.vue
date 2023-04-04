<template>
  <div class="listItem">
    <div class="thumbnail">
      <img :src="thumbnailURL" class="" />
      <Heart :title="props.title" class="favorite" :video-id="props.videoId" />
    </div>

    <!-- <img :src="item.snippet.thumbnails.default.url" /> -->
    <div class="title">
      {{ props.title }}
    </div>

    <div id="test"></div>
    <!-- <div class="byWriter">
      <slot name="by">by test</slot>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import Heart from "@/components/icons/Heart.vue";
import { computed, onMounted, ref } from "vue";
export interface Props {
  videoId: string;
  title: string;
}

const props = withDefaults(defineProps<Props>(), {
  videoId: "undefined",
});
const thumbnailURL = computed(
  () => `https://i.ytimg.com/vi/${props.videoId}/mqdefault.jpg`
);

const test = ref(null);
onMounted(() => {});
</script>

<style scoped lang="scss">
@import "@/assets/color.scss";
.listItem {
  margin: 0 2rem;
  display: inline-block;
  width: 320px;
  .title {
    margin-top: 0.3rem;
    height: 1.5rem;
    overflow: hidden;
    width: 320px;
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
