import TelegramBot from "node-telegram-bot-api";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Task from "./models/task.js";
dotenv.config();
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Notify users about their tasks
setInterval(async () => {
  const now = new Date();
  const tasks = await Task.find({ dueDate: { $lte: now }, notified: false });

  tasks.forEach(async (task) => {
    try {
      const chatId = task.telegramId;
      await bot.sendMessage(
        chatId,
        `Reminder: ${task.description} is due now!`
      );
      task.notified = true;
      await task.save();
      console.log("checked");
    } catch (error) {
      console.log(error);
    }
  });
}, 60000); // Check every minute

export default bot;
