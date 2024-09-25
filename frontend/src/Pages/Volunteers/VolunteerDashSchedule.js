import { useEffect, useRef } from 'react';
import Dash from "../../Components/Dashboard/Dashboard";
import "../Css/Volunteers/VolunteerSchedule.css";
import ss from "../../Assets/ss.png"
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
function VolunteerDashSchedule() {

    const history = useNavigate();
    const [inputs, setTask] = useState({
        task_name: "",
        description: "",
        location: "",
        duration: "",
        special_instruction: "",
        assign_to: ""
    });

    const handleChange = (e) => {
        setTask((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(() => history('/volunteer_schedule'))
    }

    const sendRequest = async () => {
        await axios.post("http://localhost:3000/task/create", {
            task_name: String(inputs.task_name),
            description: String(inputs.description),
            location: String(inputs.location),
            duration: String(inputs.duration),
            special_instruction: String(inputs.special_instruction),
            assign_to: String(inputs.assign_to),
        }).then(res => res.data);
    }
    return (
        <div>
            <div className="Dash">
                <Dash />
            </div>
            <div className='view'>
                <Link to=""></Link><button>View Data</button><Link />
            </div>
            <div class="container100">
                <div class="form-container">
                    <h2>Add new task</h2>
                    <form action="#" onSubmit={handleSubmit}>
                        <div class="input-group">
                            <label for="name">Name</label>
                            <input type="text" onChange={handleChange} id="name" value={inputs.task_name} name='task_name' placeholder="Enter task name" />
                        </div>
                        <div class="input-group">
                            <label for="duration">Duration</label>
                            <input type="text" onChange={handleChange} id="duration" value={inputs.duration} name='duration' placeholder="Enter duration" />
                        </div>
                        <div class="input-group">
                            <label for="location">Location</label>
                            <input type="text" onChange={handleChange} id="location" value={inputs.location} name='location' placeholder="Enter location" />
                        </div>
                        <div class="input-group">
                            <label for="location">assign_to</label>
                            <input type="text" onChange={handleChange} id="location" value={inputs.assign_to} name='assign_to' placeholder="Enter location" />
                        </div>
                        <div class="input-group textarea">
                            <label for="instructions">Spacial Instructions</label>
                            <textarea id="instructions" onChange={handleChange} rows="3" value={inputs.special_instruction} name='special_instruction' placeholder="Enter instructions"></textarea>
                        </div>
                        <div class="input-group textarea">
                            <label for="description">Description</label>
                            <textarea onChange={handleChange} id="description" rows="5" value={inputs.description} name='description' placeholder="Enter description"></textarea>
                        </div>
                        <div class="submit-btn">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
                <div class="image-container">
                    <img src={ss} alt="Task Illustration" />
                </div>
            </div>
            <div className='data'>

            </div>
        </div>
    );
}

export default VolunteerDashSchedule;
