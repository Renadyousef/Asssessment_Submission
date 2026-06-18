import express from "express";
import { sayHello } from "../controllers/helloController.js";

const router = express.Router();

router.post("/hello", sayHello);

export default router;