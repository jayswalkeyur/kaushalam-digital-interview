import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './footer';

const Dashboard = () => {
  // Sample data for tasks
  const tasks = [
    { id: 1, title: "Pending Tasks", description: "You have 5 pending tasks.", color: "bg-primary" },
    { id: 2, title: "Completed Tasks", description: "You have completed 10 tasks.", color: "bg-success" },
    { id: 3, title: "Overdue Tasks", description: "You have 2 overdue tasks.", color: "bg-warning" },
    { id: 4, title: "New Tasks", description: "You have 3 new tasks.", color: "bg-info" },
    { id: 5, title: "In Progress", description: "You have 4 tasks in progress.", color: "bg-secondary" },
    { id: 6, title: "Upcoming Deadlines", description: "You have 2 upcoming deadlines.", color: "bg-danger" },
    { id: 7, title: "Client Tasks", description: "You have 3 client-related tasks.", color: "bg-dark text-white" },
    { id: 8, title: "Team Tasks", description: "You have 5 team tasks assigned.", color: "bg-warning" },
    { id: 9, title: "Archived Tasks", description: "You have 7 archived tasks.", color: "bg-success" },
  ];

  return (
    <div className="container-fluid">
      <Navbar />

      <main role="main" className="container mt-4">
        <div className="row justify-content-center">
          {tasks.map(task => (
            <div className="col-md-4 mb-4" key={task.id}>
              <div className={`card text-white ${task.color} border-0 shadow`}>
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text">{task.description}</p>
                  <Link to="view-tasks" className="btn btn-light">View Tasks</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Outlet /> {/* This will render the selected task page */}
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
