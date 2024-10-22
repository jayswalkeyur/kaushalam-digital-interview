import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../pages/Navbar";
import Footer from "../pages/footer"; 

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [sortDirection, setSortDirection] = useState("asc");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getAllTask");
        if (response.status === 200 && Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          throw new Error("Failed to fetch tasks: Unexpected response structure");
        }
      } catch (err) {
        console.error("Error fetching tasks:", err.response ? err.response.data : err.message);
        setError("Failed to fetch tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://localhost:3000/api/deleteTask/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
        showToast("Task deleted successfully!", "success");
      } catch (err) {
        console.error("Error deleting task:", err);
        setError("Failed to delete task. Please try again.");
      }
    }
  };

  const openUpdateModal = (task) => {
    setSelectedTask(task);
    setTaskName(task.taskName);
    setDescription(task.description);
    setDueDate(task.dueDate.split('T')[0]);
    setStatus(task.status);
    setModalVisible(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/updateTask/${selectedTask._id}`, {
        taskName,
        description,
        dueDate,
        status,
      });
      setTasks(tasks.map(task => (task._id === selectedTask._id ? response.data : task)));
      setModalVisible(false);
      showToast("Task updated successfully!", "success");
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task. Please try again.");
    }
  };

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000); // Hide after 3 seconds
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-success"; // Green
      case "Pending":
        return "bg-info"; // Blue
      case "Overdue":
        return "bg-danger"; // Red
      default:
        return "bg-secondary"; // Grey for any unexpected status
    }
  };

  const statusOrder = {
    "Pending": 0,
    "Completed": 1,
    "Overdue": 2,
  };

  const sortTasks = (key) => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    const sortedTasks = [...tasks].sort((a, b) => {
      const aStatusOrder = statusOrder[a[key]] || 3; // Default to a higher number for unexpected status
      const bStatusOrder = statusOrder[b[key]] || 3;
      return direction === "asc" ? aStatusOrder - bStatusOrder : bStatusOrder - aStatusOrder;
    });
    setTasks(sortedTasks);
    setSortDirection(direction);
  };

  if (loading) {
    return (
      <div className="container-fluid d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1 text-center">
          <p>Loading tasks...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1 text-center">
          <p className="text-danger">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container-fluid d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-4 flex-grow-1">
        <h2 className="mb-4 text-center">View Tasks</h2>
        
        {/* Toast Notification */}
        {toastVisible && (
          <div className={`alert alert-${toastMessage.includes("successfully") ? "success" : "danger"} alert-dismissible fade show`} role="alert">
            {toastMessage}
            <button type="button" className="btn-close" onClick={() => setToastVisible(false)} aria-label="Close"></button>
          </div>
        )}

        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>
                <span style={{ cursor: 'pointer' }} onClick={() => sortTasks('status')}>
                  Status
                </span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.taskName}</td>
                  <td>{task.description}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${getStatusClass(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-1"
                      onClick={() => openUpdateModal(task)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No tasks available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Task Modal */}
      {modalVisible && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Task</h5>
                <button type="button" className="btn-close" onClick={() => setModalVisible(false)}></button>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="taskName" className="form-label">Task Name</label>
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
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-control"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">Due Date</label>
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
                    <label htmlFor="status" className="form-label">Status</label>
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
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setModalVisible(false)}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">Update Task</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ViewTasks;
