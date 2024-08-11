import React, { useState, useEffect } from "react";
import TaskView from "./TaskView";
import TaskForm from "./TaskForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTasks, deleteTask } from "../api/tasks";
import useAuthContext from "../hooks/useAuthContext";

function TaskManager() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: fetchedTasks,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  const { user } = useAuthContext();

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  // This effect runs after the data is fetched
  useEffect(() => {
    if (fetchedTasks) {
      setTasks(fetchedTasks);
    }
  }, [fetchedTasks]);

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  if (!user) {
    return <div></div>;
  }
  // Conditional rendering without affecting hook calls
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleUpdate = (task) => {
    setSelectedTask(task);
    console.log(task._id);
  };

  const handleDelete = (task) => {
    deleteTaskMutation.mutate(task._id);
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
