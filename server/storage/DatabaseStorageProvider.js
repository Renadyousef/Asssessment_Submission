//Stores data in sql connect this to postgres
//metadata (always used) in any service btw , actual data saved where based on service

import StorageProvider from "./StorageProvider.js";

class DatabaseStorageProvider extends StorageProvider {
  constructor(db) {
    super();
    this.db = db; // insert pool here?
  }

  async save(id, buffer) { //storage type in meta data as to desgin it to save types across services
    await this.db.query(
      "INSERT INTO blobs (id, size, storage_type, created_at) VALUES ($1, $2, $3, NOW())",
      [id, buffer.length, "db"]
    );

    await this.db.query(
      "INSERT INTO blob_data (id, data) VALUES ($1, $2)",
      [id, buffer]
    );
  }

  async get(id) {
    const result = await this.db.query(
      "SELECT data FROM blob_data WHERE id = $1",
      [id]
    );

    if (!result.rows.length) {
      throw new Error("Blob not found");
    }

    return result.rows[0].data;
  }
}

export default DatabaseStorageProvider;