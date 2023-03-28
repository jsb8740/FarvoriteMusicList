export default class DataBase {
  private request;
  private static db: IDBDatabase;
  private transaction!: IDBTransaction;
  private objectStore!: IDBObjectStore;

  private static instance: DataBase;
  testData = {
    videoId: ["VOUK-xFAyk", "KqFAs5d3Yl8"],
  };

  constructor() {
    console.log("db 시작");

    this.request = indexedDB.open("favoritesDB", 3.0);
    // this.request.onerror = function (event) {};

    // this.createStore();
    this.test();
  }
  test() {
    this.request.onerror = (event) => {
      alert("IndedxedDB Error");
    };

    this.request.onsuccess = (event) => {
      // arrow functions의 this는 상위의 this
      console.log("연결 성공");
      // const db = this.request.result;
      // const testDB = (event.target as IDBOpenDBRequest).result;
      DataBase.db = (event.target as IDBOpenDBRequest).result;
      // console.log("1", db);
      // console.log("2", testDB);
      console.log("3", DataBase.db);

      // this.transaction = DataBase.db.transaction("favorites", "readwrite");
      // this.transaction.oncomplete = function (event: Event) {
      //   console.log("transaction complete", event);
      // };
      // this.transaction.onerror = function (event: Event) {
      //   console.log("transaction error", event);
      // };

      // this.objectStore = this.transaction.objectStore("favorites");

      // const t = {
      //   videoId: "dfff",
      // };
      // this.objectStore.add(t);
      // for (var i in test22) {
      //   let reqTest = this.objectStore.add(test22[i]);
      //   reqTest.onsuccess = function (event) {
      //     console.log("test!! ", i);
      //   };
      // }
    };

    //
    this.request.onupgradeneeded = (event) => {
      console.log("Table생성 or 버전업");

      DataBase.db = (event.target as IDBOpenDBRequest).result;
      console.log("4", DataBase.db);

      this.makeDb();
      // let objectStore = this.db.createObjectStore("favorites", { keyPath: "myKey" });
      // objectStore.createIndex("videoId", "videoId", { unique: true });

      // objectStore.transaction.oncomplete = function (event) {
      //   var customerObjectStore = db
      //     .transaction("favorites", "readwrite")
      //     .objectStore("favorites");

      //   console.log(customerObjectStore);
      //   test2.forEach((t) => customerObjectStore.add(t));
      // };
    };
  }

  makeDb() {
    const store = DataBase.db.createObjectStore("favorites", {
      keyPath: "myKey",
      autoIncrement: true,
    });
    // store.createIndex("videoId", "videoId", { unique: true });
  }

  public static getInstance() {
    if (!DataBase.instance) {
      DataBase.instance = new DataBase();
    }
    return DataBase.instance;
  }
  addData(videoId: string) {
    const data = {
      videoId,
    };

    console.log("add test", data);

    this.transaction = DataBase.db.transaction("favorites", "readwrite");
    this.transaction.oncomplete = function (event: Event) {
      console.log("transaction complete", event);
    };
    this.transaction.onerror = function (event: Event) {
      console.log("transaction error", event);
    };

    this.objectStore = this.transaction.objectStore("favorites");
    this.objectStore.add(data);
  }

  deleteData(videoId: string) {
    const transaction = DataBase.db.transaction("favorites", "readwrite");

    const objectStore = transaction.objectStore("favorites");

    transaction.oncomplete = function (event: Event) {
      console.log("transaction delete complete", event);
    };
    transaction.onerror = function (event: Event) {
      console.log("transaction delete error", event);
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

    // const req = objectStore.openCursor();
    // req.onsuccess = (event) => {
    //   const cursor = (event.target as IDBRequest).result;
    //   if (cursor) {
    //     let key = cursor.primaryKey;
    //     let value = cursor.value;

    //     console.log(key, value);

    //     // cursor.continue();
    //   }
    // };

    // console.log(this.objectStore.indexNames);
  }

  createStore() {
    this.request.onupgradeneeded = function (event) {
      const db = (event.target as IDBOpenDBRequest).result;
      console.log(typeof event.target);
      const objectStore = db.createObjectStore("favorites", {
        keyPath: "key",
      });

      objectStore.transaction.oncomplete = () => {
        let favoritesObjectStore = db
          .transaction("favorites", "readwrite")
          .objectStore("customers");

        favoritesObjectStore.add({ videoId: "231d" });
      };
    };
    this.request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      console.log("연결 성공");

      // 트랜잭션 추가
      const transaction = db.transaction(["favorites"], "readwrite");
      const objectStore = transaction.objectStore("favorites");
    };
  }
}
