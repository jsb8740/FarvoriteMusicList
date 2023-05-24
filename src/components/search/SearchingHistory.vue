<template>
  <div>
    <RouterLink
      :to="{
        name: 'search',
        query: {
          keyword: item
        }
      }"
      v-for="(item, index) in searchHistory"
      :key="index"
      class="history-list"
      @click="updateHistory(item)"
    >
      {{ item }}
      <!-- <HistoryDeleteIcon @click="deleteHistory(item)"></HistoryDeleteIcon> -->
      <HistoryDeleteIcon2 @click.prevent="deleteHistory(item)"></HistoryDeleteIcon2>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import HistoryDeleteIcon from '@/components/icons/HistoryDeleteIcon.vue';
import HistoryDeleteIcon2 from '@/components/icons/HistoryDeleteIcon2.vue';

interface Props {
  searchHistory: string[];
}
interface Emit {
  (e: 'deleteHistory', history: string[]): void;
  (e: 'updateHistory', history: string[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const updateHistory = (item: string) => {
  const searchHistory = localStorage.getItem('history');
  if (searchHistory) {
    const historyArray: string[] = JSON.parse(searchHistory);

    // remove array item
    const index = historyArray.indexOf(item);
    if (index !== -1) {
      //success
      historyArray.splice(index, 1);
    }

    historyArray.unshift(item);

    emit('updateHistory', historyArray);
  }
};

const deleteHistory = (item: string) => {
  const searchHistory = localStorage.getItem('history');
  if (searchHistory) {
    const historyArray: string[] = JSON.parse(searchHistory);

    // remove array item
    const index = historyArray.indexOf(item);
    historyArray.splice(index, 1);

    emit('deleteHistory', historyArray);
  }
};
</script>

<style scoped>
.history-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
