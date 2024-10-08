import React, { useEffect, useState, useRef } from 'react';
import "../../Css/Volunteers/User-Task/UserTask.css"
import Nav from "../../../Components/Navbar/Navbar"
import Footer from "../../../Components/Footer/Footer"
import UT from "../../../Assets/Volunteers/Task/UT1.jpg"
import UT5 from "../../../Assets/Volunteers/Task/UT^.jpg"
import { Link } from "react-router-dom";
import axios from 'axios';

const URL = "http://localhost:3000/task/";

const fetchHandler = async () => {
    const data = await axios.get(URL).then((res) => res.data);
    console.log(data);
    return data;
};

function UserTask() {

    const [tasks, setTasks] = useState([]); // Changed from 'users' to 'tasks'
    const [setErrorMessage] = useState('');

    // Fetch tasks and volunteers from the server
    useEffect(() => {


        // Fetch tasks and set to state
        fetchHandler().then((data) => setTasks(data.task)); // Adjusted to 'data.task' to fit backend response

    }, []);


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


    return (
        <div>
            <Nav />

            <div>
                <div>
                    <div className='section100'>
                        <img className='im2000' src={UT5} alt='' />
                        <div className='s1100'>
                            <h1> Volunteer Events</h1>
                            <p>They might be handing out event or activity <br />
                                resources, explaining what to do,
                                helping <br />visitors with activities,e  helping<br /> people find their way  </p>
                            <button className='s1200'>
                                Register Now
                            </button>
                        </div>
                    </div>
                    <div className='section1001'>
                        <h1>ON Going Task</h1>
                        <div className='s1101'>
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


                                        </li>
                                    </ul>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div>

            </div>


        </div >
    )
}

export default UserTask