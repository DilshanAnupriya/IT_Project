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
        schedule_end_time: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchAvailability();
    }, []);

    const fetchAvailability = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/Availability/${id}`);
            setInputs(response.data.avl);
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

    const validateField = (name, value) => {
        let errorMsg = "";

        switch (name) {
            case "emp_name":
                if (!value) errorMsg = "Employee name is required";
                break;
            case "schedule_date":
                if (!value) errorMsg = "Schedule date is required";
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
            schedule_date: Date(input.schedule_date),
            schedule_start_time: String(input.schedule_start_time),
            schedule_end_time: String(input.schedule_end_time),
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
                            <input 
                                type="text" 
                                name="schedule_start_time" 
                                value={input.schedule_start_time} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.schedule_start_time && <p className="error33">{errors.schedule_start_time}</p>}
                        </div>
                        <div className="form-group33">
                            <label>Schedule End Time</label>
                            <input 
                                type="text" 
                                name="schedule_end_time" 
                                value={input.schedule_end_time} 
                                onChange={handleChange} 
                                required 
                            />
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