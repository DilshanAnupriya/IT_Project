import React, { useState, useCallback, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import template from "../../../Assets/Volunteers/template/template.png";
import "../../Css/Volunteers/Certificate/CertificateC.css";
import Dash from "../../../Components/new_Dashboard/New_Dashboard";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CertificateC() {
    const ref = useRef(null);
    const navigate = useNavigate();
    const [volunteers, setVolunteers] = useState([]); // State to hold the list of volunteers

    // State variables for form fields
    const [input, setInputs] = useState({
        v_name: "",        // Updated for dropdown selection
        title: "",
        time_period: "",
        issue_date: "",
    });

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

    // Update the handleChange function
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        validateField(name, value);
    };

    const validateField = (name, value) => {
        if (name === "v_name") {
            if (!value) { // Check if a volunteer name is selected
                toast.error("Please select a volunteer name.");
            }
        }
        if (name === "title") {
            if (!/^[a-zA-Z\s]{3,20}$/.test(value)) {
                toast.error("Title must be 3-20 characters long and cannot include special characters.");
            }
        }
        if (name === "issue_date") {
            const selectedDate = new Date(value).setHours(0, 0, 0, 0);
            const today = new Date().setHours(0, 0, 0, 0);

            if (selectedDate !== today) {
                toast.error("You can only select the present date.");
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate before submitting
        if (!input.v_name) {
            toast.error("Please select a volunteer name.");
            return;
        }
        if (!/^[a-zA-Z\s]{3,20}$/.test(input.title)) {
            toast.error("Title must be 3-20 characters long and cannot include special characters.");
            return;
        }
        if (new Date(input.issue_date).setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0)) {
            toast.error("You can only select the present date.");
            return;
        }
        sendRequest().then(() => navigate('/CertificateDisplay'));
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:3000/certificate/add", {
            v_name: String(input.v_name),
            title: String(input.title),
            issue_date: new Date(input.issue_date),
            time_period: String(input.time_period),
        }).then((res) => res.data);
    };

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
                            value={input.v_name}
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

                        <br />
                        <div className='sep2200'>
                            <label >Title</label>
                            <input
                                className='input2200'
                                type='text'
                                name='title'
                                placeholder='Enter Title'
                                value={input.title}
                                onChange={handleChange}
                                required
                            />

                            <label>Time Period</label>
                            <input
                                type='text'
                                name='time_period'
                                placeholder='Enter Time Period'
                                value={input.time_period}
                                onChange={handleChange}
                                required
                            />

                            <label>Issue Date</label>
                            <input
                                type='date'
                                name='issue_date'
                                placeholder='Enter Issue Date'
                                value={input.issue_date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <h1 className='title2200'>Certificate Preview</h1>
                        <div className='cont2200' ref={ref}>
                            <img src={template} alt='' />
                            <div className='content2200'>
                                <h1>{input.v_name}</h1>
                                <p>{input.time_period}</p>
                                <h2>{input.issue_date}</h2>
                            </div>
                        </div>

                        <button type='button' className='btn2200' onClick={onButtonClick}>Download</button>
                        <button type='submit' className='btn2201'>Submit</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default CertificateC;
