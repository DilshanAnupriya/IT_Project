import React, { useEffect, useRef, useState } from 'react';
import Footer from "../../Components/Footer/Footer"
import Nav from "../../Components/Navbar/Navbar"
import "../Css/Volunteers/VolunteerPdUpdate.css"
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function VolunteerPdUpdate() {

    //update part

    const { id } = useParams(); // Get the care plan ID from the URL
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [input, setInputs] = useState({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        email: "",
        duration: "",
        skills: "",
        type_of_work: "",
        experience: "",
        days: "",
        time: "",
        description: "",
        date: "",
        mobile: "",
        emobile: "",
        address: "",
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch the existing care plan data
    useEffect(() => {
        const fetchCareplan = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}`);
                setInputs(response.data.volunteer);
                setLoading(false);
            } catch (error) {
                setErrorMessage('Failed to fetch care plan. Please try again.');
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
            await axios.put(`http://localhost:3000/users/update/${id}`, input);
            setSuccessMessage('Careplan updated successfully!');
            setErrorMessage('');

            // Navigate back to the View Care Plans page after a short delay
            setTimeout(() => {
                navigate('/volunteer_pd');
            }, 1500); // 1.5 seconds delay to show the success message
        } catch (error) {
            setErrorMessage('Failed to update careplan. Please try again.');
            setSuccessMessage('');
        }
    };


    //navigation between next pre
    const form1 = useRef(null);
    const form2 = useRef(null);
    const nextBtn = useRef(null);
    const preBtn = useRef(null);
    const [isForm1Filled, setIsForm1Filled] = useState(false);

    const handleNext = (e) => {
        e.preventDefault(); // Add this line to prevent the form from submitting
        const form1Inputs = form1.current.querySelectorAll('input, select, textarea');
        let isForm1Valid = true;

        form1Inputs.forEach(input => {
            if (input.required && input.value === '') {
                isForm1Valid = false;
            }
        });

        if (isForm1Valid) {
            setIsForm1Filled(true);
            form1.current.style.opacity = 0;
            form1.current.style.pointerEvents = 'none';
            form2.current.style.opacity = 1;
            form2.current.style.pointerEvents = 'auto';
        } else {
            alert('Please fill out all required fields in the  form.');
        }
    };

    const handlePrevious = (e) => {
        e.preventDefault(); // Add this line to prevent the form from submitting
        setIsForm1Filled(false);
        form1.current.style.opacity = 1;
        form1.current.style.pointerEvents = 'auto';
        form2.current.style.opacity = 0;
        form2.current.style.pointerEvents = 'none';
    };

    React.useEffect(() => {
        nextBtn.current.addEventListener('click', handleNext);
        preBtn.current.addEventListener('click', handlePrevious);
    }, []);


    //v


    return (
        <div className='all'>
            <Nav />
            <div className='container20' id='section2'>
                <header>Registration</header>

                <form action='#' onSubmit={handleSubmit}>
                    <div ref={form1} className='form first'>
                        <div className='details personal'>
                            <span className='title'>Personal Details</span>

                            <div className='fields'>
                                <div className='input-field'>
                                    <label>First Name</label>
                                    <input type='text' onChange={handleChange} placeholder='Enter Your Name' value={input.first_name} name='first_name' required />

                                </div>

                                <div className='input-field'>
                                    <label>Last Name</label>
                                    <input type='text' onChange={handleChange} placeholder='Enter Your Name' name='last_name' value={input.last_name} required />
                                </div>

                                <div className='input-field'>
                                    <label>Date of Birth</label>
                                    <input type='Date' onChange={handleChange} placeholder='Enter birth date' name='date_of_birth' value={input.date_of_birth ? input.date_of_birth.substring(0, 10) : ''} required />
                                </div>

                                <div className='input-field'>
                                    <label>Gender</label>
                                    <select id="gen" name="gender" onChange={handleChange} value={input.gender}>
                                        <option value="Male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                <div className='input-field'>
                                    <label>Email</label>
                                    <input type='text' onChange={handleChange} placeholder='Enter Your email' name='email' value={input.email} required />
                                </div>

                                <div className='input-field'>
                                    <label>Join Date</label>
                                    <input type='Date' onChange={handleChange} placeholder='Enter date' name='date' value={input.date ? input.date.substring(0, 10) : ''} required />
                                </div>

                                <div className='input-field'>
                                    <label>Mobile Number</label>
                                    <input type='number' onChange={handleChange} placeholder='Enter Your number' name='mobile' value={input.mobile} required />
                                </div>

                                <div className='input-field'>
                                    <label>Emergency Mobile Number</label>
                                    <input type='number' onChange={handleChange} placeholder='Enter mobile number' name='emobile' value={input.emobile} required />
                                </div>
                                <div className='input-field'>
                                    <label>Address</label>
                                    <input type='text' onChange={handleChange} placeholder='Enter Your address' name='address' value={input.address} required />
                                </div>
                            </div>
                        </div>


                        <button ref={nextBtn} className='nextBtn'>Next</button>

                    </div>

                    <div ref={form2} className='form second'>
                        <div className='details Volunteer'>
                            <span className='title'>Volunteering  Details</span>
                            <div className='fields'>
                                <div className='input-field'>
                                    <label>Duration</label>
                                    <input type='text' onChange={handleChange} placeholder='1-Month' value={input.duration} name='duration' required />
                                </div>

                                <div className='input-field'>
                                    <label>Preferred Type of Work</label>
                                    <select id="work" name="type_of_work" onChange={handleChange} value={input.type_of_work}>
                                        <option value=" Companionship"> Companionship</option>
                                        <option value="Assistance with Daily Living">Assistance with Daily Living</option>
                                        <option value="Event and Activity Organization">Event and Activity Organization</option>
                                        <option value="Transportation">Transportation</option>
                                        <option value="Transportation">Transportation</option>
                                        <option value="Specialized Support">Specialized Support</option>
                                        <option value="Pet Therapy">Pet Therapy</option>
                                        <option value="Spiritual Care">Spiritual Care</option>
                                        <option value="Hospice Volunteering">Hospice Volunteering</option>
                                        <option value="Intergenerational Programs">Intergenerational Programs</option>
                                    </select>
                                </div>

                                <div className='input-field'>
                                    <label>Experience</label>
                                    <select id="ex" name="experience" onChange={handleChange} value={input.experience}>
                                        <option value="Yes">Yes, I have</option>
                                        <option value="No">Not, I don't have</option>
                                    </select>
                                </div>

                                <div className='input-field'>
                                    <label>Available Days</label>
                                    <select id="dy" name="days" onChange={handleChange} value={input.days}>
                                        <option value="WD">Week-Days</option>
                                        <option value="WE">Week-Ends</option>
                                    </select>
                                </div>

                                <div className='input-field'>
                                    <label>Available Times</label>
                                    <select id="time" name="time" onChange={handleChange} value={input.time}>
                                        <option value="Morning">Morning ( 8:00 AM - 12:00 PM)</option>
                                        <option value="Afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                                        <option value="Evening">Evening ( 4:00 PM - 8:00 PM)</option>
                                        <option value="Night">Night ( 8:00 PM - 12:00 AM or overnight shifts for 24-hour care facilities)</option>
                                    </select>
                                </div>
                                <div className='input-field'>
                                    <label>Skills</label>
                                    <select id="skills" name="skills" onChange={handleChange} value={input.skills}>
                                        <option value=" Technical Skills"> Technical Skills</option>
                                        <option value="Specialized Skills">Specialized Skills</option>
                                        <option value="Soft Skills">ESoft Skills</option>
                                        <option value="nursing">nursing</option>
                                        <option value="other">other</option>

                                    </select>
                                </div>

                                <div className='input-fieldA'>
                                    <label>Why Do You Want To Volunteer?</label>
                                    <textarea className='area' name='description' onChange={handleChange} value={input.description} placeholder='Enter your description' ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='buttons'>
                            <button ref={preBtn} className='preBtn'>Previous</button>
                            <button className='subBtn'>Submit</button>
                        </div>

                    </div>

                </form>
            </div>

            <div className='ft'>
                <Footer />
            </div>

        </div>
    )
}

export default VolunteerPdUpdate