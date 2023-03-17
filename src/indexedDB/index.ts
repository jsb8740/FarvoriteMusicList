export default class DataBase {
  private request;
  private db;

  private static instance: DataBase;
  testData = {
    videoId: ["VOUK-xFAyk", "KqFAs5d3Yl8"],
  };

  constructor() {
    console.log("db 시작");

    this.request = window.indexedDB.open("favoritesDB");
    // this.request.onerror = function (event) {};

    // this.createStore();
    this.test();
  }
  test() {
    this.request.onerror = (event) => {
      alert("IndedxedDB Error: ", event);
    };

    this.request.onsuccess = (event) => {
      // arrow functions의 this는 상위의 this
      console.log("연결 성공");
      const db = this.request.result;
      const testDB = event.target.result;
      console.log("1", db);
      console.log("2", testDB);
    };

    //
    this.request.onupgradeneeded = (event) => {
      console.log("Table생성 or 버전업");

      const db = event.target.result;
      console.log("3", db);

      let objectStore = db.createObjectStore("favorites", { keyPath: "myKey" });
      objectStore.createIndex("videoId", "videoId", { unique: true });
      objectStore.transaction.oncomplete = function (event) {
        var customerObjectStore = db
          .transaction("favorites", "readwrite")
          .objectStore("favorites");
      };
    };
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
      const db = event.target.result;
      console.log("연결 성공");

      // 트랜잭션 추가
      const transaction = db.transaction(["favorites"], "readwrite");
      const objectStore = transaction.objectStore("favorites");
    };
  }
}
