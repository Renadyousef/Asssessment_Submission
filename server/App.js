import express from "express";
import cors from "cors";
import helloRoutes from "./routes/helloRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.use("/api", helloRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});