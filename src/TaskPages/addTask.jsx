import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar"; 
import Footer from "../pages/footer"; 

const AddTask = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending"); // Default status
  const [apiError, setApiError] = useState("");
  const [showToast, setShowToast] = useState(false); // State for toast visibility

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
          "http://localhost:3000/api/addTask",
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
        setShowToast(true); // Show success toast

        // Clear form fields after successful submission
        setTaskName("");
        setDescription("");
        setDueDate("");
        setStatus("pending");
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
    <div className="container-fluid d-flex flex-column min-vh-100">
      <Navbar /> {/* Add Navbar component here */}
      
      {showToast && (
        <div className="toast show position-fixed top-0 start-50 translate-middle-x m-3" role="alert" aria-live="assertive" aria-atomic="true" style={{ backgroundColor: '#28a745', color: 'white' }}>
          <div className="toast-header">
            <strong className="me-auto">Success</strong>
            <button type="button" className="btn-close btn-close-white" onClick={() => setShowToast(false)}></button>
          </div>
          <div className="toast-body">
            Task added successfully!
          </div>
        </div>
      )}

      <div className="container mt-4 max-w-2xl mx-auto p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Task</h2>
        {apiError && <div className="alert alert-danger mb-4 text-red-600">{apiError}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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

          <div className="mb-4">
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

          <div className="mb-4">
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

          <div className="mb-4">
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

          <button type="submit" className="btn btn-primary w-full">
            Add Task
          </button>
        </form>
      </div>

      <Footer /> {/* Add Footer component here */}
    </div>
  );
};

export default AddTask;
