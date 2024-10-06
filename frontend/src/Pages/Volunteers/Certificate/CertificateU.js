import React, { useState, useCallback, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import template from "../../../Assets/Volunteers/template/template.png";
import "../../Css/Volunteers/Certificate/CertificateC.css";
import Dash from "../../../Components/new_Dashboard/New_Dashboard";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";




function CertificateU() {


    const id = useParams().id; // Get the task ID from the URL
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [inputs, setInputs] = useState({  // Changed from 'input' to 'inputs'
        v_name: "",
        title: "",
        time_period: "",
        issue_date: "",

    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});


    // Fetch the existing task details
    useEffect(() => {
        const fetchCertificate = async () => {
            if (id) {  // Check if the id exists
                try {
                    const response = await axios.get(`http://localhost:3000/certificate/${id}`);
                    setInputs(response.data.certificate); // Populate form with task data

                } catch (error) {
                    setErrorMessage('Failed to fetch . Please try again.');

                }
            } else {
                setErrorMessage('No task ID provided.');

            }
        };
        fetchCertificate();
    }, [id]);

    const validateField = (name, value) => {
        let errorMessages = { ...errors };
        if (name === "v_name") {
            if (!/^[a-zA-Z\s]{3,20}$/.test(value)) {
                errorMessages[name] = "Name must be 3-20 characters long and cannot contain numbers or special characters.";
            } else {
                delete errorMessages[name];
            }
        }
        // Validation for title
        if (name === "title") {
            if (!/^[a-zA-Z\s]{3,20}$/.test(value)) {
                errorMessages[name] = "Title must be 3-20 characters long and cannot include special characters.";
            } else {
                delete errorMessages[name];
            }
        }
        // Validation for issue_date
        if (name === "issue_date") {
            const selectedDate = new Date(value).setHours(0, 0, 0, 0);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Resetting hours, minutes, seconds, and milliseconds to ensure it's at the start of the day

            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(today.getMonth() - 1); // Set to one month ago
            oneMonthAgo.setHours(0, 0, 0, 0); // Reset to the start of the day

            if (selectedDate > today) {
                errorMessages[name] = "Future dates are not allowed.";
            } else if (selectedDate < oneMonthAgo) {
                errorMessages[name] = "You can only select dates from the last month.";
            } else {
                delete errorMessages[name];
            }
        }


        setErrors(errorMessages);
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,  // Now using 'prevInputs' to ensure the state doesn't get overwritten
            [name]: value
        }));
        validateField(name, value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (Object.keys(errors).length === 0) {
                await axios.put(`http://localhost:3000/certificate/update/${id}`, inputs);  // Ensure 'inputs' is passed
                setSuccessMessage('certificate updated successfully!');
                setErrorMessage('');

                setTimeout(() => {
                    navigate('/CertificateDisplay');
                }, 1500); // 1.5 seconds delay to show the success message
            } else {
                alert("Please fix the validation errors.");
            }
        } catch (error) {
            setErrorMessage('Failed to update  details. Please try again.');
            setSuccessMessage('');
        }
    };
    const ref = useRef(null);
    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return;
        }
        toPng(ref.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'Certificate.png';
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    }, [ref]);
    const [volunteers, setVolunteers] = useState([]); // State to hold the list of volunteers
    // Fetch the list of volunteers
    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/users/");
                setVolunteers(response.data.Volunteers);
            } catch (error) {
                console.error("Failed to fetch volunteers", error);
            }
        };
        fetchVolunteers();
    }, []);

    return (
        <div>
            <Dash />
            <div className='full2200'>
                <div className='in2200'>
                    <h1>Certificate Details</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Name</label>
                        <select
                            name='v_name'
                            value={inputs.v_name}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Volunteer</option>
                            {volunteers.map((volunteer) => (
                                <option key={volunteer._id} value={`${volunteer.first_name} ${volunteer.last_name}`}>
                                    {volunteer.first_name} {volunteer.last_name}
                                </option>
                            ))}
                        </select>
                        {errors.v_name && <p className="error">{errors.v_name}</p>}
                        <br />
                        <div className='sep2200'>
                            <label>Title</label>
                            <input
                                type='text'
                                name='title'
                                placeholder='Enter Title'
                                value={inputs.title}
                                onChange={handleChange}
                                required
                            />
                            {errors.title && <p className="error">{errors.title}</p>}
                            <label>Time Period</label>
                            <input
                                type='text'
                                name='time_period'
                                placeholder='Enter Time Period'
                                value={inputs.time_period}
                                onChange={handleChange}
                                required
                            />

                            <label>Issue Date</label>
                            <input
                                type='Date'
                                name='issue_date'
                                placeholder='Enter Issue Date'
                                value={inputs.issue_date ? inputs.issue_date.substring(0, 10) : ''}
                                onChange={handleChange}
                                required
                            />
                            {errors.issue_date && <p className="error">{errors.issue_date}</p>}
                        </div>
                        <h1 className='title2200'>Certificate Preview</h1>
                        <div className='cont2200' ref={ref}>
                            <img src={template} alt='' />
                            <div className='content2200'>
                                <h1>{inputs.v_name}</h1>
                                <p>{inputs.time_period}</p>
                                <h2>{inputs.issue_date ? inputs.issue_date.substring(0, 10) : ''}</h2>
                            </div>
                        </div>

                        <button type='button' className='btn2200' onClick={onButtonClick}>Download</button>
                        <button type='submit' className='btn2201'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CertificateU