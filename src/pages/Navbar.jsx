import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTasks, FaPlus, FaSignOutAlt } from "react-icons/fa"; // Importing the sign-out icon

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow mb-4">
      <Link className="navbar-brand" to="/dashboard">
        Task Management
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link px-3" to="AddTask">
              <FaPlus className="mr-2" /> Add Task
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link px-3" to="ViewTasks">
              <FaTasks className="mr-2" /> View Tasks
            </Link>
          </li>
          <li className="nav-item">
            <button className="nav-link px-3 btn btn-link" onClick={handleLogout}>
              <FaSignOutAlt className="mr-2" /> Log out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
