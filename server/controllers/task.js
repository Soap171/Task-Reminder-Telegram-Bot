import Task from "../models/task.js";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.js";

// adding a task
export const addTask = async (req, res, next) => {
  const { description, dueDate, recurrence } = req.body; // access the data
  const userId = req.userId; // access the user id from request

  console.log(userId);

  if (!userId || !description || !dueDate || !recurrence) {
    return next(errorHandler(400, "All fields are required"));
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      next(errorHandler(404, "User not found")); // find the user
    }

    console.log(user.telegramId, "telegram Id");

    const task = new Task({
      user: user._id, // add the _id of the user
      telegramId: user.telegramId, // add the tel id of the user
      description,
      dueDate,
      recurrence,
    });
    await task.save();
    if (!task) {
      next(errorHandler(500, "Failed to create task"));
    }

    res.status(201).json(task);
  } catch (error) {
    next(errorHandler(500, "Failed to create task"));
    console.log(error);
  }
};

// view all tasks
export const viewTasks = async (req, res, next) => {
  const userId = req.userId;

  if (!userId) {
    return next(errorHandler(400, "User id is required"));
  }

  try {
    const tasks = await Task.find({ user: userId });
    if (!tasks) {
      next(errorHandler(404, "Tasks not found"));
    }

    res.status(200).json(tasks);
  } catch (error) {
    next(errorHandler(500, "Failed to fetch tasks"));
  }
};

// delete task
export const deleteTask = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.userId;

  if (!id || !userId) {
    return next(errorHandler(400, "Task id and user id are required"));
  }

  try {
    const task = await Task.findOneAndDelete({ _id: id, user: userId });
    if (!task) {
      next(errorHandler(404, "Task not found"));
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(errorHandler(500, "Failed to delete task"));
  }
};

// update task
export const updateTask = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.userId;
  console.log("inside update task");

  if (!id || !userId) {
    return next(errorHandler(400, "Task id and user id are required"));
  }

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return next(errorHandler(404, "Task not found"));
    }

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    next(errorHandler(500, "Failed to update task"));
  }
};

export default addTask;
