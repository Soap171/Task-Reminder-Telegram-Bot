import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import Task from "./models/task.js";
import Queue from "./utils/Queue.js";
dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const taskQueue = new Queue();

setInterval(async () => {
  console.log("Interval function called");
  const now = new Date();
  const tasks = await Task.find({ dueDate: { $lte: now }, notified: false });

  tasks.forEach((task) => {
    taskQueue.enqueue(task);
  });

  while (!taskQueue.isEmpty()) {
    const task = taskQueue.dequeue();
    try {
      const chatId = task.telegramId;
      await bot.sendMessage(
        chatId,
        `Reminder: ${task.description} is due now!`
      );
      task.notified = true;

      // Handle recurrence
      if (task.recurrence === "weekly") {
        task.dueDate = new Date(
          task.dueDate.getTime() + 7 * 24 * 60 * 60 * 1000
        ); // Add 7 days
        task.notified = false;
      } else if (task.recurrence === "monthly") {
        task.dueDate.setMonth(task.dueDate.getMonth() + 1); // Add 1 month
        task.notified = false;
      } else if (task.recurrence === "yearly") {
        task.dueDate.setFullYear(task.dueDate.getFullYear() + 1); // Add 1 year
        task.notified = false;
      }

      await task.save();
      console.log(`Notification sent for task: ${task.description}`);
    } catch (error) {
      console.log(
        `Error sending notification for task: ${task.description}`,
        error
      );
    }
  }
}, 60000);

export default bot;
