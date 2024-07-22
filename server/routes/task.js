const express = require("express");
const router = express.Router();
const Task = require("../models/task");

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

module.exports = router;
