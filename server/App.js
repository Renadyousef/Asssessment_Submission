import express from "express";
import cors from "cors";
import helloRoutes from "./routes/helloRoutes.js";
import createStorageProvider from "./storage/StorageSwitcher.js"; // storage factory
import BlobService from "./services/BlobService.js";
import BlobController from "./controllers/BlobController.js";
import blobRoutes from "./routes/blobRoutes.js";
import auth from "./middleware/auth.js";
import db from "./DB_connection/db.js";

const app = express();

app.use(cors());
app.use(express.json());

// storage
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