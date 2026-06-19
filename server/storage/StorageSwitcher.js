// all services storage factory 
import LocalStorageProvider from "./LocalStorageProvider.js";
import DatabaseStorageProvider from "./DatabaseStorageProvider.js";
import S3StorageProvider from "./S3StorageProvider.js";

//switcher enabling to create instances or any service based on config file
function createStorageProvider(config, db) {
  switch (config.STORAGE_TYPE) {
    case "local":
      return new LocalStorageProvider(config.LOCAL_PATH);

    case "db":
      return new DatabaseStorageProvider(db);


    
    case "s3":
        return new S3StorageProvider(config);

    default:
      throw new Error("Invalid storage type");
  }
}

export default createStorageProvider;