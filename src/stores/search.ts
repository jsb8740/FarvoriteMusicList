import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios, { type AxiosResponse } from "axios";

export const useSearchStore = defineStore("search", () => {
  // const loading = ref<boolean>(false);
  const searchResult = ref<AxiosResponse>();

  async function searchYoutube(keyWord: string) {
    try {
      // loading.value = true;
      const params = {
        keyword: keyWord,
      };

      searchResult.value = await axios.get("/api/search", { params });
      console.log(searchResult.value);
    } catch (err) {
      console.error(err);
    } finally {
      // loading.value = false;
    }
  }

  return { searchResult, searchYoutube };
});
