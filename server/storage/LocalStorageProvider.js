// store locally in files  write into files
import { writeFileSync, readFileSync } from "fs";
import { join } from "path";
import StorageProvider from "./StorageProvider.js";

class LocalStorageProvider extends StorageProvider {
  constructor(basePath) {
    super();
    this.basePath = basePath;
  }

  async save(id, buffer) {
    const filePath = join(this.basePath, id);
    writeFileSync(filePath, buffer);
  }

  async get(id) {
    const filePath = join(this.basePath, id);
    return readFileSync(filePath);
  }
}

export default LocalStorageProvider;