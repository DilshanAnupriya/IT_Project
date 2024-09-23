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
    const [users, setUsers] = useState([]);

    // State variables for task counts and checkup status
    const [totalTasks, setTotalTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [allCheckupsDone, setAllCheckupsDone] = useState(false);

    useEffect(() => {
        fetchHandler().then((data) => {
            const tasks = data.mtask;
            setUsers(tasks);

            // Calculate total, completed tasks, and determine if all are done
            const total = tasks.length;
            const completed = tasks.filter(task => task.Status === 'Done').length;

            setTotalTasks(total);
            setCompletedTasks(completed);
            setAllCheckupsDone(total > 0 && completed === total);  // Set true if all tasks are done
        });
    }, []);

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
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.Elder_pname}</td>
                                        <td>{new Date(user.Taskdate).toLocaleDateString()}</td>
                                        <td>{user.Treatments}</td>
                                        <td>{user.Status}</td>
                                        <td className="action-buttons">
                                            <button className="edit-btn">✏️</button>
                                            <button className="delete-btn">🗑️</button>
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
