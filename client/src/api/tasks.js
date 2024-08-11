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

export const updateTask = async ({ id, description, dueDate, recurrence }) => {
  console.log(id, description, dueDate, recurrence);
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ description, dueDate, recurrence }),
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update task");
  }
};
