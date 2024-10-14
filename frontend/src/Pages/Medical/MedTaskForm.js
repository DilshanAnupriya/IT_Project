import React, { useState } from 'react';
import "../../Pages/Css/Medical/TaskForm.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function TaskForm() {
    const history = useNavigate();
    const [input, setInputs] = useState({
        Elder_pname: "",
        Taskdate: "",
        Treatments: "",
        Status: "",
    });

    const [errors, setErrors] = useState({
        Elder_pname: "",
        Taskdate: "",
        Treatments: "",
        Status: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Prevent numbers in Elder_pname
        if (name === "Elder_pname" && /\d/.test(value)) {
            return;
        }

        // Prevent past dates in Taskdate
        if (name === "Taskdate" && new Date(value) < new Date().setHours(0, 0, 0, 0)) {
            setErrors((prevState) => ({
                ...prevState,
                [name]: "You can't add a past date for tasks",
            }));
            return;
        }

        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        validateInput(name, value);
    };

    const validateInput = (name, value) => {
        let error = "";
        switch (name) {
            case "Elder_pname":
                if (!value) {
                    error = "Please enter an elder name";
                } else if (/\d/.test(value)) {
                    error = "Elder name should not contain numbers";
                }
                break;
            case "Treatments":
                if (!value) {
                    error = "Please input a treatment";
                } else if (value.length > 100) {
                    error = "Treatment should not exceed 100 characters";
                }
                break;
            case "Taskdate":
                if (!value) {
                    error = "Please select a date";
                } else if (new Date(value) < new Date().setHours(0, 0, 0, 0)) {
                    error = "You can't add a past date for tasks";
                }
                break;
            case "Status":
                if (!value) {
                    error = "Please select a status";
                }
                break;
            default:
                break;
        }
        setErrors((prevState) => ({
            ...prevState,
            [name]: error,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform a final validation check before submission
        const isValid = Object.keys(input).every((key) => {
            validateInput(key, input[key]);
            return !errors[key];
        });

        if (isValid) {
            sendRequest().then(() => history('/medDash'));
        }
    };

    const sendRequest = async () => {
        try {
            const response = await axios.post("http://localhost:3000/medtask/add", {
                Elder_pname: String(input.Elder_pname),
                Taskdate: new Date(input.Taskdate),
                Treatments: String(input.Treatments),
                Status: String(input.Status),
            });
            console.log(response.data); // Check the response data
        } catch (error) {
            console.error(error); // Catch any errors
        } finally {
            history('/medDash'); // Navigate to /mainhome regardless of the outcome
        }
    };

    return (
        <div className='all'>
            <div className='container200'>
                <div className="header-box200">
                    <h2>Task Form</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='fields200'>
                        <div className='input-field200'>
                            <label>Elder Name</label>
                            <input
                                type='text'
                                onChange={handleChange}
                                placeholder='Enter Elder Name'
                                name='Elder_pname'
                                value={input.Elder_pname}
                                required
                            />
                            {errors.Elder_pname && <span className="error">{errors.Elder_pname}</span>}
                        </div>

                        <div className='input-field200'>
                            <label>Date for Treatment</label>
                            <input
                                type='date'
                                onChange={handleChange}
                                placeholder='Enter Treatment Date'
                                name='Taskdate'
                                value={input.Taskdate}
                                required
                            />
                            {errors.Taskdate && <span className="error">{errors.Taskdate}</span>}
                        </div>

                        <div className='input-field200'>
                            <label>Treatment</label>
                            <input
                                type='text'
                                onChange={handleChange}
                                placeholder='Enter Treatment'
                                name='Treatments'
                                value={input.Treatments}
                                required
                            />
                            <span>{input.Treatments.length}/100</span>
                            {errors.Treatments && <span className="error">{errors.Treatments}</span>}
                        </div>

                        <div className='input-field200'>
                            <label>Status</label>
                            <select
                                name="Status"
                                onChange={handleChange}
                                value={input.Status}
                                required
                            >
                                <option value="" disabled>Select Status</option>
                                <option value="Done">Done</option>
                                <option value="Incomplete">Incomplete</option>
                                <option value="Immediate">Immediate</option>
                            </select>
                            {errors.Status && <span className="error">{errors.Status}</span>}
                        </div>
                    </div>

                    <button className='subBtn200' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;