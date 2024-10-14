import React, { useEffect, useState } from 'react';
import Dash from "../../../Components/new_Dashboard/New_Dashboard";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskUpdate() {
    const id = useParams().id;
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        task_name: "",
        assign_to: "",
        location: "",
        duration: "",
        special_instruction: "",
        description: ""
    });

    const [volunteers, setVolunteers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});

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

    useEffect(() => {
        const fetchTask = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:3000/task/${id}`);
                    setInputs(response.data.task);
                } catch (error) {
                    setErrorMessage('Failed to fetch task. Please try again.');
                }
            } else {
                setErrorMessage('No task ID provided.');
            }
        };
        fetchTask();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
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
                errorMessages[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} cannot contain special characters.`;
                toast.error(errorMessages[name]);
            } else {
                delete errorMessages[name];
            }
        }

        setErrors(errorMessages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            try {
                await axios.put(`http://localhost:3000/task/update/${id}`, inputs);
                setSuccessMessage('Task updated successfully!');
                toast.success('Task updated successfully!');

                setTimeout(() => {
                    navigate('/TaskDisplay');
                }, 1500);
            } catch (error) {
                setErrorMessage('Failed to update Task details. Please try again.');
                toast.error('Failed to update Task details. Please try again.');
            }
        } else {
            toast.error("Please fix the validation errors.");
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
                                <div className='input-field100'>
                                    <label>Task Name</label>
                                    <input
                                        type='text'
                                        onChange={handleChange}
                                        placeholder='Enter Task Name'
                                        value={inputs.task_name}
                                        name='task_name'
                                        required />
                                </div>

                                <div className='input-field100'>
                                    <label>Assign To</label>
                                    <select
                                        name="assign_to"
                                        onChange={handleChange}
                                        value={inputs.assign_to}
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
                                        value={inputs.location}
                                        required />
                                </div>

                                <div className='input-field100'>
                                    <label>Duration</label>
                                    <input
                                        type='text'
                                        onChange={handleChange}
                                        placeholder='Enter Duration'
                                        name='duration'
                                        value={inputs.duration}
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
                                            value={inputs.special_instruction}
                                            required />
                                    </div>

                                    <div className='input-field100'>
                                        <label>Description</label>
                                        <textarea
                                            className='area1001'
                                            onChange={handleChange}
                                            placeholder='Enter Description'
                                            name='description'
                                            value={inputs.description}
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

export default TaskUpdate;
