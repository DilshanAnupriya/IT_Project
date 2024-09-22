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
        Status: "Done", // No default value
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        sendRequest().then(() => history('/medtask'));
    }

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
            <div className='container'>
                <div className = "header-box">
                <h2>Task Form</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='fields'>
                        <div className='input-field'>
                            <label>Elder Name</label>
                            <input
                                type='text'
                                onChange={handleChange}
                                placeholder='Enter Elder Name'
                                name='Elder_pname'
                                value={input.Elder_pname}
                                required
                            />
                        </div>

                        <div className='input-field'>
                            <label>Date for Treatment</label>
                            <input
                                type='date'
                                onChange={handleChange}
                                placeholder='Enter Treatment Date'
                                name='Taskdate'
                                value={input.Taskdate}
                                required
                            />
                        </div>

                        <div className='input-field'>
                            <label>Treatment</label>
                            <input
                                type='text'
                                onChange={handleChange}
                                placeholder='Enter Treatment'
                                name='Treatments'
                                value={input.Treatments}
                                required
                            />
                        </div>

                        <div className='input-field'>
                            <label>Status</label>
                            <select
                                name="Status"
                                onChange={handleChange}
                                value={input.Status}
                                required
                            >
                                <option value="" disabled>Select Status</option> {/* No default value */}
                                <option value="Done">Done</option>
                                <option value="Incomplete">Incomplete</option>
                                <option value="Immediate">Immediate</option>
                            </select>
                        </div>
                    </div>

                    <button className='subBtn' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;