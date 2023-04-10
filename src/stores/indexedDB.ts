import { ref } from "vue";
import { defineStore } from "pinia";
import DataBase from "@/indexedDB/index";

export const useIndexedDBStore = defineStore("indexedDB", () => {
  const favSongList = ref();
  const webDB = DataBase.getInstance();

  async function updateFavList() {
    favSongList.value = await webDB.getFavList();
  }

  async function addSong(videoId: string, title: string) {
    webDB.addData(videoId, title);
    await updateFavList();
  }

  async function removeSong(videoId: string) {
    webDB.deleteData(videoId);
  }
  return { updateFavList, removeSong, addSong, favSongList };
});
