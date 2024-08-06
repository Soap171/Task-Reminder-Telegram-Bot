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
