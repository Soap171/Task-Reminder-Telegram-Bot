import React, { useState } from "react";
import TaskView from "./TaskView";
import TaskForm from "./TaskForm";
function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1", dueDate: "2023-10-10" },
    { id: 2, name: "Task 2", dueDate: "2023-10-15" },
    { id: 3, name: "Task 3", dueDate: "2023-10-20" },
  ]);

  const [selectedTask, setSelectedTask] = useState(null);

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
