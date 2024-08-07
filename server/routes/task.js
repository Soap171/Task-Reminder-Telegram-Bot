import express from "express";
import { verifyToken } from "../utils/verifyToken.js"; // middleware use to verify user token and attach to the req
import addTask from "../controllers/task.js";

const router = express.Router();

// create task
router.post("/", verifyToken, addTask);

export default router;
