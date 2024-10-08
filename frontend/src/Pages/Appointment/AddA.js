import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../Components/MDash/MD'; // Import your Dashboard component

const AddAppointment = () => {
    const [formData, setFormData] = useState({
        name: '',
        gmail: '',
        phone: '',
        description: '',
        appointmenttype: 'Online', // Set default value to 'Online'
        date: '', // Add date field
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Prevent numbers and special characters in the name
        if (name === 'name' && /[^a-zA-Z\s]/.test(value)) {
            return;
        }
        // Prevent numbers and special characters in the name
        if (name === 'gmail' && /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
            return;
        }

        // Limit phone number to 10 digits
        if (name === 'phone' && (value.length > 10 || isNaN(value))) {
            return;
        }

        // Limit description to 50 characters
        if (name === 'description' && value.length > 50) {
            return;
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const { name, gmail, phone, description, date } = formData;

        if (!date) {
            setErrorMessage('Please select a date for the appointment.');
            return false;
        }

        // Name validation: no numbers or special symbols
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(name)) {
            setErrorMessage('Name can only contain letters and spaces.');
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Updated regex for Gmail
        if (!emailRegex.test(gmail)) {
            setErrorMessage('Please enter a valid Gmail address (e.g., example@gmail.com).');
            return false;
        }

        // Phone validation: must be exactly 10 characters
        if (phone.length !== 10) {
            setErrorMessage('Phone number must be exactly 10 characters.');
            return false;
        }

        // Description validation: must be less than or equal to 50 characters
        if (description.length > 50) {
            setErrorMessage('Description must be less than or equal to 50 characters.');
            return false;
        }

        // If all validations pass
        setErrorMessage('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form before submitting
        if (!validateForm()) return;

        try {
            const response = await axios.post('http://localhost:3000/appointments/addApp', formData);
            setSuccessMessage('Appointment added successfully!');

            // Reset form data
            setFormData({
                name: '',
                gmail: '',
                phone: '',
                description: '',
                appointmenttype: 'Online', // Reset to default value

            });

            // Redirect after a timeout
            setTimeout(() => {
                navigate('/ViewA'); // Redirect to view appointments page
            }, 1500);
        } catch (error) {
            console.error('Error while adding appointment:', error); // Log the error

            // Safely access the error message or set a default message
            const errorMessage = error.response?.data?.message || 'Failed to add appointment. Please try again.';

            setErrorMessage(errorMessage); // Display the error message from the server
            setSuccessMessage('');
        }
    };

    return (
        <div>
            {/* Sidebar / Dashboard */}
            <Dashboard />

            {/* Main Content */}
            <div className="flex flex-col w-[700px] ml-[200px] p-5 bg-gray-100">
                <div className="flex justify-center items-center ">
                    <div className="w-[600px]  py-5 px-8 bg-[#d7daf3] rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Add New Appointment</h2>

                        {successMessage && <p className="text-green-600 text-center font-semibold mb-3">{successMessage}</p>}
                        {errorMessage && <p className="text-red-600 text-center font-semibold mb-3">{errorMessage}</p>}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
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
                                <label className="block text-sm font-medium text-gray-700">Phone:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description:</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Appointment Type:</label>
                                <select
                                    name="appointmenttype"
                                    value={formData.appointmenttype}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option value="Online">Online</option>
                                    <option value="Physical">Physical</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Appointment Date:</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Add Appointment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAppointment;
