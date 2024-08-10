import React, { useState, useEffect } from "react";
import TaskView from "./TaskView";
import TaskForm from "./TaskForm";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/tasks";

function TaskManager() {
  // Hooks are always called at the top level
  const {
    isLoading,
    isError,
    data: fetchedTasks,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  // This effect runs after the data is fetched
  useEffect(() => {
    if (fetchedTasks) {
      setTasks(fetchedTasks);
    }
  }, [fetchedTasks]);

  // Conditional rendering without affecting hook calls
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleUpdate = (task) => {
    setSelectedTask(task);
  };

  const handleDelete = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const handleSubmit = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setSelectedTask(null);
  };

  return (
    <div className="container">
      <TaskForm selectedTask={selectedTask} onSubmit={handleSubmit} />
      <TaskView tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
}

export default TaskManager;
