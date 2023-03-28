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

    this.request = indexedDB.open("favoritesDB");
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
    store.createIndex("videoId", "videoId", { unique: true });
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
    transaction.objectStore("favorites").delete(videoId);
    transaction.oncomplete = function (event: Event) {
      console.log("transaction delete complete", event);
    };
    transaction.onerror = function (event: Event) {
      console.log("transaction delete error", event);
    };
    console.log(this.objectStore.indexNames);
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
