<template>
  <TheViewLayout>
    <template #default>
      <!-- <img src="https://i.ytimg.com/vi/U5TTMeIadME/default.jpg" /> -->
      <!-- {{ searchResult }} -->
      <PlayListItem v-for="(item, index) in searchResult?.data.items">
        <template #thumbnail>
          <img :src="item.snippet.thumbnails.default.url" />
        </template>
        <template #title>
          {{ item.snippet.title }}
        </template>
      </PlayListItem>
      <!-- playList로 교체 item마다 id값을 props로 받아서 저장 -->
      <!-- 유튜브 할당량이 정해져있어서 어쩔 수업슴 -->
      <!-- 시간도 뮤직 컨트롤로에만 있게 -->
      <!-- 한줄에 3개씩? 4개씩 -->
      <!-- 무한 스크롤 -->

      <!-- <PlayListItem v-for="(item, index) in searchResult?.data.items">
        <template #thumbnail>
          <img :src="item.snippet.thumbnails.default.url" />
        </template>
        <template #title>
          {{ item.snippet.title }}
        </template>
      </PlayListItem> -->
    </template>
  </TheViewLayout>
</template>

<script setup lang="ts">
import TheViewLayout from "@/components/layouts/TheViewLayout.vue";
import PlayListItem from "@/components/playList/PlayListItem.vue";
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { onMounted, onUpdated, computed } from "vue";

const store = useSearchStore();
const { searchResult } = storeToRefs(store);
const route = useRoute();

const queryString = computed(() => route.query as Record<string, unknown>);

onMounted(() => {
  search();
});

onUpdated(() => {
  search();
});

const search = () => {
  store.searchYoutube(queryString.value.keyword as string);
};
</script>

<style scoped lang="scss"></style>
