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

export const updateTask = async (taskId, updatedTaskData) => {
  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedTaskData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }
};
