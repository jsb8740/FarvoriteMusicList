import { ref } from "vue";
import { defineStore } from "pinia";
import DataBase from "@/indexedDB/index";

export const useIndexedDBStore = defineStore("indexedDB", () => {
  const favSongLists = ref();
  const webDB = DataBase.getInstance();

  async function getFavLists() {
    favSongLists.value = await webDB.getFavList();
    console.log(favSongLists.value);
  }

  return { getFavLists, favSongLists };
});
