import React, { useState } from 'react';
import "../../Pages/Css/Medicalcss/TaskForm.css";
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
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        validateInput(e.target.name, e.target.value);
    };

    const validateInput = (name, value) => {
        let error = "";
        switch (name) {
            case "Elder_pname":
                if (!value) {
                    error = "please enter a elder name";
                }
                break;
            case "Treatments":
                if (!value) {
                    error = "Please input a treatment";
                }
                break;
            case "Taskdate":
                if (!value) {
                    error = "Please select a date";
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
            sendRequest().then(() => history('/medtask'));
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
            history('/mainhome'); // Navigate to /mainhome regardless of the outcome
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
