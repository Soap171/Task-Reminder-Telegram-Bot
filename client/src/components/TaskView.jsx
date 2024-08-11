import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FcAdvertising } from "react-icons/fc";
import { FcCalendar } from "react-icons/fc";
import { FcSynchronize } from "react-icons/fc";

function TaskView({ tasks, onUpdate, onDelete }) {
  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mt-5 shadow-lg p-4 mb-4 rounded">
      {tasks.map((task, index) => (
        <div
          key={index}
          className="task-item d-flex justify-content-between align-items-center mb-2 p-2 border rounded"
        >
          <div>
            <h5>
              <FcAdvertising /> {task.description}
            </h5>
            <p className="mb-0 text-muted">
              <FcCalendar /> {""}
              <strong>Due:</strong> {formatDate(task.dueDate)}
            </p>
            <p className="mb-0 text-muted">
              <FcSynchronize /> {""}
              <strong>Recurrence:</strong> {task.recurrence}
            </p>
          </div>
          <div>
            <FaEdit
              className="me-2 text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => onUpdate(task)}
            />
            <FaTrash
              className="text-danger"
              style={{ cursor: "pointer" }}
              onClick={() => onDelete(task)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskView;
