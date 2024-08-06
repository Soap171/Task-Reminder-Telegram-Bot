import mongoose from "mongoose";
import moment from "moment-timezone";

const taskSchema = new mongoose.Schema({
  telegramId: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  notified: { type: Boolean, default: false },
});

// Middleware to adjust dueDate to Sri Lanka time before saving
taskSchema.pre("save", function (next) {
  if (this.dueDate) {
    this.dueDate = moment.tz(this.dueDate, "Asia/Colombo").toDate();
  }
  next();
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
