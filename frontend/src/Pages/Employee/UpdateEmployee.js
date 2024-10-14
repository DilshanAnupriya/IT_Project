import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "../../Pages/Css/Employee/EmpDash.css"; // Import the CSS file

function UpdateEmployee() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        job_role: '',
        nic: '',
        email: '',
        qualifications: '',
        bank_details: '',
        joined_date: ''
    });

    const [errors, setErrors] = useState({});
    
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/employees/${id}`);
                console.log('Fetched employee data:', response.data); // Debugging log
                setFormData(response.data); // Ensure the correct data structure
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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

        if (!formData.first_name) {
            valid = false;
            newErrors.first_name = "First name is required";
        } else if (!/^[A-Za-z]+$/.test(formData.first_name)) {
            valid = false;
            newErrors.first_name = "First name should only contain letters";
        }

        if (!formData.last_name) {
            valid = false;
            newErrors.last_name = "Last name is required";
        } else if (!/^[A-Za-z]+$/.test(formData.last_name)) {
            valid = false;
            newErrors.last_name = "Last name should only contain letters";
        }

        if (!formData.job_role) {
            valid = false;
            newErrors.job_role = "Job role is required";
        }
        if (!formData.nic) {
            valid = false;
            newErrors.nic = "NIC is required";
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            valid = false;
            newErrors.email = "Valid email is required";
        }
        if (!formData.qualifications) {
            valid = false;
            newErrors.qualifications = "Qualifications are required";
        }
        if (!formData.bank_details) {
            valid = false;
            newErrors.bank_details = "Bank details are required";
        }
        if (!formData.joined_date) {
            valid = false;
            newErrors.joined_date = "Joined date is required";
        } else if (new Date(formData.joined_date) > new Date()) {
            valid = false;
            newErrors.joined_date = "Joined date cannot be in the future";
        }
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData); // Debugging log

        if (validateForm()) {
            try {
                const response = await axios.put(`http://localhost:3000/employees/update/${id}`, formData);
                console.log('Update response:', response); // Debugging log
                navigate('/EmpDash'); // Navigate back to employee dashboard
            } catch (error) {
                console.error('Error updating employee data:', error);
            }
        }
    };

    return (
        <div className="modal-background35">
            <div className="modal-container35">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-6">Update Employee</h2>
                    <div className="grid-container35">
                        <div className="form-group35">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                            {errors.first_name && <p className="error35">{errors.first_name}</p>}
                        </div>
                        <div className="form-group35">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                            {errors.last_name && <p className="error35">{errors.last_name}</p>}
                        </div>
                        <div className="form-group35">
                            <label>Job Role</label>
                            <select
                                name="job_role"
                                value={formData.job_role}
                                onChange={handleChange}
                                className="select-field35"
                                required
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
                                value={formData.nic}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                            {errors.nic && <p className="error35">{errors.nic}</p>}
                        </div>
                        <div className="form-group35">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                            {errors.email && <p className="error35">{errors.email}</p>}
                        </div>
                        <div className="form-group35">
                            <label>Qualifications</label>
                            <select
                                name="qualifications"
                                value={formData.qualifications}
                                onChange={handleChange}
                                className="select-field35"
                                required
                            >
                                <option value="" disabled>Select Qualification</option>
                                <option value="No formal education">No formal education</option>
                                <option value="Primary education">Primary education</option>
                                <option value="O/L">O/L</option>
                                <option value="A/L">A/L</option>
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
                                value={formData.bank_details}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                            {errors.bank_details && <p className="error35">{errors.bank_details}</p>}
                        </div>
                        <div className="form-group35">
                            <label>Joined Date</label>
                            <input
                                type="date"
                                name="joined_date"
                                value={formData.joined_date}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                            {errors.joined_date && <p className="error35">{errors.joined_date}</p>}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="submit-btn35"
                    >
                        Update Employee
                    </button>
                </form>
                <button className="close-btn35" onClick={() => navigate('/EmpDash')}>X</button>
            </div>
        </div>
    );
}

export default UpdateEmployee;