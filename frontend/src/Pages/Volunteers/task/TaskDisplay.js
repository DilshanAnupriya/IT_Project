import React, { useEffect, useState, useRef } from 'react';
import Dash from "../../../Components/new_Dashboard/New_Dashboard";
import "../../Css/Volunteers/Task/TaskD.css";
import { Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { IoMdAddCircle } from "react-icons/io";
import { FaDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import axios from 'axios'; // For fetching the volunteers
import { useReactToPrint } from "react-to-print"
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const URL = "http://localhost:3000/task/";

const fetchHandler = async () => {
    const data = await axios.get(URL).then((res) => res.data);
    console.log(data);
    return data;
};

function TaskDisplay() {
    const [tasks, setTasks] = useState([]); // Changed from 'users' to 'tasks'
    const [setErrorMessage] = useState('');

    // Fetch tasks and volunteers from the server
    useEffect(() => {


        // Fetch tasks and set to state
        fetchHandler().then((data) => setTasks(data.task)); // Adjusted to 'data.task' to fit backend response

    }, []);

    // Delete   by ID
    const deleteTask = async (id) => {
        const deleteTask = window.confirm(`Are you sure you want to delete the Task with ID ${id}? This action cannot be undone.`);
        if (deleteTask) {
            try {
                await axios.delete(`http://localhost:3000/task/delete/${id}`);
                setTasks(tasks.filter((task) => task._id !== id));
            } catch (error) {
                setErrorMessage('Failed to delete Task. Please try again.');
            }
        }
    };
    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        onBeforeGetContent: () => {
            // Set the document title before printing
            document.title = "Task List";
            return Promise.resolve();
        },

    });



    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHandler().then((data) => {
            setTasks(data.task);
            setLoading(false);  // Ensure tasks are fetched
        });
    }, []);

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            // If search is empty, reset to show all tasks
            fetchHandler().then((data) => setTasks(data.task));
            setNoResults(false);
            return;
        }

        fetchHandler().then((data) => {
            const filteredTask = data.task.filter((task) => {
                const taskName = task.task_name ? task.task_name.toLowerCase() : "";
                const location = task.location ? task.location.toLowerCase() : "";
                const assignTo = task.assign_to ? task.assign_to.toLowerCase() : "";

                return (
                    taskName.includes(searchQuery.toLowerCase()) ||
                    location.includes(searchQuery.toLowerCase()) ||
                    assignTo.includes(searchQuery.toLowerCase())
                );
            });

            setTasks(filteredTask);
            setNoResults(filteredTask.length === 0);
        });
    };
    // Function to generate report
    const generateReport = () => {
        const doc = new jsPDF();

        // Add title with styles
        doc.setFontSize(18);
        doc.setFont("Helvetica", "bold");
        doc.text("Task Report", 14, 22);

        // Add a horizontal line with left margin
        const lineLeftMargin = 15;
        doc.setLineWidth(0.5);
        doc.setDrawColor(0, 51, 102);
        doc.line(lineLeftMargin, 40, 200, 40);

        // Add table
        autoTable(doc, {
            head: [["Task Name", "Assign To", "Location", "Duration", "Special Instructions", "Description"]],
            body: tasks.map((task) => [
                task.task_name,
                task.assign_to,
                task.location,
                task.duration,
                task.special_instruction,
                task.description,
            ]),
            startY: 45, // Start after the title and line
        });

        // Add footer with correct date
        const footerY = doc.autoTable.previous.finalY + 20;
        doc.setFontSize(10);
        doc.setFont("Helvetica", "normal");
        const formattedDate = new Date().toLocaleDateString();
        doc.text("Generated on: " + formattedDate, 14, footerY);

        // Save the PDF
        doc.save("task_report.pdf");
        alert("Report generated successfully!");
    };


    return (
        <div className='content1001'>
            <Dash />
            <div className='content1000'>
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full max-w-full px-3 mt-6 md:w-7/12 md:flex-none">
                        <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                            <div className="dt1000">
                                {/* Search Input */}
                                <div className="search-bar1000">
                                    <input
                                        type="text"
                                        className="search-input1000"
                                        placeholder="Search Task..."
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSearch();  // Trigger search on Enter key press
                                            }
                                        }}

                                    />
                                    <button className="search-btn"></button>
                                </div>
                                <div className="dt202">
                                    <button className="dt205" onClick={handleSearch}><ImSearch /></button>
                                    <button className="dt201" onClick={generateReport}><FaDownload /></button>
                                    <Link to="/TaskCreate">
                                        <button className="dt203"><IoMdAddCircle /></button>
                                    </Link>
                                </div>
                            </div>
                            <div ref={ComponentsRef}>
                                <div className="div1001 p-6 px-4 pb-0 mb-0 border-b-0 rounded-t-2xl">
                                    <h6 className="mb-0 dark:text-black">Task List</h6>
                                </div>
                                <div className="dt1001 flex-auto p-4 pt-6" >
                                    {tasks.map((task) => (
                                        <ul key={task._id} className="div1000 flex flex-col pl-0 mb-0 rounded-lg">
                                            <li className="box1000 relative flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50 dark:bg-slate-850">

                                                <div className="flex flex-col">
                                                    <h6 className="mb-1 text-sm leading-normal dark:text-black">{task.task_name}</h6>

                                                    <span className="mb-2 text-xs leading-tight dark:text-black/80">
                                                        Assign To:
                                                        <span className="font-semibold text-slate-700 dark:text-black sm:ml-2">{task.assign_to}</span>
                                                    </span>

                                                    {/* Dropdown for Assign To */}
                                                    <span className="mb-2 text-xs leading-tight dark:text-black/80">
                                                        Location: <span className="font-semibold text-slate-700 dark:text-black sm:ml-2">{task.location}</span>
                                                    </span>

                                                    <span className="mb-2 text-xs leading-tight dark:text-black/80">
                                                        Duration: <span className="font-semibold text-slate-700 dark:text-black sm:ml-2">{task.duration}</span>
                                                    </span>
                                                    <span className="span1000 mb-2 text-xs leading-tight dark:text-black/80">
                                                        Special Instructions: <span className="font-semibold text-slate-700 dark:text-black sm:ml-2">{task.special_instruction}</span>
                                                    </span>
                                                    <span className="mb-2 text-xs leading-tight dark:text-black/80">
                                                        Description: <span className="font-semibold text-slate-700 dark:text-black sm:ml-2">{task.description}</span>
                                                    </span>
                                                </div>

                                                <div className="div1005 ml-auto text-right">
                                                    <button className='btn1000' onClick={() => deleteTask(task._id)}><div className="icn1000" ><MdDelete /></div>Delete</button>
                                                    <Link to={`/TaskUpdate/${task._id}`}> <button className='btn1001'><div className='icn1001'><MdModeEdit /></div>Edit</button></Link>
                                                </div>
                                            </li>
                                        </ul>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskDisplay;
