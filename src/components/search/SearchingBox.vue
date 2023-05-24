<template>
  <div class="searching-box" ref="history" @click.stop>
    <AppInput v-model:model-value="keyWord" @keydown.enter="saveHistory" @click="t"></AppInput>
    <SearchingHistory
      :search-history="keyWordHistory"
      @update="updateHistory"
      v-show="showHistory"
    ></SearchingHistory>
  </div>
</template>

<script setup lang="ts">
import AppInput from '@/components/common/AppInput.vue';
import { onMounted, ref } from 'vue';
import SearchingHistory from './SearchingHistory.vue';
import useDetectOutsideClick from '../composable/DetectOutsideClick';

const keyWord = ref('');
const keyWordHistory = ref<string[]>([]);
const history = ref<HTMLLIElement | null>(null);
const showHistory = ref(false);

const t = () => {
  showHistory.value = true;
};

const saveHistory = () => {
  if (keyWord.value.trim() == '') return;

  const searchHistory = localStorage.getItem('history');

  let keyWordString: string;
  // let keyWordArray: string[];

  if (!searchHistory) {
    keyWordHistory.value = [keyWord.value];
    keyWordString = JSON.stringify(keyWordHistory.value);
  } else {
    keyWordHistory.value = JSON.parse(searchHistory);
    keyWordHistory.value.push(keyWord.value);
    keyWordString = JSON.stringify(keyWordHistory.value);
  }
  localStorage.setItem('history', keyWordString);
};

// emit
const updateHistory = (history: string[]) => {
  keyWordHistory.value = history;

  // update localStorage history
  const historyString = JSON.stringify(history);
  localStorage.setItem('history', historyString);
};

useDetectOutsideClick(history, () => {
  showHistory.value = false;
});

onMounted(() => {
  const searchHistory = localStorage.getItem('history');
  if (searchHistory) {
    keyWordHistory.value = JSON.parse(searchHistory);
  }
});
</script>

<style scoped>
.searching-box {
  border: 1px solid black;
  display: inline-block;
  padding: 1rem 1rem;
}
</style>
