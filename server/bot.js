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
  //now.setDate(now.getDate() + 1);  handle the next day notifiecations if need
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
    //}  (To test the retry mechanism)
    await bot.sendMessage(
      chatId,
      `Reminder: ${task.description} is due now! ⏰`
    );
    task.notified = true;

    // Handle recurrence
    if (task.recurrence === "weekly") {
      task.dueDate = new Date(task.dueDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      task.notified = false;
    } else if (task.recurrence === "monthly") {
      let newDueDate = new Date(task.dueDate.getTime());

      newDueDate.setMonth(newDueDate.getMonth() + 1);
      task.dueDate = newDueDate;
      task.notified = false;
    } else if (task.recurrence === "yearly") {
      let newDueDate = new Date(task.dueDate.getTime());
      newDueDate.setFullYear(newDueDate.getFullYear() + 1);
      task.dueDate = newDueDate;
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

// Bot cmds
bot.onText(/\/mytasks/, async (msg) => {
  const chatId = msg.chat.id;
  const tasks = await Task.find({ telegramId: chatId });

  if (tasks.length === 0) {
    await bot.sendMessage(chatId, "📭 You have no tasks.");
  } else {
    let message = "📝 Your tasks:\n";
    tasks.forEach((task) => {
      message += `\n- ${
        task.description
      } (Due: ${task.dueDate.toDateString()}) 📅`;
    });
    await bot.sendMessage(chatId, message);
  }
});

bot.onText(/\/myid/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, `🆔 Your Telegram ID is: ${chatId}`);
});

export default bot;
