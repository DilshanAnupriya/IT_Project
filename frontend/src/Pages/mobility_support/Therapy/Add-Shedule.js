import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    validateElderId,
    validatePhoneNumber,
    validateNIC,
    validateDate,
    validateTime
} from './../Validation/SheduleValidation';

export default function Add_Shedule() {
    const [elderId, setElderId] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [email, setEmail] = useState("");
    const [NIC, setNIC] = useState("");
    const [current_status, setCurrent_status] = useState("");
    const [current_physical_condition, setCurrent_physical_condition] = useState("");
    const [previous_therapy, setPrevious_therapy] = useState("");
    const [therapy_goal, setTherapy_goal] = useState("");
    const [date, setDate] = useState("");
    const [preffered_time, setPreffered_time] = useState("");
    const [frequency, setFrequency] = useState("");
    const [location, setLocation] = useState("");

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        newErrors.elderId = validateElderId(elderId);
        newErrors.phone_number = validatePhoneNumber(phone_number);
        newErrors.NIC = validateNIC(NIC);
        newErrors.date = validateDate(date);
        newErrors.preffered_time = validateTime(preffered_time);

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === null);
    };

    const sendDate = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const newShedule = {
            elderId,
            name,
            age,
            phone_number,
            email,
            NIC,
            current_status,
            current_physical_condition,
            previous_therapy,
            therapy_goal,
            date,
            preffered_time,
            frequency,
            location,
        };

        console.log("Sending data:", newShedule); // Log data being sent

        axios.post("http://localhost:3000/shedule/add", newShedule)
            .then(() => {
                alert("Schedule Added");
                navigate('/alls'); // Navigate to another page after successful submission
            })
            .catch((err) => {
                console.error("Error details:", err.response?.data || err.message); // Log error details
                alert("Error adding schedule: " + (err.response?.data?.message || err.message));
            });
    };

    return (
        <div className="container">
            <style>{`
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                }
                .form-group {
                    margin-bottom: 15px;
                }
                h2 {
                    text-align: center;
                    color: #333;
                }
                .btn-primary {
                    background-color: #007bff;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .btn-primary:hover {
                    background-color: #0056b3;
                }
                input.form-control {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                div.error {
                    color: red;
                }
            `}</style>
            <form onSubmit={sendDate}>
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <h2>Add Schedule</h2>
                </div>
                <div className="form-group">
                    <label htmlFor="elderId">Elder Id</label>
                    <input
                        type="text"
                        className="form-control"
                        id="elderId"
                        placeholder="Enter Elder Id"
                        value={elderId}
                        onChange={(e) => setElderId(e.target.value)}
                    />
                    {errors.elderId && <div className="error">{errors.elderId}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        id="age"
                        placeholder="Enter Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone_number">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone_number"
                        placeholder="Enter Phone Number"
                        value={phone_number}
                        onChange={(e) => setPhone_number(e.target.value)}
                    />
                    {errors.phone_number && <div className="error">{errors.phone_number}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="NIC">NIC</label>
                    <input
                        type="text"
                        className="form-control"
                        id="NIC"
                        placeholder="Enter NIC"
                        value={NIC}
                        onChange={(e) => setNIC(e.target.value)}
                    />
                    {errors.NIC && <div className="error">{errors.NIC}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="current_status">Current Status</label>
                    <input
                        type="text"
                        className="form-control"
                        id="current_status"
                        placeholder="Enter Current Status"
                        value={current_status}
                        onChange={(e) => setCurrent_status(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="current_physical_condition">Current Physical Condition</label>
                    <input
                        type="text"
                        className="form-control"
                        id="current_physical_condition"
                        placeholder="Enter Current Physical Condition"
                        value={current_physical_condition}
                        onChange={(e) => setCurrent_physical_condition(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="previous_therapy">Previous Therapy</label>
                    <input
                        type="text"
                        className="form-control"
                        id="previous_therapy"
                        placeholder="Enter Previous Therapy"
                        value={previous_therapy}
                        onChange={(e) => setPrevious_therapy(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="therapy_goal">Therapy Goal</label>
                    <input
                        type="text"
                        className="form-control"
                        id="therapy_goal"
                        placeholder="Enter Therapy Goal"
                        value={therapy_goal}
                        onChange={(e) => setTherapy_goal(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    {errors.date && <div className="error">{errors.date}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="preffered_time">Preferred Time</label>
                    <input
                        type="time"
                        className="form-control"
                        id="preffered_time"
                        value={preffered_time}
                        onChange={(e) => setPreffered_time(e.target.value)}
                    />
                    {errors.preffered_time && <div className="error">{errors.preffered_time}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="frequency">Frequency</label>
                    <input
                        type="text"
                        className="form-control"
                        id="frequency"
                        placeholder="Enter Frequency"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        placeholder="Enter Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn-primary">Add Schedule</button>
            </form>
        </div>
    );
}
