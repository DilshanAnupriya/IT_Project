import React, { useEffect, useState } from 'react';
import EmployeeDash from "../../Components/EmployeeDash/EmployeeDash";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const URL = "http://localhost:3000/requests/";

const fetchHandler = async () => {
    const data = await axios.get(URL).then((res) => res.data);
   
    return data;
};

const deleteHandler = async (id) => {
    await axios.delete(`http://localhost:3000/requests/delete/${id}`);
};

function Recruitments() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State to track search input
    const navigate = useNavigate();

    useEffect(() => {
        fetchHandler().then((data) => setUsers(data.requ));
   
    }, []);

    // Filter users based on search term (by name only)
    const filteredUsers = users.filter((user) =>
        user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()) // Check if 'name' exists before using it
    );

    const handleDelete = (id) => {
        deleteHandler(id).then(() => {
            setUsers(users.filter((user) => user._id !== id));
        });
    };

    // Generate PDF report
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Recruitment Report", 14, 16);
        doc.autoTable({
            head: [['Name', 'Email', 'Phone No', 'Gender', 'Education Qualification', 'Experience', 'Computer Literacy', 'English Skill']],
            body: filteredUsers.map(user => [
                user.name,
                user.email,
                user.phone_no,
                user.gender,
                user.edu_qualifications,
                user.experience,
                user.computerLiteracy,
                user.englishSkills
            ]),
        });
        doc.save("recruitment_report.pdf");
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <EmployeeDash className="w-1/4" />

            {/* Main Content */}
            <div className="container mx-auto mt-10 ml-72">
                <h2 className="text-3xl font-bold mb-6">Employee Request Details</h2>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <section className="mb-4">
                        <div className="relative mb-4">
                            {/* Search Bar */}
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
                                className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Search by Name..."
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
                        {/* Generate Report Button */}
                        <button
                            className="px-2 py-1 text-xs text-white bg-green-500 rounded hover:bg-green-600"
                            onClick={generatePDF}
                            style={{ marginLeft: 'auto' }}
                        >
                            Generate Report
                        </button>
                    </div>

                    {/* Scrollable Table */}
                    <section className="overflow-x-auto overflow-y-auto max-h-[500px]">
                        <table className="min-w-full bg-white border border-gray-300 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    {[
                                        "Name",
                                        "Email",
                                        "Phone no",
                                        "Gender",
                                        "Education Qualification",
                                        "Experience",
                                        "Computer Literacy",
                                        "English Skill",
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
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="odd:bg-white even:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {user.phone_no}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {user.gender}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {user.edu_qualifications}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {user.experience}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {user.computerLiteracy}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {user.englishSkills}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            <div className="flex space-x-2">
                                            <Link to={`/UpdateRecruitment/${user._id}`}>
                                                    <button className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600">
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(user._id)}
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

export default Recruitments;
