import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../Components/MDash/MD';

const AddUser = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        gmail: '',
        phoneNo: '',
        gender: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validation for fullName to restrict special characters and numbers
        if (name === 'fullName' && /[^a-zA-Z\s]/.test(value)) {
            return; // Prevent input of numbers and special characters
        }

        // Validation for phone number: only allow digits and limit to 10 characters
        if (name === 'phoneNo' && (/\D/.test(value) || value.length > 10)) {
            return; // Prevent non-digit characters and limit to 10 digits
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const { fullName, dob, gmail, phoneNo, password, confirmPassword } = formData;

        if (!fullName || !dob || !gmail || !phoneNo || !password || !confirmPassword) {
            setErrorMessage('All fields are required.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(gmail)) {
            setErrorMessage('Please enter a valid email address.');
            return false;
        }

        if (phoneNo.length !== 10) {
            setErrorMessage('Phone number must be exactly 10 digits.');
            return false;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return false;
        }

        setErrorMessage('');
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!validateForm()) return; // Validate the form

        try {
            console.log("Submitting user data:", formData); // Log the data being submitted
            await axios.post('http://localhost:3000/User/add', {
                fullName: formData.fullName,
                dob: formData.dob,
                gmail: formData.gmail,
                phoneNo: formData.phoneNo,
                gender: formData.gender,
                password: formData.password, // Send only the password
            });
            setSuccessMessage('User added successfully!');
            setFormData({
                fullName: '',
                dob: '',
                gmail: '',
                phoneNo: '',
                gender: '',
                password: '',
                confirmPassword: '',
            });
            setTimeout(() => {
                navigate('/ViewU'); // Navigate after a delay
            }, 1500);
        } catch (error) {
            console.error('Error adding user:', error);
            setErrorMessage('Failed to add user. Please try again.');
        }
    };

    return (
        <div>
            {/* Sidebar / Dashboard */}
            <Dashboard />

            {/* Main Content */}
            <div className="flex flex-col w-[1000px] ml-[200px] p-5 bg-gray-100">
                <div className="flex justify-center items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Add New User</h2>
                </div>

                <div className="w-[900px] py-5 px-8 bg-[#d7daf3] rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit} className="w-full flex space-x-4">
                        {/* Left Side: 4 Fields */}
                        <div className="w-1/2 space-y-4">
                            <div>
                                <label className="w-[900px] block text-sm font-medium text-gray-700">Full Name:</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date of Birth:</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gmail:</label>
                                <input
                                    type="email"
                                    name="gmail"
                                    value={formData.gmail}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
                                <input
                                    type="text"
                                    name="phoneNo"
                                    value={formData.phoneNo}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    maxLength="10" // Restrict to 10 characters
                                />
                            </div>
                        </div>

                        {/* Right Side: 3 Fields */}
                        <div className="w-1/2 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gender:</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirm Password:</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Centered Submit Button */}
                <div className="flex justify-center mt-6">
                    <button
                        type="submit" // Change to submit
                        onClick={handleSubmit} // Ensure it's linked to the submit function
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Add User
                    </button>
                </div>

                {/* Display error or success message */}
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
            </div>
        </div>
    );
};

export default AddUser;
