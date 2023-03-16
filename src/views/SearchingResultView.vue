<template>
  <TheViewLayout>
    <template #default>
      <!-- <img src="https://i.ytimg.com/vi/U5TTMeIadME/default.jpg" /> -->
      <!-- {{ searchResult }} -->
      <MusicItem v-for="i in searchResult?.data.items.length">
        <template #order>
          {{ i }}
        </template>
      </MusicItem>
    </template>
  </TheViewLayout>
</template>

<script setup lang="ts">
import TheViewLayout from "@/components/layouts/TheViewLayout.vue";
import MusicItem from "@/components/playList/musicList/MusicItem.vue";
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
