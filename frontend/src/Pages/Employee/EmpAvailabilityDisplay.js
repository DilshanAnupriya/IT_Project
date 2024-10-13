import React, { useEffect, useState } from 'react';
import EmployeeDash from "../../Components/EmployeeDash/EmployeeDashboard";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const URL = "http://localhost:3000/Availability/";

const fetchHandler = async () => {
    const data = await axios.get(URL).then((res) => res.data.avl);
    return data;
};

const deleteHandler = async (id) => {
    await axios.delete(`http://localhost:3000/Availability/delete/${id}`);
};

function EmpAvailabilityDisplay() {
    const [availabilities, setAvailabilities] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [daysInMonth, setDaysInMonth] = useState([]);
    const navigate = useNavigate();

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        fetchHandler().then((data) => {
            if (Array.isArray(data)) {
                setAvailabilities(data);
            } else {
                console.error('Unexpected response data:', data);
            }
        });
    }, []);

    useEffect(() => {
        const getDaysInMonth = (month, year) => {
            const date = new Date(year, month, 1);
            const days = [];
            while (date.getMonth() === month) {
                days.push(new Date(date));
                date.setDate(date.getDate() + 1);
            }
            return days;
        };
        setDaysInMonth(getDaysInMonth(month, year));
    }, [month, year]);

    const filteredAvailabilities = availabilities.filter((availability) =>
        availability.emp_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const dateFilteredAvailabilities = selectedDate
        ? filteredAvailabilities.filter((availability) =>
            new Date(availability.schedule_date).toDateString() === selectedDate.toDateString()
        )
        : filteredAvailabilities;

    const handleDelete = (id) => {
        deleteHandler(id).then(() => {
            setAvailabilities(availabilities.filter((availability) => availability._id !== id));
        });
    };

    const prevMonth = () => {
        setMonth(month === 0 ? 11 : month - 1);
        setYear(month === 0 ? year - 1 : year);
    };

    const nextMonth = () => {
        setMonth(month === 11 ? 0 : month + 1);
        setYear(month === 11 ? year + 1 : year);
    };

    const handleDayClick = (day) => {
        setSelectedDate(day);
    };

    const renderDays = () => {
        return daysInMonth.map((day) => {
            const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
            const hasAvailability = availabilities.some(
                (availability) => new Date(availability.schedule_date).toDateString() === day.toDateString()
            );
            const hasSearchedAvailability = filteredAvailabilities.some(
                (availability) => new Date(availability.schedule_date).toDateString() === day.toDateString()
            );
            return (
                <div
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={`p-2 border cursor-pointer ${isSelected ? 'bg-blue-200' : ''} ${hasAvailability ? 'bg-green-200' : ''} ${hasSearchedAvailability ? 'bg-yellow-200' : ''}`}
                >
                    {day.getDate()}
                </div>
            );
        });
    };

    const generateReport = () => {
        const doc = new jsPDF();
        doc.text("Employee Availability Report", 14, 16);
        doc.autoTable({
            head: [['Employee Name', 'Schedule Date', 'Start Time', 'End Time']],
            body: dateFilteredAvailabilities.map(availability => [
                availability.emp_name,
                new Date(availability.schedule_date).toLocaleDateString(),
                availability.schedule_start_time,
                availability.schedule_end_time
            ]),
        });
        doc.save('availability_report.pdf');
    };

    return (
        <div className="flex h-screen">
            <EmployeeDash className="w-1/4" />
            <div className="container mx-auto mt-10 ml-72">
                <h2 className="text-3xl font-bold mb-6">Employee Availability</h2>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <section className="mb-4">
                        <div className="relative mb-4">
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
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
                        <button
                            className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                            onClick={() => navigate('/empAvalForm')}
                            style={{ marginLeft: 'auto' }}
                        >
                            Add Availability
                        </button>
                    </div>

                    <div className="flex justify-between mb-4">
                        <button onClick={prevMonth} className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600">
                            Previous
                        </button>
                        <h3 className="text-lg font-bold">
                            {months[month]} {year}
                        </h3>
                        <button onClick={nextMonth} className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600">
                            Next
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-4">
                        {renderDays()}
                    </div>

                    <section className="overflow-x-auto overflow-y-auto max-h-[500px]">
                        <table className="min-w-full bg-white border border-gray-300 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    {["Employee Name", "Schedule Date", "Start Time", "End Time", "Action"].map((header) => (
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
                                {dateFilteredAvailabilities.map((availability) => (
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

                    <div className="mt-4">
                        <button
                            onClick={generateReport}
                            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                        >
                            Generate Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmpAvailabilityDisplay;