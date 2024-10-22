import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://9834-103-240-170-60.ngrok-free.app/api/getAllTask");
                console.log("Fetched tasks:", response.data);
                setTasks(response.data); // Adjust if response structure is different
            } catch (error) {
                console.error("Error fetching tasks:", error.response ? error.response.data : error.message);
                setError("Failed to fetch tasks. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleSort = () => {
        const sortedTasks = [...tasks].sort((a, b) => {
            return sortOrder === "asc"
                ? a.status.localeCompare(b.status)
                : b.status.localeCompare(a.status);
        });
        setTasks(sortedTasks);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    if (loading) {
        return <p>Loading tasks...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!tasks || tasks.length === 0) {
        return <p>No tasks available.</p>;
    }

    return (
        <div className="container">
            <h2>View Tasks</h2>
            <button onClick={handleSort} className="btn btn-primary mb-3">
                Sort by Status {sortOrder === "asc" ? "↑" : "↓"}
            </button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task._id}>
                            <td>{task.taskName}</td>
                            <td>{task.description}</td>
                            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                            <td>{task.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewTasks;
