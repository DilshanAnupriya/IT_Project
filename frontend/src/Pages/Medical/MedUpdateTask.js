import React, { useEffect, useRef, useState } from 'react';
import Footer from "../../Components/Footer/Footer"
import Nav from "../../Components/Navbar/Navbar"
import "../Css/Medical/TaskForm.css"
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function MedUpdate() {

    //update part

    const { id } = useParams(); // Get the care plan ID from the URL
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [input, setInputs] = useState({
        Elder_pname: "",
        Taskdate: "",
        Treatments: "",
        Status: "",

    });

const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch the existing data
    useEffect(() => {
        const fetchCareplan = async () => {
          try {
            console.log(`Fetching data for ID: ${id}`);
            const response = await axios.get(`http://localhost:3000/medtask/${id}`);
            console.log("Received response:", response.data);
            setInputs(response.data.mtask);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching data:", error);
            setErrorMessage('Failed to fetchData. Please try again.');
            setLoading(false);
          }
        };
        fetchCareplan();
      }, [id]);
    // Handle form field changes
    const handleChange = (e) => {
        setInputs({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/medtask/update/${id}`, input);
            setSuccessMessage('Data updated successfully!');
            setErrorMessage('');

            // Navigate back to the View Care Plans page after a short delay
            setTimeout(() => {
                navigate('/medDash');
            }, 1500); // 1.5 seconds delay to show the success message
        } catch (error) {
            setErrorMessage('Failed to update care plan. Please try again.');
            setSuccessMessage('');
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
                        </div>

                        <div className='input-field200'>

                        <label>Date for Treatment</label>
    <input
        type='date'
        onChange={handleChange}
        placeholder='Enter Treatment Date'
        name='Taskdate'
        value={input.Taskdate}
        min={new Date().toISOString().split("T")[0]} // Set the minimum date to today
        required
    />
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
                        </div>
                    </div>

                    <button className='subBtn200' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default MedUpdate