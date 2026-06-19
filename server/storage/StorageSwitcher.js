// all services
import LocalStorageProvider from "./LocalStorageProvider";
import DatabaseStorageProvider from "./DatabaseStorageProvider";

//switcher enabling
function createStorageProvider(config, db) {
  switch (config.STORAGE_TYPE) {
    case "local":
      return new LocalStorageProvider(config.LOCAL_PATH);

    case "db":
      return new DatabaseStorageProvider(db);

    default:
      throw new Error("Invalid storage type");
  }
}

export default createStorageProvider;