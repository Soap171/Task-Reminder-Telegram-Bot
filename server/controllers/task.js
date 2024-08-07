import Task from "../models/task.js";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.js";

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

export default addTask;
