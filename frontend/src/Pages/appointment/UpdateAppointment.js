import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Dashboard from '../../Components/Dashboard/Dashboard';

const UpdateAppointment = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        gmail: '',
        phone: '',
        description: '',
        appointmenttype: 'Online', // Default value
        date: '',

    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/appointments/getApp/${id}`);
                setFormData(response.data);
            } catch (error) {
                setErrorMessage('Failed to load appointment data.');
            }
        };
        fetchAppointment();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/appointments/updateApp/${id}`, formData);
            setSuccessMessage('Appointment updated successfully!');
            setErrorMessage('');
            setTimeout(() => {
                navigate('/viewappoinment'); // Redirect to view appointments page
            }, 1500);
        } catch (error) {
            setErrorMessage('Failed to update appointment. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 w-full">
            <Dashboard />

            <div className="flex flex-col w-4/5 p-5 bg-gray-100">
                <div className="flex justify-center items-center">
                    <div className="max-w-3xl w-full py-5 px-8 bg-[#d7daf3] rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Update Appointment</h2>

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
                                    Update Appointment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateAppointment;
