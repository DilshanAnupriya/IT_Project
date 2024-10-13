import React, { useEffect, useState } from 'react';
import EmployeeDash from "../../Components/EmployeeDash/EmployeeDashboard";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const URL = "http://localhost:3000/Availability/";

const fetchHandler = async () => {
    const data = await axios.get(URL).then((res) => res.data.avl); // Ensure to access the 'avl' property
    return data;
};

const deleteHandler = async (id) => {
    await axios.delete(`http://localhost:3000/Availability/delete/${id}`);
};

function EmpAvailabilityDisplay() {
    const [availabilities, setAvailabilities] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State to track search input
    const navigate = useNavigate();

    useEffect(() => {
        fetchHandler().then((data) => {
            if (Array.isArray(data)) {
                setAvailabilities(data);
            } else {
                console.error('Unexpected response data:', data);
            }
        });
    }, []);

    // Filter availabilities based on search term (by employee name only)
    const filteredAvailabilities = Array.isArray(availabilities) ? availabilities.filter((availability) =>
        availability.emp_name && availability.emp_name.toLowerCase().includes(searchTerm.toLowerCase()) // Check if 'emp_name' exists before using it
    ) : [];

    const handleDelete = (id) => {
        deleteHandler(id).then(() => {
            setAvailabilities(availabilities.filter((availability) => availability._id !== id));
        });
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <EmployeeDash className="w-1/4" />

            {/* Main Content */}
            <div className="container mx-auto mt-10 ml-72">
                <h2 className="text-3xl font-bold mb-6">Employee Availability</h2>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <section className="mb-4">
                        <div className="relative mb-4">
                            {/* Search Bar */}
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
                                className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Search by Employee Name..."
                            />
                            <span className="absolute left-2 top-2 text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zm8 14l-4-4m0 0l-4 4m4-4V6"
                                    />
                                </svg>
                            </span>
                        </div>
                    </section>

                    <div className="mb-4">
                        {/* Add Availability Button */}
                        <button
                            className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                            onClick={() => navigate('/empAvalForm')}
                            style={{ marginLeft: 'auto' }}
                        >
                            Add Availability
                        </button>
                    </div>

                    {/* Scrollable Table */}
                    <section className="overflow-x-auto overflow-y-auto max-h-[500px]">
                        <table className="min-w-full bg-white border border-gray-300 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    {[
                                        "Employee Name",
                                        "Schedule Date",
                                        "Start Time",
                                        "End Time",
                                        "Action",
                                    ].map((header) => (
                                        <th
                                            key={header}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAvailabilities.map((availability) => (
                                    <tr key={availability._id} className="odd:bg-white even:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {availability.emp_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {new Date(availability.schedule_date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {availability.schedule_start_time}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {availability.schedule_end_time}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            <div className="flex space-x-2">
                                                <Link to={`/edit-availability/${availability._id}`}>
                                                    <button className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600">
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(availability._id)}
                                                    className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600">
                                                    Del
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default EmpAvailabilityDisplay;