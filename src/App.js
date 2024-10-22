// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import AddTask from './TaskPages/addTask.jsx'
import ViewTasks from './TaskPages/viewTask.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/AddTask" element={<AddTask />} />
        <Route path="/dashboard/ViewTasks" element={<ViewTasks />} />

      </Routes>
    </Router>
  );
};

export default App;
