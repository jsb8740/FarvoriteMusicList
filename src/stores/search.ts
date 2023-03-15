import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useSearchStore = defineStore("search", () => {
  const searchData = ref<Record<string, undefined>>();

  function searchYoutube(query: string) {
    const searchQuery = JSON.stringify(query);

    try {
      axios.get("/api/search", searchQuery).then((res) => {
        console.log(res.data);
      });
    } catch {}
  }
});
