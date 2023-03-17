<template>
  <div class="listItem">
    <div class="thumbnail">
      <img :src="thumbnailURL" class="" />
      <Heart class="favorite" />
    </div>

    <!-- <img :src="item.snippet.thumbnails.default.url" /> -->
    <div class="title">
      <slot name="title"
        >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum quam
        officia iure asperiores maiores perspiciatis quia ex possimus
        consequatur dignissimos? Aperiam mollitia cumque recusandae veritatis
        veniam nulla libero maiores quae.</slot
      >
    </div>

    <!-- <div class="byWriter">
      <slot name="by">by test</slot>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import Heart from "@/components/icons/Heart.vue";
import { computed } from "vue";
export interface Props {
  videoId: string;
}
const props = withDefaults(defineProps<Props>(), {
  videoId: "undefined",
});
const thumbnailURL = computed(
  () => `https://i.ytimg.com/vi/${props.videoId}/mqdefault.jpg`
);
</script>

<style scoped lang="scss">
@import "@/assets/color.scss";
.listItem {
  margin: 0 2rem;
  display: inline-block;
  width: 120px;
  .title {
    margin-top: 0.3rem;
    height: 1.5rem;
    overflow: hidden;
    width: 1000px;
  }

  .thumbnail {
    position: relative;
    img {
      border-radius: 1rem;
    }
    .favorite {
      position: absolute;
      inset: 5% 70%;
    }
  }
}
</style>
