import React, { useEffect, useState } from 'react';
import "../Css/Medicalcss/Med_dashboardcss.css"; // Include updated CSS
import Dash from "../../Components/Dashboard/Dashboard";
import axios from "axios";

const URL = "http://localhost:3000/medtask/";

const fetchHandler = async () => {
    const data = await axios.get(URL).then((res) => res.data);
    return data;
};

function MedicalDash() {
    const [tasks, setTasks] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); // Define errorMessage state

    // State variables for task counts and checkup status
    const [totalTasks, setTotalTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [allCheckupsDone, setAllCheckupsDone] = useState(false);

    useEffect(() => {
        fetchHandler().then((data) => {
            const tasks = data.mtask;
            setTasks(tasks);

            // Calculate total, completed tasks, and determine if all are done
            const total = tasks.length;
            const completed = tasks.filter(task => task.Status === 'Done').length;

            setTotalTasks(total);
            setCompletedTasks(completed);
            setAllCheckupsDone(total > 0 && completed === total);  // Set true if all tasks are done
        });
    }, []);

    // Delete task by ID
    const deleteTask = async (id) => {
        const deleteConfirmation = window.confirm(`Are you sure you want to delete the task with ID ${id}? This action cannot be undone.`);
        if (deleteConfirmation) {
            try {
                await axios.delete(`http://localhost:3000/medtask/delete/${id}`);
                setTasks(tasks.filter((task) => task._id !== id)); // Update tasks state after deletion
            } catch (error) {
                setErrorMessage('Failed to delete task. Please try again.'); // Set error message
            }
        }
    };

    return (
        <div>
            <div className='dashboard30'>
                <Dash />
            </div>
            <div className="container57">
                <div className="card-container">
                    <div className="card">
                        <h3>All Tasks</h3>
                        <p>{totalTasks}</p>
                    </div>
                    <div className="card">
                        <h3>Completed</h3>
                        <p>{completedTasks}</p>
                    </div>
                    <div className="card">
                        <h3>Remaining</h3>
                        <p>{totalTasks - completedTasks}</p>
                    </div>
                </div>

                {/* Conditionally render the button text and color */}
                <button 
                    className={`status-btn ${allCheckupsDone ? 'green' : 'red'}`}
                >
                    {allCheckupsDone ? 'ALL CHECKUPS ARE DONE' : 'CHECKUPS TO BE DONE'}
                </button>

                <div className="main-section">
                    <section>
                        <h1>Tasks</h1> 
                        {/* Display error message if there is one */}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <table className="task-table">
                            <thead>
                                <tr>
                                    <th>Elder Name</th>
                                    <th>Date for Treatment</th>
                                    <th>Treatments</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task) => (
                                    <tr key={task._id}>
                                        <td>{task.Elder_pname}</td>
                                        <td>{new Date(task.Taskdate).toLocaleDateString()}</td>
                                        <td>{task.Treatments}</td>
                                        <td>{task.Status}</td>
                                        <td className="action-buttons">
                                            <button className="edit-btn">✏️</button>
                                            <button className="delete-btn" onClick={() => deleteTask(task._id)}>🗑️</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
                <button className="add-btn">Add Task</button>

            </div>
        </div>
    );
}

export default MedicalDash;
