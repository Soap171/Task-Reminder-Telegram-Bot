import React from "react";
import aboutImg from "../images/TaskNotifier.png";

function About() {
  return (
    <div className="container">
      <div className="row align-items-center vh-100">
        <div className="col-12 col-md-6">
          <img
            src={aboutImg}
            alt="About the project"
            className="img-fluid mx-auto"
          />
        </div>
        <div className="col-12 col-md-6">
          <p>
            Welcome to our project! This application is designed to help users
            manage their tasks efficiently and stay organized. Our goal is to
            provide a simple and intuitive interface that allows users to
            create, edit, and track their tasks with ease.
          </p>
          <p>Key Features:</p>
          <ul>
            <li>Task creation and management</li>
            <li>Reminders and notifications</li>
            <li>Recurring tasks</li>
            <li>Integration with Telegram for task reminders</li>
          </ul>
          <p>
            We hope you find this application useful and it helps you stay on
            top of your tasks. If you have any feedback or suggestions, please
            feel free to reach out to us.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
