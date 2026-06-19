// store in s3 or Compatible Storage Service as json data bases? or as they said "Use HTTP requests to MinIO"
import StorageProvider from "./StorageProvider.js";
class S3StorageProvider extends StorageProvider {
  async save(id, buffer) {}

  async get(id) {}
}