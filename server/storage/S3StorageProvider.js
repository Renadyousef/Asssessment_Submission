// fake AWS S3 using docker
import StorageProvider from "./StorageProvider.js";
export default class S3StorageProvider extends StorageProvider {
  constructor() {
    super();
    this.baseUrl = "http://minio:9000";
    this.bucket = "blobs";
  }

  async save(id, buffer) {
    const res = await fetch(
      `${this.baseUrl}/${this.bucket}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: buffer,
      }
    );

    if (!res.ok) {
      throw new Error("Failed to upload to MinIO");
    }
  }

  async get(id) {
    const res = await fetch(
      `${this.baseUrl}/${this.bucket}/${id}`
    );

    if (!res.ok) return null;

    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }
}

