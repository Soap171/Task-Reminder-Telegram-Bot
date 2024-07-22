const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  telegramId: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  notified: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", taskSchema);
