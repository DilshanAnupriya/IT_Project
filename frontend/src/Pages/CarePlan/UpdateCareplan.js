import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Dashboard from '../../Components/Dashboard/Dashboard';

const UpdateCareplan = () => {
    const { id } = useParams(); // Get the care plan ID from the URL
    const navigate = useNavigate(); // Initialize the useNavigate hook
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
    const [loading, setLoading] = useState(true);

    // Fetch the existing care plan data
    useEffect(() => {
        const fetchCareplan = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/careplan/${id}`);
                setFormData(response.data);
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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/careplan/${id}`, formData);
            setSuccessMessage('Careplan updated successfully!');
            setErrorMessage('');

            // Navigate back to the View Care Plans page after a short delay
            setTimeout(() => {
                navigate('/viewcareplan');
            }, 1500); // 1.5 seconds delay to show the success message
        } catch (error) {
            setErrorMessage('Failed to update careplan. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Dashboard />

            {/* Main Content */}
            <div className="flex w-4/5 p-8 bg-gray-100 min-h-screen">
                <div className="max-w-3xl w-full mx-auto py-5 px-8 bg-[#d7daf3] rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Update Care Plan</h2>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
                        </div>
                    ) : (
                        <>
                            {successMessage && (
                                <p className="text-green-600 text-center font-semibold mb-4">{successMessage}</p>
                            )}
                            {errorMessage && (
                                <p className="text-red-600 text-center font-semibold mb-4">{errorMessage}</p>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Elder Name:</label>
                                    <input
                                        type="text"
                                        name="elderName"
                                        value={formData.elderName}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description:</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        rows="4"
                                    ></textarea>
                                </div>

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        Update Care Plan
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdateCareplan;
