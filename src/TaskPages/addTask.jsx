import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending"); // Default status
  const [apiError, setApiError] = useState("");

  const validate = () => {
    // Basic validation
    if (!taskName || !description || !dueDate) {
      setApiError("All fields are required.");
      return false;
    }
    setApiError(""); // Clear any previous errors
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Adding task with data:", {
        taskName,
        description,
        dueDate,
        status,
      });

      try {
        const response = await axios.post(
          "https://9834-103-240-170-60.ngrok-free.app/api/addTask",
          {
            taskName,
            description,
            dueDate,
            status,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Task added successfully", response.data);
        navigate("/view-tasks"); // Redirect to view tasks page after successful addition
      } catch (error) {
        console.error("Error adding task:", error);
        
        if (error.response) {
          console.error("API response:", error.response.data);
          setApiError(
            error.response.data.message ||
            "Failed to add task. Please try again."
          );
        } else if (error.request) {
          console.error("No response received:", error.request);
          setApiError("No response from server. Please try again later.");
        } else {
          console.error("Error message:", error.message);
          setApiError("An unexpected error occurred. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="container">
      <h2>Add New Task</h2>
      {apiError && <div className="alert alert-danger">{apiError}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="taskName" className="form-label">
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-select"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
