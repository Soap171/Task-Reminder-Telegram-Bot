import React, { useState } from "react";
import Img from "../images/Form.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the DatePicker CSS
import "../index.css"; // Custom CSS

function TaskForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [task, setTask] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false || task.trim() === "" || !selectedDate) {
      e.stopPropagation();
    } else {
      // Form is valid, proceed with task submission logic
      console.log("Task:", task, "Date:", selectedDate);
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
            <div className="col-12 text-start">
              <button className="btn btn-primary" type="submit">
                Add The Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
