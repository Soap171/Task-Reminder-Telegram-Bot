import Task from "../models/task.js";
import { errorHandler } from "../utils/error.js";

export const addTask = async (req, res, next) => {
  const { telegramId, description, dueDate, recurrence } = req.body;

  if (!telegramId || !description || !dueDate || !recurrence) {
    return next(errorHandler(400, "All fields are required"));
  }
  try {
    const task = new Task({ telegramId, description, dueDate, recurrence });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    next(errorHandler(500, "Failed to create task"));
  }
};

export default addTask;
