import express from "express";
import { verifyToken } from "../utils/verifyToken.js"; // middleware use to verify user token and attach to the req
import {
  addTask,
  viewTasks,
  deleteTask,
  updateTask,
} from "../controllers/task.js";

const router = express.Router();

// create task
router.post("/", verifyToken, addTask);
router.get("/", verifyToken, viewTasks);
router.delete("/:id", verifyToken, deleteTask);
router.patch("/:id", verifyToken, updateTask);
export default router;
