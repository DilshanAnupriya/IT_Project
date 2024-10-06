import React, { useEffect, useState } from 'react';
import Dash from "../../../Components/new_Dashboard/New_Dashboard";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function TaskUpdate() {



    const id = useParams().id; // Get the task ID from the URL
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [inputs, setInputs] = useState({  // Changed from 'input' to 'inputs'
        task_name: "",
        assign_to: "",
        location: "",
        duration: "",
        special_instruction: "",
        description: ""
    });

    const [volunteers, setVolunteers] = useState([]);  // To store volunteers data
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});

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

    // Fetch the existing task details
    useEffect(() => {
        const fetchTask = async () => {
            if (id) {  // Check if the id exists
                try {
                    const response = await axios.get(`http://localhost:3000/task/${id}`);
                    setInputs(response.data.task); // Populate form with task data

                } catch (error) {
                    setErrorMessage('Failed to fetch task. Please try again.');

                }
            } else {
                setErrorMessage('No task ID provided.');

            }
        };
        fetchTask();
    }, [id]);


    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,  // Now using 'prevInputs' to ensure the state doesn't get overwritten
            [name]: value
        }));
        validateField(name, value);
    };

    // Validate input fields
    const validateField = (name, value) => {
        let errorMessages = { ...errors };

        if (name === "task_name") {
            if (!/^[a-zA-Z]{3,20}$/.test(value)) {
                errorMessages[name] = "Name must be 3-20 characters long and cannot contain numbers or special characters.";
            } else {
                delete errorMessages[name];
            }
        }

        if (name === "duration" || name === "location") {
            if (/[*&^%$#@!()]/.test(value)) {
                errorMessages[name] = "Cannot contain special characters.";
            } else {
                delete errorMessages[name];
            }
        }

        setErrors(errorMessages);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (Object.keys(errors).length === 0) {
                await axios.put(`http://localhost:3000/task/update/${id}`, inputs);  // Ensure 'inputs' is passed
                setSuccessMessage('Task updated successfully!');
                setErrorMessage('');

                setTimeout(() => {
                    navigate('/TaskDisplay');
                }, 1500); // 1.5 seconds delay to show the success message
            } else {
                alert("Please fix the validation errors.");
            }
        } catch (error) {
            setErrorMessage('Failed to update Task details. Please try again.');
            setSuccessMessage('');
        }
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
                                <div className='input-field'>
                                    <label>Task Name</label>
                                    <input
                                        type='text'
                                        onChange={handleChange}
                                        placeholder='Enter Task Name'
                                        value={inputs.task_name}  // Ensure this uses 'inputs'
                                        name='task_name'
                                        required />
                                    {errors.task_name && <p className="error">{errors.task_name}</p>}
                                </div>

                                {/* Updated Assign To Dropdown */}
                                <div className='input-field'>
                                    <label>Assign To</label>
                                    <select
                                        name="assign_to"
                                        onChange={handleChange}
                                        value={inputs.assign_to}  // Ensure this uses 'inputs'
                                        required>
                                        <option value="">Select Volunteer</option>
                                        {volunteers.map((volunteer) => (
                                            <option key={volunteer._id} value={`${volunteer.first_name} ${volunteer.last_name}`}>
                                                {volunteer.first_name} {volunteer.last_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className='input-field'>
                                    <label>Location</label>
                                    <input
                                        type='text'
                                        onChange={handleChange}
                                        placeholder='Enter Location'
                                        name='location'
                                        value={inputs.location}  // Ensure this uses 'inputs'
                                        required />
                                    {errors.location && <p className="error">{errors.location}</p>}
                                </div>

                                <div className='input-field'>
                                    <label>Duration</label>
                                    <input
                                        type='text'
                                        onChange={handleChange}
                                        placeholder='Enter Duration'
                                        name='duration'
                                        value={inputs.duration}  // Ensure this uses 'inputs'
                                        required />
                                    {errors.duration && <p className="error">{errors.duration}</p>}
                                </div>

                                <div className='div1008'>
                                    <div className='input-field'>
                                        <label>Special Instructions</label>
                                        <textarea
                                            className='area1000'
                                            type='text'
                                            onChange={handleChange}
                                            placeholder='Enter Special Instructions'
                                            name='special_instruction'
                                            value={inputs.special_instruction}  // Ensure this uses 'inputs'
                                            required />
                                    </div>

                                    <div className='input-field'>
                                        <label>Description</label>
                                        <textarea
                                            className='area1001'
                                            type='text'
                                            onChange={handleChange}
                                            placeholder='Enter Description'
                                            name='description'
                                            value={inputs.description}  // Ensure this uses 'inputs'
                                            required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className='nextBtn1000'>Submit</button>
                    </div>
                </form>
            </div>
            <div className='last02'>
                <h1>end</h1>
            </div>
        </div>
    );
}

export default TaskUpdate;
