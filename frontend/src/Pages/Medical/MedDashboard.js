import React, { useEffect, useState } from 'react';
import "../Css/Medical/Med_dashboardcss.css"; // Include updated CSS
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import MedicalSidebar from '../../Components/Medicaldashboard/MedicalSidebar'; 
import myLogo from '../../Assets/Medical/logo.png';


const URL = "http://localhost:3000/medtask/";

const fetchHandler = async () => {
    const data = await axios.get(URL).then((res) => res.data);
    return data;
};

function MedicalDash() {
    const [tasks, setTasks] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); // Define errorMessage state
    const [searchTerm, setSearchTerm] = useState(''); // Define searchTerm state

    // State variables for task counts and checkup status
    const [totalTasks, setTotalTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [allCheckupsDone, setAllCheckupsDone] = useState(false);
    const navigate = useNavigate();

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
        }).catch(error => {
            setErrorMessage('Failed to fetch tasks');
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

    const filteredTasks = tasks.filter(task => 
        task.Elder_pname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18); // Reduced font size
        doc.setFont("Helvetica", "bold");

        doc.text('Tasks for Today', 14, 16);

                // Add a logo with adjusted dimensions
                const logoWidth = 10; // Adjusted width
                const logoHeight = 10; // Adjusted height
                const logoX = 186; // Adjusted x-coordinate to move the logo to the right
                const logoY = 10; // y-coordinate remains the same
                doc.addImage(myLogo, 'PNG', logoX, logoY, logoWidth, logoHeight);
        
        doc.autoTable({
            startY: 25,
            head: [['Elder Name', 'Date for Treatment', 'Treatments', 'Status']],
            body: filteredTasks.map(task => [
                task.Elder_pname,
                new Date(task.Taskdate).toLocaleDateString(),
                task.Treatments,
                task.Status
            ]),
        });
        // Add signature area with left margin
        const signatureY = doc.autoTable.previous.finalY + 10; // Position below the table
        const signatureLeftMargin = 15; // Left margin for the signature text
        doc.setFontSize(8); // 
        doc.text("______________________", signatureLeftMargin, signatureY); // Signature line with margin
        doc.text("Medical Officer", signatureLeftMargin, signatureY + 10); // Title below the signature line with margin

        // Add footer with correct date
        const footerY = signatureY + 20; // Position footer below signature area
        doc.setFontSize(8);
        doc.setFont("Helvetica", "normal");
        const formattedDate = new Date().toLocaleDateString(); // Correctly formatted date
        doc.text("Generated on: " + formattedDate, 14, footerY);
        doc.save('tasks_report.pdf');
    };

    const handleEdit = (id) => {
    navigate(`/edit-task/${id}`);
  };

    return (
        <div className="flex h-screen">
            <MedicalSidebar />
            <div className="flex-1 p-32">
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
                            <input 
                                type="text" 
                                placeholder="Search tasks by name..." 
                                className="border p-2 rounded-lg mb-4"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button onClick={generatePDF} className="report-btn mb-4">📄 Generate Report</button>
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
                                    {filteredTasks.map((task) => (
                                        <tr key={task._id}>
                                            <td>{task.Elder_pname}</td>
                                            <td>{new Date(task.Taskdate).toLocaleDateString()}</td>
                                            <td>{task.Treatments}</td>
                                            <td>{task.Status}</td>
                                            <td className="action-buttons">
                                                <button className="edit-btn" onClick={() => handleEdit(task._id)}>✏️</button>
                                                <button className="delete-btn" onClick={() => deleteTask(task._id)}>🗑️</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </div>
                    <Link to="/MedtaskForm"> <button className="add-btn">Add Task</button></Link>
                </div>
            </div>
        </div>
    );
}

export default MedicalDash;