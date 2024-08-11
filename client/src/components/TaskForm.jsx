import React, { useState, useEffect } from "react";
import Img from "../images/Form.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the DatePicker CSS
import "../index.css"; // Custom CSS
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, updateTask } from "../api/tasks";

function TaskForm({ selectedTask, onSubmit }) {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState(null);
  const [task, setTask] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const [validated, setValidated] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });

  const createUpdateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error updating task:", error);
    },
  });

  useEffect(() => {
    if (selectedTask) {
      setTask(selectedTask.description);
      setSelectedDate(new Date(selectedTask.dueDate));
      setRecurrence(selectedTask.recurrence);
      setIsUpdateMode(true);
    } else {
      setIsUpdateMode(false);
    }
  }, [selectedTask]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false || task.trim() === "" || !selectedDate) {
      e.stopPropagation();
    } else {
      if (isUpdateMode) {
        createUpdateMutation.mutate({
          id: selectedTask._id,
          description: task,
          dueDate: selectedDate,
          recurrence: recurrence,
        });
        console.log("update task");
      } else {
        createTaskMutation.mutate({
          description: task,
          dueDate: selectedDate,
          recurrence: recurrence,
        });
        console.log("create task");
      }
    }

    setValidated(true);
  };
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-5 text-center">
          <img src={Img} alt="example" />
        </div>
        <div className="col-md-7">
          <p className="text-muted">
            Add a Task with Date and Description to get notified
          </p>
          <form
            className={`row g-3 needs-validation ${
              validated ? "was-validated" : ""
            }`}
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="col-12">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    validated && task.trim() === "" ? "is-invalid" : ""
                  }`}
                  name="taskName"
                  id="taskName"
                  placeholder="Task Name"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  required
                />
                <label htmlFor="taskName" className="form-label">
                  Task Name
                </label>
                <div className="invalid-feedback">
                  Please enter your task name.
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating mb-3">
                <DatePicker
                  id="date-picker"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className={`form-control custom-input ${
                    validated && !selectedDate ? "is-invalid" : ""
                  }`}
                  placeholderText="Choose a date"
                  required
                />

                {/* Manually show validation message */}
                {validated && !selectedDate && (
                  <div className="invalid-feedback d-block">
                    Please select a date.
                  </div>
                )}
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="recurrence"
                  value={recurrence}
                  onChange={(e) => setRecurrence(e.target.value)}
                  required
                >
                  <option value="">Select Recurrence</option>
                  <option value="none">None</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                <label htmlFor="recurrence" className="form-label">
                  Recurrence
                </label>
                <div className="invalid-feedback">
                  Please select a recurrence.
                </div>
              </div>
            </div>
            <div className="col-12 text-start">
              <button className="btn btn-primary" type="submit">
                {selectedTask ? "Update Task" : "Add The Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
