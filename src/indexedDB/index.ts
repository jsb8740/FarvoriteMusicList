export default class DataBase {
  private db!: IDBDatabase;
  private transaction!: IDBTransaction;
  private objectStore!: IDBObjectStore;

  private static instance: DataBase;
  testData = {
    videoId: ["VOUK-xFAyk", "KqFAs5d3Yl8"],
  };

  public static getInstance() {
    if (!DataBase.instance) {
      DataBase.instance = new DataBase();
    }
    return DataBase.instance;
  }

  constructor() {
    console.log("db 시작");

    this.openDatabase("favoritesDB", 3.0).then((res) => {
      this.db = res;
    });
  }

  private openDatabase(dbName: string, version: number) {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(dbName, version);

      // error handling
      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };

      // dbOpen 성공시
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.onversionchange = () => {
          db.close();
          alert("낮은 버전 DB 사용중 새로고침 해주세요!");
        };

        resolve(db);
      };

      // 클라이언트에 DB가 없거나 버전이 낮은경우에 실행
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // store 생성
        const store = db.createObjectStore("favorites", {
          keyPath: "myKey",
          autoIncrement: true,
        });

        resolve(db);
      };
    });
  }

  private openDBDatabase() {}

  public getFavList(): unknown {
    return new Promise(async (resolve, reject) => {
      // this.db = await this.openDatabase("favoritesDB", 3.0);
      // console.log("checkDB", this.db);

      const transaction = this.db.transaction("favorites", "readwrite");

      console.log(transaction);

      const objectStore = transaction.objectStore("favorites");

      // const store = useIndexedDBStore();
      const getRequest = objectStore.getAll();
      getRequest.onsuccess = (event) => {
        const dataList = (event.target as IDBOpenDBRequest).result;
        console.log(dataList);
        // store.favSongLists = dataList;

        resolve(dataList);
      };

      getRequest.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }

  public checkFavorite(videoId: string): boolean {
    const transaction = this.db.transaction("favorites", "readwrite");

    const objectStore = transaction.objectStore("favorites");

    // transaction.oncomplete = (event: Event) => {
    //   console.log("transaction check complete", event);
    // };
    // transaction.onerror = (event: Event) => {
    //   console.log("transaction delete error", event);
    // };

    let check = false;
    // objectStore.openCursor().onsuccess = (event) => {
    //   const cursor = (event.target as IDBRequest).result;
    //   if (cursor) {
    //     let key = cursor.primaryKey;
    //     let value = cursor.value;

    //     // console.log(key, value.videoId);
    //     console.log("d", videoId);

    //     if (value.videoId == videoId) {
    //       check = true;
    //     } else {
    //       cursor.continue();
    //     }
    //   }
    // };

    const getRequest = objectStore.getAll();
    getRequest.onsuccess = (event: Event) => {
      const data = (event.target as IDBOpenDBRequest).result;
      console.log(data);
    };
    return check;
  }

  public addData(videoId: string) {
    const data = {
      videoId,
    };

    // console.log("add test", data);

    const transaction = this.db.transaction("favorites", "readwrite");
    transaction.oncomplete = (event) => {
      console.log("transaction addData complete");
    };
    transaction.onerror = (event) => {
      // console.log("transaction error", event);
      console.log(
        "transaction addData error",
        (event.target as IDBTransaction).error
      );
    };

    const objectStore = transaction.objectStore("favorites");
    objectStore.add(data);
  }

  public deleteData(videoId: string) {
    const transaction = this.db.transaction("favorites", "readwrite");

    const objectStore = transaction.objectStore("favorites");

    transaction.oncomplete = (event) => {
      console.log("transaction deleteData complete");
    };
    transaction.onerror = (event) => {
      // console.log("transaction error", event);
      console.log(
        "transaction deleteData error",
        (event.target as IDBTransaction).error
      );
    };

    // objectStore.delete(1);
    // const t = objectStore.getKey("2");
    // t.onsuccess = (event) => {
    //   const key = (event.target as IDBOpenDBRequest).result;
    //   console.log(key);
    // };

    // const t = objectStore.getAll();
    // t.onsuccess = (event) => {
    //   const dd = (event.target as IDBOpenDBRequest).result;
    //   console.log(dd);
    // };

    //getall 보단 cursor로 1개씩 오픈하면서 비교하는게 좋을듯
    //처음 데이터 확인일때는 getall로 다가져오고

    objectStore.openCursor().onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        let key = cursor.primaryKey;
        let value = cursor.value;

        // console.log(key, value.videoId);
        if (value.videoId === videoId) {
          objectStore.delete(key);
        } else {
          cursor.continue();
        }
      }
    };

    // console.log(this.objectStore.indexNames);
  }
}
