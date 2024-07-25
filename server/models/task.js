import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  telegramId: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  notified: { type: Boolean, default: false },
});
const Task = mongoose.model("Task", taskSchema);

export default Task;
