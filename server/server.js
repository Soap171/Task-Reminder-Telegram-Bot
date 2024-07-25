import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bot from "./bot.js";
import taskRoutes from "./routes/task.js";
import Task from "./models/task.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/tasks", taskRoutes);

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
