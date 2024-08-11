import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function TaskView({ tasks, onUpdate, onDelete }) {
  return (
    <div className="container m-5">
      {tasks.map((task, index) => (
        <div
          key={index}
          className="task-item d-flex justify-content-between align-items-center mb-2 p-2 border rounded"
        >
          <div>
            <h5>{task.description}</h5>
            <p className="mb-0 text-muted">Due: {task.dueDate}</p>
            <p className="mb-0">Recurrence: {task.recurrence}</p>
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
