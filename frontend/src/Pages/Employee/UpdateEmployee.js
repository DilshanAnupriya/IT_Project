import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData); // Debugging log
        try {
            const response = await axios.put(`http://localhost:3000/employees/update/${id}`, formData);
            console.log('Update response:', response); // Debugging log
            navigate('/EmpDash'); // Navigate back to employee dashboard
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6">Update Employee</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {/* First Name Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* Last Name Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* Job Role Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Job Role:</label>
                    <input
                        type="text"
                        name="job_role"
                        value={formData.job_role}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* NIC Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">NIC:</label>
                    <input
                        type="text"
                        name="nic"
                        value={formData.nic}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* Email Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* Qualifications Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Qualifications:</label>
                    <input
                        type="text"
                        name="qualifications"
                        value={formData.qualifications}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* Bank Details Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Bank Details:</label>
                    <input
                        type="text"
                        name="bank_details"
                        value={formData.bank_details}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* Join Date Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Join Date:</label>
                    <input
                        type="date"
                        name="joined_date"
                        value={formData.joined_date}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update Employee
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateEmployee;
