// “fake AWS S3”.
import StorageProvider from "./StorageProvider.js";
class S3StorageProvider extends StorageProvider {
  async save(id, buffer) {}

  async get(id) {}
}