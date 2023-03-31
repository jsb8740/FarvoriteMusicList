import { ref } from "vue";
import { defineStore } from "pinia";
import DataBase from "@/indexedDB/index";

export const useIndexedDBStore = defineStore("indexedDB", () => {
  const favSongList = ref();
  const webDB = DataBase.getInstance();

  async function getFavList() {
    favSongList.value = await webDB.getFavList();
    console.log(favSongList.value);
  }

  return { getFavList, favSongList };
});
