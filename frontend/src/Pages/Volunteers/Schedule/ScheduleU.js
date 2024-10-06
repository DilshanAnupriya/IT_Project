import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Dash from "../../../Components/new_Dashboard/New_Dashboard";
import "../../Css/Volunteers/Schedule/ScheduleU.css";

function ScheduleU() {
    const id = useParams().id; // Get the task ID from the URL
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [inputs, setInputs] = useState({
        event_name: "",
        S_time: "",
        E_time: "",
    });
    const [eventDate, setEventDate] = useState(''); // New state for storing event date
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});

    // Fetch the existing task details
    useEffect(() => {
        const fetchSchedule = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:3000/schedule/${id}`);
                    setInputs(response.data.schedule);
                    setEventDate(new Date(response.data.schedule.date).toDateString()); // Set the event date in state
                } catch (error) {
                    setErrorMessage('Failed to fetch task. Please try again.');
                }
            } else {
                setErrorMessage('No task ID provided.');
            }
        };
        fetchSchedule();
    }, [id]);

    // Handle form field changes
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
        if (name === "event_name") {
            if (!/^[a-zA-Z\s]{3,20}$/.test(value)) {
                errorMessages[name] = "Event name must be 3-20 characters long and contain only letters.";
            } else {
                delete errorMessages[name];
            }
        }
        setErrors(errorMessages);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            try {
                await axios.put(`http://localhost:3000/schedule/update/${id}`, inputs);
                setSuccessMessage('Schedule updated successfully!');
                setErrorMessage('');
                setTimeout(() => navigate('/ScheduleDisplay'), 1500);
            } catch (error) {
                setErrorMessage('Failed to update Task details. Please try again.');
            }
        } else {
            alert("Please fix the validation errors.");
        }
    };

    return (
        <div>
            <Dash />
            <div className='container2000'>
                <header>
                    <h2>Updating Event on: {eventDate}</h2> {/* Display the event date in the header */}
                </header>
                <form onSubmit={handleSubmit}>
                    <div className='form first30'>
                        <div className='details personal'>
                            <span className='title'>Schedule details</span>
                            <div className='fields'>
                                <div className='input-field'>
                                    <label>Event Name</label>
                                    <input
                                        type='text'
                                        onChange={handleChange}
                                        placeholder='Enter Task Name'
                                        value={inputs.event_name}
                                        name='event_name'
                                        required />
                                    {errors.event_name && <p className="error">{errors.event_name}</p>}
                                </div>
                                <div className='input-field'>
                                    <label>Start Time</label>
                                    <input
                                        type='text'
                                        onChange={handleChange}
                                        placeholder='Enter Start Time'
                                        name='S_time'
                                        value={inputs.S_time}
                                        required />
                                    {errors.S_time && <p className="error">{errors.S_time}</p>}
                                </div>
                                <div className='input-field'>
                                    <label>End Time</label>
                                    <input
                                        type='text'
                                        onChange={handleChange}
                                        placeholder='Enter End Time'
                                        name='E_time'
                                        value={inputs.E_time}
                                        required />
                                    {errors.E_time && <p className="error">{errors.E_time}</p>}
                                </div>
                            </div>
                        </div>
                        <button className='nextBtn2100'>Submit</button>
                    </div>
                </form>
            </div>
            <div className='last02'>
                <h1>end</h1>
            </div>
        </div>
    );
}

export default ScheduleU;
