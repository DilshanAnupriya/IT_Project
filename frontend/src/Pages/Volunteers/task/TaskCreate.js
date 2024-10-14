import React, { useEffect, useState } from 'react';
import Dash from "../../../Components/new_Dashboard/New_Dashboard";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../Css/Volunteers/Task/TaskC.css";

function TaskCreate() {
    const history = useNavigate();
    const [input, setInputs] = useState({
        task_name: "",
        assign_to: "",  // Dropdown for volunteers
        location: "",
        duration: "",
        special_instruction: "",
        description: "",
    });

    const [errors, setErrors] = useState({});
    const [volunteers, setVolunteers] = useState([]);  // To store volunteers data

    // Fetch volunteers
    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/users/");
                setVolunteers(response.data.Volunteers);
            } catch (error) {
                console.error("Failed to fetch volunteers", error);
            }
        };
        fetchVolunteers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let errorMessages = { ...errors };

        if (name === "task_name") {
            if (!/^[a-zA-Z\s]{3,20}$/.test(value)) {
                errorMessages[name] = "Task name must be 3-20 characters long and contain only letters.";
                toast.error(errorMessages[name]);
            } else {
                delete errorMessages[name];
            }
        }

        if (name === "duration" || name === "location") {
            if (/[*&^%$#@!()]/.test(value)) {
                errorMessages[name] = `${name === 'duration' ? 'Duration' : 'Location'} cannot contain special characters.`;
                toast.error(errorMessages[name]);
            } else {
                delete errorMessages[name];
            }
        }

        setErrors(errorMessages);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            sendRequest().then(() => history('/TaskDisplay'));
        } else {
            toast.error("Please fix the validation errors.");
        }
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:3000/task/create", {
            task_name: String(input.task_name),
            assign_to: String(input.assign_to),
            location: String(input.location),
            duration: String(input.duration),
            special_instruction: String(input.special_instruction),
            description: String(input.description),
        }).then(res => res.data);
    };

    return (
        <div>
            <Dash />
            <div className='container1000'>
                <header>Task Registration</header>
                <form onSubmit={handleSubmit}>
                    <div className='form first30'>
                        <div className='details personal'>
                            <span className='title'>Task Details</span>
                            <div className='fields'>
                                <div className='input-field100'>
                                    <label>Task Name</label>
                                    <input
                                        type='text'
                                        onChange={handleChange}
                                        placeholder='Enter Task Name'
                                        value={input.task_name}
                                        name='task_name'
                                        required />
                                </div>

                                <div className='input-field100'>
                                    <label>Assign To</label>
                                    <select
                                        name="assign_to"
                                        onChange={handleChange}
                                        value={input.assign_to}
                                        required>
                                        <option value="">Select Volunteer</option>
                                        {volunteers.map((volunteer) => (
                                            <option key={volunteer._id} value={`${volunteer.first_name} ${volunteer.last_name}`}>
                                                {volunteer.first_name} {volunteer.last_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className='input-field100'>
                                    <label>Location</label>
                                    <input
                                        type='text'
                                        onChange={handleChange}
                                        placeholder='Enter Location'
                                        name='location'
                                        value={input.location}
                                        required />
                                </div>

                                <div className='input-field100'>
                                    <label>Duration</label>
                                    <input
                                        type='text'
                                        onChange={handleChange}
                                        placeholder='Enter Duration'
                                        name='duration'
                                        value={input.duration}
                                        required />
                                </div>

                                <div className='div1008'>
                                    <div className='input-field100'>
                                        <label>Special Instructions</label>
                                        <textarea
                                            className='area1000'
                                            onChange={handleChange}
                                            placeholder='Enter Special Instructions'
                                            name='special_instruction'
                                            value={input.special_instruction}
                                            required />
                                    </div>

                                    <div className='input-field100'>
                                        <label>Description</label>
                                        <textarea
                                            className='area1001'
                                            onChange={handleChange}
                                            placeholder='Enter Description'
                                            name='description'
                                            value={input.description}
                                            required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className='nextBtn1000'>Submit</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default TaskCreate;
