import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function EmpAvailabilityUpdate() {
    const { id } = useParams();
    const history = useNavigate();
    const [input, setInputs] = useState({
        emp_name: "",
        schedule_date: "",
        schedule_start_time: "",
        schedule_start_period: "AM",
        schedule_end_time: "",
        schedule_end_period: "AM",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchAvailability();
    }, []);

    const fetchAvailability = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/Availability/${id}`);
            const data = response.data.avl;
            const [start_time, start_period] = data.schedule_start_time.split(' ');
            const [end_time, end_period] = data.schedule_end_time.split(' ');
            setInputs({
                emp_name: data.emp_name,
                schedule_date: new Date(data.schedule_date).toISOString().split('T')[0],
                schedule_start_time: start_time,
                schedule_start_period: start_period,
                schedule_end_time: end_time,
                schedule_end_period: end_period,
            });
        } catch (error) {
            console.error('Error fetching availability:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        validateField(name, value);
    };

    const handlePeriodChange = (name, period) => {
        setInputs((prevState) => ({
            ...prevState,
            [name]: period,
        }));
    };

    const validateField = (name, value) => {
        let errorMsg = "";

        switch (name) {
            case "emp_name":
                if (!value) errorMsg = "Employee name is required";
                break;
            case "schedule_date":
                if (!value) {
                    errorMsg = "Schedule date is required";
                } else if (new Date(value) < new Date().setHours(0, 0, 0, 0)) {
                    errorMsg = "Schedule date cannot be in the past";
                }
                break;
            case "schedule_start_time":
                if (!value) errorMsg = "Schedule start time is required";
                break;
            case "schedule_end_time":
                if (!value) errorMsg = "Schedule end time is required";
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMsg,
        }));
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!input.emp_name) {
            valid = false;
            newErrors.emp_name = "Employee name is required";
        }
        if (!input.schedule_date) {
            valid = false;
            newErrors.schedule_date = "Schedule date is required";
        } else if (new Date(input.schedule_date) < new Date().setHours(0, 0, 0, 0)) {
            valid = false;
            newErrors.schedule_date = "Schedule date cannot be in the past";
        }
        if (!input.schedule_start_time) {
            valid = false;
            newErrors.schedule_start_time = "Schedule start time is required";
        }
        if (!input.schedule_end_time) {
            valid = false;
            newErrors.schedule_end_time = "Schedule end time is required";
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            sendRequest().then(() => history('/availability'));
        }
    };

    const sendRequest = async () => {
        await axios.put(`http://localhost:3000/Availability/update/${id}`, {
            emp_name: String(input.emp_name),
            schedule_date: new Date(input.schedule_date).toISOString(),
            schedule_start_time: `${input.schedule_start_time} ${input.schedule_start_period}`,
            schedule_end_time: `${input.schedule_end_time} ${input.schedule_end_period}`,
        }).then(res => res.data);
    };

    const onClose = () => {
        history("/availability");
    };

    return (
        <div className="modal-background33">
            <div className="modal-container33">
                <form onSubmit={handleSubmit}>
                    <h2>Update Employee Schedule</h2>
                    <div className="grid-container">
                        <div className="form-group33">
                            <label>Employee Name</label>
                            <input 
                                type="text" 
                                name="emp_name" 
                                value={input.emp_name} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.emp_name && <p className="error33">{errors.emp_name}</p>}
                        </div>
                        <div className="form-group33">
                            <label>Schedule Date</label>
                            <input 
                                type="date" 
                                name="schedule_date" 
                                value={input.schedule_date} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.schedule_date && <p className="error33">{errors.schedule_date}</p>}
                        </div>
                        <div className="form-group33">
                            <label>Schedule Start Time</label>
                            <div className="time-input-container">
                                <input 
                                    type="time" 
                                    name="schedule_start_time" 
                                    value={input.schedule_start_time} 
                                    onChange={handleChange} 
                                    required 
                                />
                                <select 
                                    name="schedule_start_period" 
                                    value={input.schedule_start_period} 
                                    onChange={(e) => handlePeriodChange('schedule_start_period', e.target.value)}
                                    required
                                >
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                            </div>
                            {errors.schedule_start_time && <p className="error33">{errors.schedule_start_time}</p>}
                        </div>
                        <div className="form-group33">
                            <label>Schedule End Time</label>
                            <div className="time-input-container">
                                <input 
                                    type="time" 
                                    name="schedule_end_time" 
                                    value={input.schedule_end_time} 
                                    onChange={handleChange} 
                                    required 
                                />
                                <select 
                                    name="schedule_end_period" 
                                    value={input.schedule_end_period} 
                                    onChange={(e) => handlePeriodChange('schedule_end_period', e.target.value)}
                                    required
                                >
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                            </div>
                            {errors.schedule_end_time && <p className="error33">{errors.schedule_end_time}</p>}
                        </div>
                    </div>
                    <button type="submit" className="submit-btn33">Update</button>
                </form>
                <button className="close-btn33" onClick={onClose}>X</button>
            </div>
        </div>
    );
}

export default EmpAvailabilityUpdate;