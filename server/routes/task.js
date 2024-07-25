import express from "express";
const router = express.Router();
import Task from "../models/task.js";
// Create a new task
router.post("/", async (req, res) => {
  const { telegramId, description, dueDate } = req.body;
  try {
    const task = new Task({ telegramId, description, dueDate });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error saving task" });
  }
});

export default router;
