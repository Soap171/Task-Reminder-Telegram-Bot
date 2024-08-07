import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import Task from "./models/task.js";
import Queue from "./utils/Queue.js";
dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const taskQueue = new Queue();

const MAX_RETRIES = 3;
const RETRY_DELAY = 60000;

setInterval(async () => {
  console.log("Interval function called");
  const now = new Date();
  //now.setDate(now.getDate() + 2);
  console.log(now);
  const tasks = await Task.find({ dueDate: { $lte: now }, notified: false });

  tasks.forEach((task) => {
    taskQueue.enqueue(task);
  });

  while (!taskQueue.isEmpty()) {
    const task = taskQueue.dequeue();
    await sendNotification(task);
  }
}, 60000);

async function sendNotification(task) {
  try {
    const chatId = task.telegramId;

    // Simulate a failure
    //if (Math.random() < 0.5) {
    // throw new Error("Simulated failure");
    //}
    await bot.sendMessage(chatId, `Reminder: ${task.description} is due now!`);
    task.notified = true;

    // Handle recurrence
    if (task.recurrence === "weekly") {
      task.dueDate = new Date(task.dueDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Add 7 days
      task.notified = false;
    } else if (task.recurrence === "monthly") {
      task.dueDate.setMonth(task.dueDate.getMonth() + 1); // Add 1 month
      task.notified = false;
    } else if (task.recurrence === "yearly") {
      task.dueDate.setFullYear(task.dueDate.getFullYear() + 1); // Add 1 year
      task.notified = false;
    }

    task.retryAttempts = 0; // Reset retry attempts on success
    await task.save();
    console.log(`Notification sent for task: ${task.description}`);
  } catch (error) {
    console.log(
      `Error sending notification for task: ${task.description}`,
      error
    );
    if (task.retryAttempts < MAX_RETRIES) {
      task.retryAttempts += 1;
      await task.save();
      setTimeout(
        () => sendNotification(task),
        RETRY_DELAY * task.retryAttempts
      );
    } else {
      console.log(`Max retries reached for task: ${task.description}`);
    }
  }
}

export default bot;
