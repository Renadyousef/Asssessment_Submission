import express from "express";
import cors from "cors";

import createStorageProvider from "./storage/StorageSwitcher.js"; // storage factory
import BlobService from "./services/blobService.js";
import BlobController from "./controllers/blobController.js";
import blobRoutes from "./routes/blobs.js";
import auth from "./middleware/auth.js";
import db from "./DB_connection/db.js";

const app = express();

app.use(cors());
//add more file tolrance in json req
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// storage instance
const storage = createStorageProvider(process.env, db);

// service
const service = new BlobService(storage, db);

// controller
const controller = new BlobController(service);

// routes
app.use(auth);
app.use(blobRoutes(controller));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});