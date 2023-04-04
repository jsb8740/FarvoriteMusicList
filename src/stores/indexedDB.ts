import { ref } from "vue";
import { defineStore } from "pinia";
import DataBase from "@/indexedDB/index";

export const useIndexedDBStore = defineStore("indexedDB", () => {
  const favSongList = ref();
  const webDB = DataBase.getInstance();

  async function updateFavList() {
    favSongList.value = await webDB.getFavList();
    // console.log(favSongList.value);
  }

  async function addSong(videoId: string, title: string) {
    webDB.addData(videoId, title);
    // favSongList.value = await webDB.getFavList();
    await updateFavList();
    console.log("add", favSongList);
  }

  async function removeSong(videoId: string) {
    webDB.deleteData(videoId);
    // favSongList.value = await webDB.getFavList();
    // await updateFavList();
  }
  return { updateFavList, removeSong, addSong, favSongList };
});
