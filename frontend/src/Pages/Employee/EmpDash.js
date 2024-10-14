import React, { useState } from 'react';
import "../../Pages/Css/Employee/EmpDash.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function EmpDash() {
    const history = useNavigate();
    const [input, setInputs] = useState({
        first_name: "",
        last_name: "",
        job_role: "",  
        nic: "",
        email: "",  
        qualifications: "",
        bank_details: "",  
        joined_date: ""
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
            case "first_name":
                if (!value) errorMsg = "First name is required";
                else if (!/^[A-Za-z]+$/.test(value)) errorMsg = "First name should only contain letters";
                break;
            case "last_name":
                if (!value) errorMsg = "Last name is required";
                else if (!/^[A-Za-z]+$/.test(value)) errorMsg = "Last name should only contain letters";
                break;
            case "job_role":
                if (!value) errorMsg = "Job role is required";
                break;
            case "nic":
                if (!value) errorMsg = "NIC is required";
                break;
            case "email":
                if (!value) errorMsg = "Email is required";
                else if (!/\S+@\S+\.\S+/.test(value)) errorMsg = "Invalid email format";
                break;
            case "qualifications":
                if (!value) errorMsg = "Qualifications are required";
                break;
            case "bank_details":
                if (!value) errorMsg = "Bank details are required";
                break;
            case "joined_date":
                if (!value) {
                    errorMsg = "Joined date is required";
                } else if (new Date(value) > new Date()) {
                    errorMsg = "Joined date cannot be in the future";
                }
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

        if (!input.first_name) {
            valid = false;
            newErrors.first_name = "First name is required";
        } else if (!/^[A-Za-z]+$/.test(input.first_name)) {
            valid = false;
            newErrors.first_name = "First name should only contain letters";
        }

        if (!input.last_name) {
            valid = false;
            newErrors.last_name = "Last name is required";
        } else if (!/^[A-Za-z]+$/.test(input.last_name)) {
            valid = false;
            newErrors.last_name = "Last name should only contain letters";
        }

        if (!input.job_role) {
            valid = false;
            newErrors.job_role = "Job role is required";
        }
        if (!input.nic) {
            valid = false;
            newErrors.nic = "NIC is required";
        }
        if (!input.email || !/\S+@\S+\.\S+/.test(input.email)) {
            valid = false;
            newErrors.email = "Valid email is required";
        }
        if (!input.qualifications) {
            valid = false;
            newErrors.qualifications = "Qualifications are required";
        }
        if (!input.bank_details) {
            valid = false;
            newErrors.bank_details = "Bank details are required";
        }
        if (!input.joined_date) {
            valid = false;
            newErrors.joined_date = "Joined date is required";
        } else if (new Date(input.joined_date) > new Date()) {
            valid = false;
            newErrors.joined_date = "Joined date cannot be in the future";
        }
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            sendRequest().then(() => history('/EmpDash'));
        }
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:3000/employees/Create", {
            first_name: String(input.first_name),
            last_name: String(input.last_name),
            job_role: String(input.job_role),
            nic: String(input.nic),
            email: String(input.email),
            qualifications: String(input.qualifications),
            bank_details: String(input.bank_details),
            joined_date: Date(input.joined_date),
        }).then(res => res.data);
    };

    const onClose = () => {
        history("/EmpDash");
    };

    return (
        <div className="modal-background35">
            <div className="modal-container35">
                <form onSubmit={handleSubmit}>
                    <h2>Add Employee</h2>
                    <div className="grid-container35">
                        <div className="form-group35">
                            <label>First Name</label>
                            <input 
                                type="text" 
                                name="first_name" 
                                value={input.first_name} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.first_name && <p className="error35">{errors.first_name}</p>}
                        </div>
                        <div className="form-group35">
                            <label>Last Name</label>
                            <input 
                                type="text" 
                                name="last_name" 
                                value={input.last_name} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.last_name && <p className="error35">{errors.last_name}</p>}
                        </div>
                        <div className="form-group35">
                            <label>Job Role</label>
                            <select 
                                name="job_role" 
                                value={input.job_role} 
                                onChange={handleChange} 
                                required
                                className="select-field35"
                            >
                                <option value="" disabled>Select Job Role</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Nurse">Nurse</option>
                                <option value="Nutritionist">Nutritionist</option>
                                <option value="Care giver">Care giver</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.job_role && <p className="error35">{errors.job_role}</p>}
                        </div>
                        <div className="form-group35">
                            <label>NIC</label>
                            <input 
                                type="text" 
                                name="nic" 
                                value={input.nic} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.nic && <p className="error35">{errors.nic}</p>}
                        </div>
                        <div className="form-group35">
                            <label>Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={input.email} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.email && <p className="error35">{errors.email}</p>}
                        </div>
                        <div className="form-group35">
                            <label>Qualifications</label>
                            <select 
                                name="qualifications" 
                                value={input.qualifications} 
                                onChange={handleChange} 
                                required
                                className="select-field35"
                            >
                                <option value="" disabled>Select Qualification</option>
                                <option value="No formal education">No formal education</option>
                                <option value="Primary education">Primary education</option>
                                <option value="O/L">GCE Ordinary Level</option>
                                <option value="A/L">GCE Advanced Level</option>
                                <option value="Vocational qualification">Vocational qualification</option>
                                <option value="Bachelor's degree">Bachelor's degree</option>
                                <option value="Master's degree">Master's degree</option>
                                <option value="Doctorate or higher">Doctorate or higher</option>
                            </select>
                            {errors.qualifications && <p className="error35">{errors.qualifications}</p>}
                        </div>
                        <div className="form-group35">
                            <label>Bank Details</label>
                            <input 
                                type="text" 
                                name="bank_details" 
                                value={input.bank_details} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.bank_details && <p className="error35">{errors.bank_details}</p>}
                        </div>
                        <div className="form-group35">
                            <label>Joined Date</label>
                            <input 
                                type="date" 
                                name="joined_date" 
                                value={input.joined_date} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.joined_date && <p className="error35">{errors.joined_date}</p>}
                        </div>
                    </div>
                    <button type="submit" className="submit-btn35">Submit</button>
                </form>
                <button className="close-btn35" onClick={onClose}>X</button>
            </div>
        </div>
    );
}

export default EmpDash;