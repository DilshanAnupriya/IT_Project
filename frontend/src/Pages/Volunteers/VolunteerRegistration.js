import React, { useRef, useState } from 'react';
import "../Css/Volunteers/VolunteerRegistration.css"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Nav from "../../Components/Navbar/Navbar"


function VolunteerRegistration() {
    const history = useNavigate();
    const [input, setInputs] = useState({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "Male",
        email: "",
        duration: "",
        skills: "Technical Skills",
        type_of_work: "Companionship",
        experience: "No",
        days: "Wd",
        time: "Morning",
        description: "",
        date: "",
        mobile: "",
        emobile: "",
        address: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let errorMessages = { ...errors };

        if (name === "first_name" || name === "last_name") {
            if (!/^[a-zA-Z]{3,20}$/.test(value)) {
                errorMessages[name] = "Name must be 3-20 characters long and cannot contain numbers or special characters.";
            } else {
                delete errorMessages[name];
            }
        }

        if (name === "date_of_birth") {
            const age = new Date().getFullYear() - new Date(value).getFullYear();
            if (age < 18) {
                errorMessages[name] = "You must be at least 18 years old.";
            } else {
                delete errorMessages[name];
            }
        }

        if (name === "email") {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(value)) {
                errorMessages[name] = "Please enter a valid email address.";
            } else {
                delete errorMessages[name];
            }
        }

        if (name === "duration") {
            if (/[*&^%$#@!()]/.test(value)) {
                errorMessages[name] = "Duration cannot contain special characters.";
            } else {
                delete errorMessages[name];
            }
        }

        if (name === "date") {
            const selectedDate = new Date(value).setHours(0, 0, 0, 0);
            const today = new Date().setHours(0, 0, 0, 0);

            if (selectedDate !== today) {
                errorMessages[name] = "You can only select the present date.";
            } else {
                delete errorMessages[name];
            }
        }

        if (name === "mobile" || name === "emobile") {
            if (!/^[0-9]{10}$/.test(value)) {
                errorMessages[name] = "Please enter a valid 10-digit mobile number.";
            } else {
                delete errorMessages[name];
            }
        }

        setErrors(errorMessages);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            sendRequest().then(() => history('/mainHome'));
        } else {
            alert("Please fix the validation errors.");
        }
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:3000/users/add", {
            first_name: String(input.first_name),
            last_name: String(input.last_name),
            date_of_birth: new Date(input.date_of_birth),
            gender: String(input.gender),
            email: String(input.email),
            duration: String(input.duration),
            skills: String(input.skills),
            type_of_work: String(input.type_of_work),
            experience: String(input.experience),
            days: String(input.days),
            time: String(input.time),
            description: String(input.description),
            date: new Date(input.date),
            mobile: Number(input.mobile),
            emobile: Number(input.emobile),
            address: String(input.address),
        }).then(res => res.data);
    };

    const form1 = useRef(null);
    const form2 = useRef(null);
    const nextBtn = useRef(null);
    const preBtn = useRef(null);
    const [isForm1Filled, setIsForm1Filled] = useState(false);

    const handleNext = () => {
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
            alert('Please fill out all required fields in the form.');
        }
    };

    const handlePrevious = () => {
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

    return (
        <div className='all'>
            <Nav />
            <div className='container30' id='section2'>
                <header>Registration</header>
                <form action='#' onSubmit={handleSubmit}>
                    <div ref={form1} className='form first30'>
                        <div className='details personal'>
                            <span className='title'>Personal Details</span>
                            <div className='fields'>
                                <div className='input-field'>
                                    <label>First Name</label>
                                    <input type='text' onChange={handleChange} placeholder='Enter Your Name' value={input.first_name} name='first_name' required />
                                    {errors.first_name && <p className="error">{errors.first_name}</p>}
                                </div>
                                <div className='input-field'>
                                    <label>Last Name</label>
                                    <input type='text' onChange={handleChange} placeholder='Enter Your Name' name='last_name' value={input.last_name} required />
                                    {errors.last_name && <p className="error">{errors.last_name}</p>}
                                </div>
                                <div className='input-field'>
                                    <label>Date of Birth</label>
                                    <input type='Date' onChange={handleChange} placeholder='Enter birth date' name='date_of_birth' value={input.date_of_birth} required />
                                    {errors.date_of_birth && <p className="error">{errors.date_of_birth}</p>}
                                </div>
                                <div className='input-field'>
                                    <label>Gender</label>
                                    <select id="gen" name="gender" onChange={handleChange} value={input.gender}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className='input-field'>
                                    <label>Email</label>
                                    <input type='text' onChange={handleChange} placeholder='Enter Your email' name='email' value={input.email} required />
                                    {errors.email && <p className="error">{errors.email}</p>}
                                </div>
                                <div className='input-field'>
                                    <label>Join Date</label>
                                    <input type='Date' onChange={handleChange} placeholder='Enter date' name='date' value={input.date} required />
                                    {errors.date && <p className="error">{errors.date}</p>}
                                </div>
                                <div className='input-field'>
                                    <label>Mobile Number</label>
                                    <input type='number' onChange={handleChange} placeholder='Enter Your number' name='mobile' value={input.mobile} required />
                                    {errors.mobile && <p className="error">{errors.mobile}</p>}
                                </div>
                                <div className='input-field'>
                                    <label>Emergency Mobile Number</label>
                                    <input type='number' onChange={handleChange} placeholder='Enter mobile number' name='emobile' value={input.emobile} required />
                                    {errors.emobile && <p className="error">{errors.emobile}</p>}
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
                                    {errors.duration && <p className="error">{errors.duration}</p>}
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
                                    <select id="experience" name="experience" onChange={handleChange} value={input.experience}>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className='input-field'>
                                    <label>Days Available</label>
                                    <select id="days" name="days" onChange={handleChange} value={input.days}>
                                        <option value="Wd">Weekdays</option>
                                        <option value="We">Weekends</option>
                                        <option value="Bw">Both</option>
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
                                <div className='input-field'>
                                    <label>Time Available</label>
                                    <select id="time" name="time" onChange={handleChange} value={input.time}>
                                        <option value="Morning">Morning</option>
                                        <option value="Afternoon">Afternoon</option>
                                        <option value="Evening">Evening</option>
                                    </select>
                                </div>
                                <div className='input-fieldA'>
                                    <label>Description</label>
                                    <textarea className="area" name='description' onChange={handleChange} placeholder='Describe your interest' value={input.description} required></textarea>
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

        </div>
    );
}

export default VolunteerRegistration;
