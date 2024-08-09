import React from "react";
function TaskForm() {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-5 text-center">
          <img src="" alt="example" />
        </div>
        <div className="col-md-7 ">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="text" />
            <label for="floatingInput">Task Name</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
