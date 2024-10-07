import React, { useState } from 'react';
import Nav from "../../Components/Navbar/Navbar";
import "../../Pages/Css/Medical/Medusercss.css";  // Make sure this path is correct
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Meduserreq() {
    const history = useNavigate();
    const [input, setInputs] = useState({
        Elder_firstnamee: "",
        Elder_lastname: "",
        Age: "",
        Gender: "Male",  // default value
        Current_need: "",
        Summary: ""
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
            case "Elder_firstname":
                if (!value) errorMsg = "First name is required";
                break;
            case "Elder_lastname":
                if (!value) errorMsg = "Last name is required";
                break;
            case "Age":
                if (!value || value === "0") errorMsg = "Age should not be 0";
                break;
            case "Gender":
                if (!value) errorMsg = "Gender is required";
                break;
            case "Current_need":
                if (!value) errorMsg = "Current need is required";
                break;
            case "Summary":
                if (!value) errorMsg = "Summary is required";
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

        if (!input.Elder_firstname) {
            valid = false;
            newErrors.Elder_firstname = "First name is required";
        }
        if (!input.Elder_lastname) {
            valid = false;
            newErrors.Elder_lastname = "Last name is required";
        }
        if (!input.Age || input.Age === "0") {
            valid = false;
            newErrors.Age = "Age is required and should be greater than 0";
        }
        if (!input.Gender) {
            valid = false;
            newErrors.Gender = "Gender is required";
        }
        if (!input.Current_need) {
            valid = false;
            newErrors.Current_need = "Current need is required";
        }
        if (!input.Summary) {
            valid = false;
            newErrors.Summary = "Summary is required";
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            sendRequest().then(() => history('/form-succeful'));
        }
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:3000/medreport/add", {
            Elder_firstname: String(input.Elder_firstname),
            Elder_lastname: String(input.Elder_lastname),
            Age: Number(input.Age),
            Gender: String(input.Gender),
            Current_need: String(input.Current_need),
            Summary: String(input.Summary),
        }).then(res => res.data);
    };

    return (
        <div className='all'>
        <div className='newN'><Nav /></div>
        <div className='container7'>
            <div class = "header-box">
            <h2>Elder Care Request Form</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='fields7'>
                    <div className='input-field7'>
                        <label>Elder First Name</label>
                        <input 
                            type='text' 
                            onChange={handleChange} 
                            placeholder='Enter Elder First Name' 
                            value={input.Elder_firstname} 
                            name='Elder_firstname' 
                            required 
                        />
                        {errors.Elder_firstname && <span className="error">{errors.Elder_firstname}</span>}
                    </div>

                    <div className='input-field7'>
                        <label>Elder Last Name</label>
                        <input 
                            type='text' 
                            onChange={handleChange} 
                            placeholder='Enter Elder Last Name' 
                            value={input.Elder_lastname} 
                            name='Elder_lastname' 
                            required 
                        />
                        {errors.Elder_lastname && <span className="error">{errors.Elder_lastname}</span>}
                    </div>

                    <div className='input-field7'>
                        <label>Age</label>
                        <input 
                            type='number' 
                            onChange={handleChange} 
                            placeholder='Enter Age' 
                            value={input.Age} 
                            name='Age' 
                            required 
                        />
                        {errors.Age && <span className="error">{errors.Age}</span>}
                    </div>
            

                    <div className='input-field7'>
                        <label>Gender</label>
                        <select name="Gender" onChange={handleChange} value={input.Gender}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        
                        {errors.Gender && <span className="error">{errors.Gender}</span>}
                    </div>

                    <div className='input-field7'>
                        <label>Current Need</label>
                        <input 
                            type='text' 
                            onChange={handleChange} 
                            placeholder='Enter Current Need' 
                            value={input.Current_need} 
                            name='Current_need' 
                            required 
                        />
                        {errors.Current_need && <span className="error">{errors.Current_need}</span>}
                    </div>

                    <div className='input-field7'>
                        <label>Summary</label>
                        <input 
                            type='text' 
                            onChange={handleChange} 
                            placeholder='Enter Summary' 
                            value={input.Summary} 
                            name='Summary' 
                            required 
                        />
                        {errors.Summary && <span className="error">{errors.Summary}</span>}
                    </div>
                </div>

                <div className="button-container">
                    <button className='subButton'>Submit</button>
                </div>
            </form>
        </div>
        <div className='newf'><Footer /></div>
    </div>
);
}

export default Meduserreq;

