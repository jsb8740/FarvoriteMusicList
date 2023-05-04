<template>
  <TheViewLayout>
    <template #title> 검색 결과 </template>
    <template #default>
      <template v-if="!searchResult"> test </template>
      <template v-else>
        <!-- 다른노래 검색시 item이 rerendering이 안되는 이슈 -->
        <!-- key값을 줘서 해결 -->
        <PlayListItem
          v-for="item in searchResult?.data.items"
          :key="item.id.videoId"
          :video-id="item.id.videoId"
          :title="item.snippet.title"
        >
        </PlayListItem>
      </template>
    </template>
  </TheViewLayout>
</template>

<script setup lang="ts">
import TheViewLayout from "@/components/layouts/TheViewLayout.vue";
import PlayListItem from "@/components/playList/PlayListItem.vue";
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { onMounted, onUpdated, computed, provide } from "vue";

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
