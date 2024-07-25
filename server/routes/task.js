import express from "express";
const router = express.Router();
import addTask from "../controllers/task.js";
// Create a new task
router.post("/", addTask);

export default router;
