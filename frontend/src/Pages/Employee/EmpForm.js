import React, { useState } from 'react';
import Nav from "../../Components/Navbar/Navbar";
import "../../Pages/Css/Employee/EmpForm.css";  // Make sure this path is correct
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function EmployeeForm() {
    const history = useNavigate();
    const [input, setInputs] = useState({
        name: "",
        email: "",
        phone_no: "",
        gender: "Male",  // default value
        address: "",
        edu_qualifications: "High School",  // default value
        computerLiteracy: "Yes",  // default value
        experience: "No",  // default value
        yearsOfQualification: "0-2",  // default value
        englishSkills: "Good",  // default value
        reference: ""
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
        let errorMsg = "";

        switch (name) {
            case "name":
                if (!value) errorMsg = "Name is required";
                break;
            case "email":
                if (!value) errorMsg = "Email is required";
                else if (!/\S+@\S+\.\S+/.test(value)) errorMsg = "Invalid email format";
                break;
            case "phone_no":
                if (!value) errorMsg = "Phone number is required";
                else if (!/^[0-9]{10}$/.test(value)) errorMsg = "Invalid phone number (10 digits required)";
                break;
            case "address":
                if (!value) errorMsg = "Address is required";
                break;
            case "reference":
                if (!value) errorMsg = "Reference is required";
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMsg,
        }));
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!input.name) {
            valid = false;
            newErrors.name = "Name is required";
        }
        if (!input.email || !/\S+@\S+\.\S+/.test(input.email)) {
            valid = false;
            newErrors.email = "Valid email is required";
        }
        if (!input.phone_no || !/^[0-9]{10}$/.test(input.phone_no)) {
            valid = false;
            newErrors.phone_no = "Valid phone number is required (10 digits)";
        }
        if (!input.address) {
            valid = false;
            newErrors.address = "Address is required";
        }
        if (!input.reference) {
            valid = false;
            newErrors.reference = "Reference is required";
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            sendRequest().then(() => history('/job-success'));
        }
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:3000/requests/Create", {
            name: String(input.name),
            email: String(input.email),
            phone_no: Number(input.phone_no),
            gender: String(input.gender),
            address: String(input.address),
            edu_qualifications: String(input.edu_qualifications),
            computerLiteracy: String(input.computerLiteracy),
            experience: String(input.experience),
            yearsOfQualification: String(input.yearsOfQualification),
            englishSkills: String(input.englishSkills),
            reference: String(input.reference),
        }).then(res => res.data);
    };

    return (
        <div className='all'>
            <Nav />
            <div className='container37'>
                <header>Job Application</header>
                <form onSubmit={handleSubmit}>
                    <div className='fields37'>
                        <div className='input-field37'>
                            <label>Name (First and Last)</label>
                            <input 
                                type='text' 
                                onChange={handleChange} 
                                placeholder='Enter Your Full Name' 
                                value={input.name} 
                                name='name' 
                                required 
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>
                        <div className='input-field37'>
                            <label>Email Address</label>
                            <input 
                                type='email' 
                                onChange={handleChange} 
                                placeholder='Enter Your Email' 
                                value={input.email} 
                                name='email' 
                                required 
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className='input-field37'>
                            <label>Phone Number</label>
                            <input 
                                type='tel' 
                                onChange={handleChange} 
                                placeholder='Enter Your Phone Number' 
                                value={input.phone_no} 
                                name='phone_no' 
                                required 
                            />
                            {errors.phone_no && <span className="error">{errors.phone_no}</span>}
                        </div>
                        <div className='input-field37'>
                            <label>Gender</label>
                            <select name="gender" onChange={handleChange} value={input.gender}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className='input-field37'>
                            <label>Address</label>
                            <input 
                                type='text' 
                                onChange={handleChange} 
                                placeholder='Enter Your Address' 
                                value={input.address} 
                                name='address' 
                                required 
                            />
                            {errors.address && <span className="error">{errors.address}</span>}
                        </div>
                        <div className='input-field37'>
                            <label>Education Qualification</label>
                            <select name="edu_qualifications" onChange={handleChange} value={input.edu_qualifications}>
                                <option value="High School">High School</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Undergraduate">Undergraduate</option>
                                <option value="Postgraduate">Postgraduate</option>
                            </select>
                        </div>
                        <div className='input-field37'>
                            <label>Computer Literacy</label>
                            <select name="computerLiteracy" onChange={handleChange} value={input.computerLiteracy}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className='input-field37'>
                            <label>Do you have experience in a similar role?</label>
                            <select name="experience" onChange={handleChange} value={input.experience}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className='input-field37'>
                            <label>Years of Qualification</label>
                            <select name="yearsOfQualification" onChange={handleChange} value={input.yearsOfQualification}>
                                <option value="0-2">0-2 Years</option>
                                <option value="3-5">3-5 Years</option>
                                <option value="5+">5+ Years</option>
                            </select>
                        </div>
                        <div className='input-field37'>
                            <label>English Speaking Skills</label>
                            <select name="englishSkills" onChange={handleChange} value={input.englishSkills}>
                                <option value="Good">Good</option>
                                <option value="Fluent">Fluent</option>
                                <option value="Basic">Basic</option>
                            </select>
                        </div>
                        <div className='input-field37'>
                            <label>Reference</label>
                            <input 
                                type='text' 
                                onChange={handleChange} 
                                placeholder='Enter Reference Name' 
                                value={input.reference} 
                                name='reference' 
                                required 
                            />
                            {errors.reference && <span className="error">{errors.reference}</span>}
                        </div>
                    </div>
                    <div className="button-container37">
                    <button className='subBtn37'>Submit</button> {/* Updated button class */}</div>
                </form>
            </div>
            <div className='newf37'><Footer /></div>
        </div>
    );
}

export default EmployeeForm;
