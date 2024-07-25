import Task from "../models/task.js";

export const addTask = async (req, res) => {
  const { telegramId, description, dueDate } = req.body;
  try {
    const task = new Task({ telegramId, description, dueDate });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error saving task" });
  }
};

export default addTask;
