import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import AddTask from '../TaskPages/addTask';
import ViewTasks from '../TaskPages/viewTask';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <h4 className="sidebar-heading">Task Management</h4>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link" to="AddTask">Add Task</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="ViewTasks">View Tasks</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="edit-task">Edit Task</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="delete-task">Delete Task</Link>
              </li>
            </ul>   
          </div>
        </nav>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
          </div>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card text-white bg-primary">
                <div className="card-body">
                  <h5 className="card-title">Pending Tasks</h5>
                  <p className="card-text">You have 5 pending tasks.</p>
                  <Link to="view-tasks" className="btn btn-light">View Tasks</Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card text-white bg-success">
                <div className="card-body">
                  <h5 className="card-title">Completed Tasks</h5>
                  <p className="card-text">You have completed 10 tasks.</p>
                  <Link to="view-tasks" className="btn btn-light">View Tasks</Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card text-white bg-warning">
                <div className="card-body">
                  <h5 className="card-title">Overdue Tasks</h5>
                  <p className="card-text">You have 2 overdue tasks.</p>
                  <Link to="view-tasks" className="btn btn-light">View Tasks</Link>
                </div>
              </div>
            </div>
          </div>

          <Outlet /> {/* This will render the selected task page */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
