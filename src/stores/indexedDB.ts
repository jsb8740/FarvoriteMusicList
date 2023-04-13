import { computed, ref } from "vue";
import { defineStore } from "pinia";
import DataBase from "@/indexedDB/index";
import type { DbField } from "@/components/icons/Heart.vue";

export const useIndexedDBStore = defineStore("indexedDB", () => {
  const favSongList = ref<DbField[]>([]);
  const webDB = DataBase.getInstance();

  const getPlayList = async () => {
    await updateFavList;
    const videoIdList = Object.values(favSongList.value).map(
      (value: DbField) => value.videoId
    );
    return videoIdList;
  };

  const getPlaylistTitle = async (videoId: string = "iqe220lkJzc") => {
    await updateFavList;
    const getListObject: DbField | undefined = favSongList.value.find(
      (item) => item.videoId === videoId
    );

    if (getListObject === undefined) {
      console.log("List object not found");
      return "";
    }
    const { title } = getListObject;

    return title;
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
  return {
    updateFavList,
    removeSong,
    addSong,
    getPlayList,
    getPlaylistTitle,
    favSongList,
  };
});
