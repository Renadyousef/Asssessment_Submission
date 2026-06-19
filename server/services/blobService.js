class BlobService {
  constructor(storage, db) {
    this.storage = storage;
    this.db = db;
  }

  async upload(id, base64Data) {
    const buffer = Buffer.from(base64Data, "base64");

    await this.storage.save(id, buffer); //save into service provider based on type?

    await this.db.query( //always save into meta data in postgres
      "INSERT INTO blobs (id, size, storage_type, created_at) VALUES ($1, $2, $3, NOW())",
      [id, buffer.length, process.env.STORAGE_TYPE]
    );

    return { id };
  }

  async get(id) {
    const meta = await this.db.query(
      "SELECT * FROM blobs WHERE id = $1",
      [id]
    );

    if (!meta.rows.length) {
      throw new Error("Blob not found");
    }

    const buffer = await this.storage.get(id);

    return {
      id,
      data: buffer.toString("base64"),
      size: meta.rows[0].size,
      created_at: meta.rows[0].created_at,
    };
  }
}

export default BlobService;