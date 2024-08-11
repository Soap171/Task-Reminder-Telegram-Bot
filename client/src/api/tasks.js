import { useMutation } from "@tanstack/react-query";
export const fetchTasks = async () => {
  try {
    const response = await fetch("/api/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const createdTask = await response.json();
    return createdTask;
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error;
  }
};
