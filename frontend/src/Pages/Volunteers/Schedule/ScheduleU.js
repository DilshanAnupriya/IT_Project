import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dash from "../../../Components/new_Dashboard/New_Dashboard";
import "../../Css/Volunteers/Schedule/ScheduleU.css";

function ScheduleU() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        event_name: "",
        S_time: "",
        E_time: "",
    });
    const [eventDate, setEventDate] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchSchedule = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:3000/schedule/${id}`);
                    setInputs(response.data.schedule);
                    setEventDate(new Date(response.data.schedule.date).toDateString());
                } catch (error) {
                    toast.error('Failed to fetch task. Please try again.');
                }
            } else {
                toast.error('No task ID provided.');
            }
        };
        fetchSchedule();
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
        if (name === "event_name") {
            if (!/^[a-zA-Z\s]{3,20}$/.test(value)) {
                errorMessages[name] = "Event name must be 3-20 characters long and contain only letters.";
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
                await axios.put(`http://localhost:3000/schedule/update/${id}`, inputs);
                toast.success('Schedule updated successfully!');
                setTimeout(() => navigate('/ScheduleDisplay'), 1500);
            } catch (error) {
                toast.error('Failed to update Task details. Please try again.');
            }
        } else {
            toast.error("Please fix the validation errors.");
        }
    };

    return (
        <div>
            <Dash />
            <ToastContainer />
            <div className='container2000'>
                <header>
                    <h2>Updating Event on: {eventDate}</h2>
                </header>
                <form onSubmit={handleSubmit}>
                    <div className='form first30'>
                        <div className='details personal'>
                            <span className='title'>Schedule details</span>
                            <div className='fields'>
                                <div className='input-field100'>
                                    <label>Event Name</label>
                                    <input
                                        type='text'
                                        onChange={handleChange}
                                        placeholder='Enter Task Name'
                                        value={inputs.event_name}
                                        name='event_name'
                                        required />
                                </div>
                                <div className='input-field100'>
                                    <label>Start Time</label>
                                    <input
                                        type='text'
                                        onChange={handleChange}
                                        placeholder='Enter Start Time'
                                        name='S_time'
                                        value={inputs.S_time}
                                        required />
                                </div>
                                <div className='input-field100'>
                                    <label>End Time</label>
                                    <input
                                        type='text'
                                        onChange={handleChange}
                                        placeholder='Enter End Time'
                                        name='E_time'
                                        value={inputs.E_time}
                                        required />
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
