export interface TableProperties {
  name: string;
  indexproperties: TableIndexProperties;
}
export interface TableIndexProperties {
  name: string;
  keypath: string;
  options?: IDBIndexParameters;
}

export default class DataBase {
  private _db!: IDBDatabase;

  private static _instance: DataBase;
  testData = {
    videoId: ["VOUK-xFAyk", "KqFAs5d3Yl8"],
  };

  public static getInstance() {
    if (!this._instance) {
      this._instance = new DataBase();
    }
    return this._instance;
  }

  constructor() {
    console.log("db 시작");

    // this.openDatabase("MusicListDB", 1.0).then((res) => {
    //   this._db = res;
    // });
    this.checkDB();
  }

  // 다른 함수 실행 할 때 이 함수를 실행해줘야함
  private async checkDB() {
    if (!this._db) {
      this._db = await this.openDatabase("MusicListDB", 1.0);
    }
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
        db.onabort = () => {};
        db.onclose = () => {};
        db.onerror = () => {};
        db.onversionchange = () => {};

        resolve(db);
      };

      // 클라이언트에 DB가 없거나 버전이 낮은경우에 실행
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // table 생성
        const store = db.createObjectStore("favorites", {
          keyPath: "id",
          autoIncrement: true,
        });

        store.createIndex("videoId", "videoId", {
          unique: true,
        });
        store.createIndex("title", "title");
        // const properties: TableProperties = {
        //   name: "favorites",
        //   indexproperties: {
        //     name: "videoId",
        //     keypath: "videoId",
        //     options: {
        //       unique: true,
        //     },
        //   },
        // };
        // this.createTable(properties);
      };
    });
  }

  // table 만드는 함수 index도 같이 만듦
  public async createTable(options: TableProperties) {
    await this.checkDB();
    const store = this._db.createObjectStore(options.name, {
      keyPath: "id",
      autoIncrement: true,
    });

    const { indexproperties: index } = options;
    store.createIndex(index.name, index.keypath, index.options);
  }

  public getFavList(): unknown {
    return new Promise(async (resolve, reject) => {
      await this.checkDB();
      const transaction = this._db.transaction("favorites", "readwrite");
      // console.log(transaction);
      const objectStore = transaction.objectStore("favorites");

      const getRequest = objectStore.getAll();
      getRequest.onsuccess = (event) => {
        const dataList = (event.target as IDBOpenDBRequest).result;
        // console.log(dataList);

        resolve(dataList);
      };

      getRequest.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });

    // pinia에서 조절하는걸로
    //  watcheffect로 확인?
    // 일단 table 생성하는 부분은 따로 분리를 하기
    // createIndex부분도 필요함
  }

  public checkFavorite(videoId: string): boolean {
    const transaction = this._db.transaction("favorites", "readwrite");

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

  public addData(videoId: string, title: string) {
    const data = {
      videoId,
      title,
    };

    // console.log("add test", data);

    const transaction = this._db.transaction("favorites", "readwrite");
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
    const transaction = this._db.transaction("favorites", "readwrite");

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
  }
}
