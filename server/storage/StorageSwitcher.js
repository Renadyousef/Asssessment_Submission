// all services storage factory 
import LocalStorageProvider from "./LocalStorageProvider.js";
import DatabaseStorageProvider from "./DatabaseStorageProvider.js";

//switcher enabling to create instances or any service based on config file
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