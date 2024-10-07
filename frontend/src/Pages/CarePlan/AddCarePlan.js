import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../Components/Dashboard/Dashboard'; // Import your Dashboard component

const AddCareplan = () => {
    const [formData, setFormData] = useState({
        elderName: '',
        personalCare: '',
        medication: '',
        meals: '',
        companions: '',
        description: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Regex to allow only letters and spaces
        const regex = /^[A-Za-z\s]*$/;

        if (regex.test(value) || value === '') {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/careplan/add', formData);
            setSuccessMessage('Careplan added successfully!');
            setErrorMessage('');
            setFormData({
                elderName: '',
                personalCare: '',
                medication: '',
                meals: '',
                companions: '',
                description: ''
            });
            setTimeout(() => {
                navigate('/viewcareplan');
            }, 1500);
        } catch (error) {
            setErrorMessage('Failed to add careplan. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 w-full">
            {/* Sidebar / Dashboard */}
            <Dashboard />

            {/* Main Content */}
            <div className="flex flex-col w-4/5 p-5 bg-gray-100">
                <div className="flex justify-center items-center">
                    <div className="max-w-3xl w-full py-5 px-8 bg-[#d7daf3] rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Add New Care Plan</h2>

                        {successMessage && <p className="text-green-600 text-center font-semibold mb-3">{successMessage}</p>}
                        {errorMessage && <p className="text-red-600 text-center font-semibold mb-3">{errorMessage}</p>}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Elder Name:</label>
                                <input
                                    type="text"
                                    name="elderName"
                                    value={formData.elderName}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Personal Care:</label>
                                <input
                                    type="text"
                                    name="personalCare"
                                    value={formData.personalCare}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Medication:</label>
                                <input
                                    type="text"
                                    name="medication"
                                    value={formData.medication}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Meals:</label>
                                <input
                                    type="text"
                                    name="meals"
                                    value={formData.meals}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Companions:</label>
                                <input
                                    type="text"
                                    name="companions"
                                    value={formData.companions}
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

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Add Care Plan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCareplan;
