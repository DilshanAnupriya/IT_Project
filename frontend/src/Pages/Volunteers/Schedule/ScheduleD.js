import React, { useEffect, useState, useRef } from 'react';
import Dash from "../../../Components/new_Dashboard/New_Dashboard";
import "../../Css/Volunteers/Schedule/ScheduleD.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { FaDownload } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { useReactToPrint } from "react-to-print";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
const URL = "http://localhost:3000/schedule/";

const fetchHandler = async () => {
    const data = await axios.get(URL).then((res) => res.data);
    return data;
};

function ScheduleD() {
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [input, setInputs] = useState({ event_name: "", S_time: "", E_time: "", date: "" });
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        fetchHandler().then((data) => setSchedule(data.schedule));
    }, []);

    const filteredSchedule = schedule.filter(event => new Date(event.date).toDateString() === selectedDate.toDateString());

    const deleteSchedule = async (id) => {
        const deleteSchedule = window.confirm(`Are you sure you want to delete the Task with ID ${id}? This action cannot be undone.`);
        if (deleteSchedule) {
            try {
                await axios.delete(`http://localhost:3000/schedule/delete/${id}`);
                setSchedule(schedule.filter((schedule) => schedule._id !== id));
            } catch (error) {
                toast.error('Failed to delete Task. Please try again.');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let errorMessages = { ...errors };
        if (name === "event_name") {
            if (!/^[a-zA-Z\s]{3,20}$/.test(value)) {
                errorMessages[name] = "Event name must be 3-20 characters long and contain only letters.";
                toast.error(errorMessages[name]);
            } else {
                delete errorMessages[name];
            }
        }
        setErrors(errorMessages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            await sendRequest();
            setShowModal(false);
            setInputs({ event_name: "", S_time: "", E_time: "", date: "" });
            fetchHandler().then((data) => setSchedule(data.schedule));
        } else {
            toast.error("Please fix the validation errors.");
        }
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:3000/schedule/add", {
            event_name: String(input.event_name),
            S_time: String(input.S_time),
            E_time: String(input.E_time),
            date: selectedDate,
        }).then(res => res.data);
    };

    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [daysInMonth, setDaysInMonth] = useState([]);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getDaysInMonth = (month, year) => {
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const prevMonthDays = new Date(year, month, 0).getDate();
        const nextDays = (7 - (firstDay + days) % 7) % 7;
        let dayArr = [];

        for (let i = firstDay; i > 0; i--) {
            dayArr.push({ day: prevMonthDays - i + 1, prevMonth: true });
        }

        for (let i = 1; i <= days; i++) {
            dayArr.push({ day: i, prevMonth: false });
        }

        for (let i = 1; i <= nextDays; i++) {
            dayArr.push({ day: i, nextMonth: true });
        }

        return dayArr;
    };

    useEffect(() => {
        setDaysInMonth(getDaysInMonth(month, year));
    }, [month, year]);

    const prevMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const nextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    const handleDayClick = (day) => {
        const newDate = new Date(year, month, day);
        setSelectedDate(newDate);
    };

    const renderDays = () => {
        return daysInMonth.map((dayObj, index) => {
            const { day, prevMonth, nextMonth } = dayObj;
            let className = "day";
            if (prevMonth || nextMonth) className += " prev-next-date";
            if (new Date(year, month, day).toDateString() === selectedDate.toDateString()) className += " active";

            return (
                <div
                    key={index}
                    className={className}
                    onClick={() => !prevMonth && !nextMonth && handleDayClick(day)}
                >
                    {day}
                </div>
            );
        });
    };

    const isPastDate = selectedDate < new Date(new Date().setHours(0, 0, 0, 0));

    const handleAddEventClick = () => {
        if (isPastDate) {
            toast.error("You cannot create a new event for previous dates.");
        } else {
            setShowModal(true);
        }
    };

    const ComponentsRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        onBeforeGetContent: () => {
            document.title = "Schedule";
            return Promise.resolve();
        },
    });

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            fetchHandler().then((data) => setSchedule(data.schedule));
            setNoResults(false);
            return;
        }

        fetchHandler().then((data) => {
            const filterSchedule = data.schedule.filter((schedule) => {
                const eventName = schedule.event_name ? schedule.event_name.toLowerCase() : "";
                const S_time = schedule.S_time ? schedule.S_time.toLowerCase() : "";
                const E_time = schedule.E_time ? schedule.E_time.toLowerCase() : "";
                const date = schedule.date ? schedule.date.toLowerCase() : "";

                return (
                    eventName.includes(searchQuery.toLowerCase()) ||
                    S_time.includes(searchQuery.toLowerCase()) ||
                    E_time.includes(searchQuery.toLowerCase()) ||
                    date.includes(searchQuery.toLowerCase())
                );
            });

            setSchedule(filterSchedule);
            setNoResults(filterSchedule.length === 0);
        });
    };

    // Function to generate report
    const generateReport = () => {
        const doc = new jsPDF();

        // Add title with styles
        doc.setFontSize(18);
        doc.setFont("Helvetica", "bold");
        doc.text("Schedule Report", 14, 22);

        // Add a horizontal line with left margin
        const lineLeftMargin = 15;
        doc.setLineWidth(0.5);
        doc.setDrawColor(0, 51, 102);
        doc.line(lineLeftMargin, 40, 200, 40);

        // Add table
        autoTable(doc, {
            head: [["Event Name", "Start Time", "End Time", "Date"]],
            body: schedule.map((event) => [
                event.event_name,
                event.S_time,
                event.E_time,
                new Date(event.date).toLocaleDateString(),
            ]),
            startY: 45, // Start after the title and line
        });

        // Add footer with correct date
        const footerY = doc.autoTable.previous.finalY + 20;
        doc.setFontSize(10);
        doc.setFont("Helvetica", "normal");
        const formattedDate = new Date().toLocaleDateString();
        doc.text("Generated on: " + formattedDate, 14, footerY);

        // Save the PDF
        doc.save("schedule_report.pdf");
        toast.success("Report generated successfully!");
    };





    return (
        <div>
            <Dash />
            <ToastContainer />
            <div className='div1100'>
                <div className="container1100">
                    <div className="left">
                        <div className="calendar">
                            <div className="month">
                                <div className="prev" onClick={prevMonth}><FaAngleLeft /></div>
                                <div className="date">{`${months[month]} ${year}`}</div>
                                <div className="next" onClick={nextMonth}><FaAngleRight /></div>
                            </div>
                            <div className="weekdays">
                                <div>Sun</div>
                                <div>Mon</div>
                                <div>Tue</div>
                                <div>Wed</div>
                                <div>Thu</div>
                                <div>Fri</div>
                                <div>Sat</div>
                            </div>
                            <div className="days">
                                {renderDays()}
                            </div>
                        </div>
                    </div>

                    <div className="right" ref={ComponentsRef}>

                        <div className="today-date">
                            <div className="event-day">{selectedDate.toLocaleString('en-US', { weekday: 'short' })}</div>
                            <div className="event-date">{selectedDate.getDate()} {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}</div>
                        </div>
                        <div>
                            <h1>
                                <div className="dt1100">
                                    {/* Search Input */}
                                    <div className="search-bar1100">
                                        <input
                                            type="text"
                                            className="search-input1100"
                                            placeholder="Search Schedule..."
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSearch();  // Trigger search on Enter key press
                                                }
                                            }}

                                        />
                                        <button className="search-btn1100"></button>
                                    </div>
                                    <div className="dt1102">
                                        <button className="dt1105" onClick={handleSearch}><ImSearch /></button>
                                        <button className="dt1101" onClick={generateReport}><FaDownload /></button>

                                    </div>
                                </div>
                            </h1>
                        </div>
                        <div className="events"></div>
                        {/* Check if there are events for the selected date */}
                        {filteredSchedule.length === 0 ? (
                            <p className="no-events-message">No events scheduled for this day.</p>
                        ) : (
                            <ul className="div1110 flex flex-col pl-0 mb-0 rounded-lg">
                                {filteredSchedule.map((schedule) => (
                                    <li key={schedule._id} className="box1100 relative flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50 dark:bg-slate-850">
                                        <div className="flex flex-col">
                                            <h6 className="mb-1 text-sm leading-normal dark:text-black"></h6>
                                            <span className="mb-2 text-xs leading-tight dark:text-black/80">
                                                Event Name: <span className="font-semibold text-slate-700 dark:text-black sm:ml-2">{schedule.event_name}</span>
                                            </span>
                                            <span className="mb-2 text-xs leading-tight dark:text-black/80">
                                                Start Time: <span className="font-semibold text-slate-700 dark:text-black sm:ml-2">{schedule.S_time}</span>
                                            </span>
                                            <span className="mb-2 text-xs leading-tight dark:text-black/80">
                                                End Time: <span className="font-semibold text-slate-700 dark:text-black sm:ml-2">{schedule.E_time}</span>
                                            </span>
                                        </div>

                                        <div className="div1111 ml-auto text-right">
                                            <button className='btn1000' onClick={() => deleteSchedule(schedule._id)} ><div className="icn1000" ><MdDelete /></div>Delete</button>
                                            <Link to={`/ScheduleUpdate/${schedule._id}`}> <button className='btn1001' ><div className='icn1001'><MdModeEdit /></div>Edit</button></Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button className="add-event" onClick={handleAddEventClick}>
                        <div className="fas fa-plus"><IoMdAdd /></div>
                    </button>
                </div>
            </div>

            {/* Modal Popup for Adding Event */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content animate">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2 className='data1100'>Add Event for {`${selectedDate.getDate()} ${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Event Name</label>
                                <input
                                    className='input1100'
                                    type="text"
                                    onChange={handleChange}
                                    value={input.event_name}
                                    name='event_name'
                                    placeholder="Event Name"
                                    required
                                />
                                {errors.event_name && <p className="error">{errors.event_name}</p>}
                            </div>
                            <div className="form-group">
                                <label>Event Start Time</label>
                                <input
                                    type="text"
                                    placeholder='Start Time'
                                    value={input.S_time}
                                    onChange={handleChange}
                                    name='S_time'
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Event End Time</label>
                                <input
                                    type="text"
                                    placeholder='End Time'
                                    value={input.E_time}
                                    onChange={handleChange}
                                    name='E_time'
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-btn1100">Add Event</button>
                        </form>
                    </div>
                </div>
            )}


        </div>
    );
}

export default ScheduleD;
