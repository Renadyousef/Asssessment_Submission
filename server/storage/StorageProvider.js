// Storage Interface for all types of storages saving
class StorageProvider {
  async save(id, buffer) {
    throw new Error("Not implemented");
  }

  async get(id) {
    throw new Error("Not implemented");
  }
}

export default StorageProvider;