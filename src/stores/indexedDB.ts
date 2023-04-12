import { computed, ref } from "vue";
import { defineStore } from "pinia";
import DataBase from "@/indexedDB/index";
import type { DbField } from "@/components/icons/Heart.vue";

export const useIndexedDBStore = defineStore("indexedDB", () => {
  const favSongList = ref<DbField[]>([]);
  const webDB = DataBase.getInstance();

  const getPlayList = async () => {
    await updateFavList;
    const songList = Object.values(favSongList.value).map(
      (value: DbField) => value.videoId
    );
    // title도 필요할듯함
    return songList;
  };

  async function updateFavList() {
    favSongList.value = (await webDB.getFavList()) as DbField[];
  }

  async function addSong(videoId: string, title: string) {
    webDB.addData(videoId, title);
    await updateFavList();
  }

  async function removeSong(videoId: string) {
    webDB.deleteData(videoId);
  }
  return { updateFavList, removeSong, addSong, getPlayList, favSongList };
});
