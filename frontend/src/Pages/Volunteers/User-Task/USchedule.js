import React, { useEffect, useState, useRef } from 'react';
import Nav from "../../../Components/Navbar/Navbar"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../User-Task/USchedule.css"

function USchedule() {
    const history = useNavigate();
    const [input, setInputs] = useState({
        event_name: "",
        S_time: "",  // Dropdown for volunteers
        E_time: "",
        date: "",

    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        validateField(name, value);
    };

    // Validation logic
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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            sendRequest().then(() => history('/'));
        } else {
            alert("Please fix the validation errors.");
        }
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:3000/schedule/add", {
            event_name: String(input.event_name),
            S_time: String(input.S_time),
            E_time: String(input.E_time),
            date: new Date(input.date)
        }).then(res => res.data);
    };
    return (
        <div>
            <Nav />
            <div>
                <div className='title5000'>
                    <h1>Make a Schedule</h1>
                </div>
                <div className='container2100'>

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
                                            value={input.event_name}
                                            name='event_name'
                                            required />

                                    </div>
                                    <div className='input-field'>
                                        <label>Start Time</label>
                                        <input
                                            type='text'
                                            onChange={handleChange}
                                            placeholder='Enter Start Time'
                                            name='S_time'
                                            value={input.S_time}
                                            required />

                                    </div>
                                    <div className='input-field'>
                                        <label>End Time</label>
                                        <input
                                            type='text'
                                            onChange={handleChange}
                                            placeholder='Enter End Time'
                                            name='E_time'
                                            value={input.E_time}
                                            required />

                                    </div>
                                    <div className='input-field'>
                                        <label>Date</label>
                                        <input
                                            type='Date'
                                            onChange={handleChange}
                                            placeholder='Enter End Time'
                                            name='date'
                                            value={input.date}
                                            required />

                                    </div>
                                </div>
                            </div>
                            <button className='nextBtn2110'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default USchedule