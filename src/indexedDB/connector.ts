export interface ConnectOptions {
  database: string;
  version: number;
  tables: TableProperties[];
  sync?: boolean;
}

export interface TableProperties {
  name: string;
  columns?: ColumnProperties[];
  options?: IDBObjectStoreParameters;
}

export interface ColumnProperties {
  name: string;
  keypath?: string;
  options?: IDBIndexParameters;
}

export class Connector {
  private _connectOptions: ConnectOptions;
  private _database?: IDBDatabase;
  private static _instance: Connector;

  private constructor(options: ConnectOptions) {
    this._connectOptions = options;
  }

  public static async create(options: ConnectOptions) {
    if (this._instance == null) {
      this._instance = new Connector(options);
      await this._instance.getDatabase();
    }

    return this._instance;
  }

  public static get instance() {
    return this._instance;
  }

  public async getDatabase() {
    if (this._database == null) {
      this._database = await this.promisifiedIndexedDBConnect();
    }

    return this._database;
  }

  private promisifiedIndexedDBConnect(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(
        this._connectOptions.database,
        this._connectOptions.version
      );

      request.onsuccess = (event) => {
        const { result: db } = event.target as IDBOpenDBRequest;

        db.onabort = (event) => {};

        db.onclose = (event) => {};

        db.onversionchange = (event) => {};

        db.onerror = (event) => {};

        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        const { result: db } = event.target as IDBOpenDBRequest;

        if (this._connectOptions.sync) {
          for (const name of db.objectStoreNames) {
            db.deleteObjectStore(name);
          }
        }

        this._connectOptions.tables.forEach((table) => {
          const objectStore = db.createObjectStore(table.name, table.options);

          table.columns?.forEach((column) => {
            objectStore.createIndex(
              column.name,
              column.keypath ?? column.name,
              column.options
            );
          });
        });
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }
}

// export class Database<T = void> {
//   public findTable() {}
//   public createTable() {}
//   public updateTable() {}
//   public deleteTable() {}
// }

// export class Transaction<T = void> {
//   public findAll() {}
//   public findOne() {}

//   public createAll() {}
//   public createOne() {}

//   public updateAll() {}
//   public updateOne() {}

//   public deleteAll() {}
//   public deleteOne() {}
// }
