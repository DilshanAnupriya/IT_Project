import React, { useRef, useState } from 'react';
import Nav from "../../Components/Navbar/Navbar"
import "../../Pages/Css/Volunteers/VolunteerRegistration.css"
import Footer from "../../Components/Footer/Footer"
import p3 from "../../Assets/Volunteers/p3.png"
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function VolunteerRegistration() {

    const history = useNavigate();
    const [input, setInputs] = useState({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "Male", // add default value
        email: "",
        duration: "",
        skills: "Male",
        type_of_work: "Male",
        experience: "No", // add default value
        days: "Wd", // add default value
        time: "Male", // add default value
        description: "",
        date: "",
        mobile: "",
        emobile: "",
        address: "",
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
        sendRequest().then(() => history('/mainHome'))
    }

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
    }

    //navigation between next pre
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
            alert('Please fill out all required fields in the  form.');
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
        <div>
            <Nav />
            <div className='c1'>
                <img src={p3} alt='photo' />
                <div className='sub-c'>
                    <h2></h2>
                </div>
            </div>
            <div className='container'>
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
                                    <input type='Date' onChange={handleChange} placeholder='Enter birth date' name='date_of_birth' value={input.date_of_birth} required />
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
                                    <input type='Date' onChange={handleChange} placeholder='Enter date' name='date' value={input.date} required />
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
                                    <input type='text' onChange={handleChange} placeholder='Enter Your duration' value={input.duration} name='duration' required />
                                </div>

                                <div className='input-field'>
                                    <label>Preferred Type of Work</label>
                                    <select id="gen" name="type_of_work" onChange={handleChange} value={input.type_of_work}>
                                        <option value="Male" >Male</option>
                                        <option value="female">Female</option>
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
                                    <select id="gen" name="time" onChange={handleChange} value={input.time}>
                                        <option value="Male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className='input-field'>
                                    <label>Skills</label>
                                    <select id="gen" name="skills" onChange={handleChange} value={input.skills}>
                                        <option value="Male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                <div className='input-field'>
                                    <label>Why Do You Want To Volunteer?</label>
                                    <textarea name='description' onChange={handleChange} value={input.description} placeholder='Enter your description' ></textarea>
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


            <Footer />

        </div>
    )
}

export default VolunteerRegistration;