import React, { useState, useEffect, useRef } from 'react';
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaTasks, FaUser, FaSearch } from "react-icons/fa";
import { RiCalendarScheduleFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { Link } from 'react-router-dom';
import logo from "../../Assets/logo.png";
import "../../Pages/Css/ComponentsCss/New_Dashboard/Dash.css";
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';

function New_Dashboard() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [showProfile, setShowProfile] = useState(false); // State to control profile visibility
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleProfileClick = () => {
        setShowProfile(!showProfile); // Toggle profile display
    };

    return (
        <div className="new-dashboard-container flex">
            {/* Sidebar Section */}
            <aside className={`sidebar transition-transform duration-300 ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'} bg-white shadow-lg w-64 min-h-screen`}>
                <div className="sidebar-header p-4 flex items-center justify-between bg-blue-500">
                    <img src={logo} alt="Care Zone Logo" className="h-8" />
                    <span className="ml-3 text-white text-lg font-semibold">Care Zone</span>
                    <button className="ml-auto" onClick={toggleSidebar}>
                        <TiThMenu className="text-white text-2xl" />
                    </button>
                </div>
                <ul className="menu-list p-4">
                    <li>
                        <Link to="/NewDash" className="menu-item flex items-center py-3 hover:bg-blue-100 rounded-lg">
                            <MdDashboard className="mr-3 text-blue-500" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/clubs" className="menu-item flex items-center py-3 hover:bg-blue-100 rounded-lg">
                            <FaTasks className="mr-3 text-blue-500" />
                            <span>Clubs and Society</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/salary" className="menu-item flex items-center py-3 hover:bg-blue-100 rounded-lg">
                            <FaTasks className="mr-3 text-blue-500" />
                            <span>Salary Allocation</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/funds" className="menu-item flex items-center py-3 hover:bg-blue-100 rounded-lg">
                            <RiCalendarScheduleFill className="mr-3 text-blue-500" />
                            <span>Funds Management</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/financial-reports" className="menu-item flex items-center py-3 hover:bg-blue-100 rounded-lg">
                            <RiMoneyDollarCircleFill className="mr-3 text-blue-500" />
                            <span>Financial Reports</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleProfileClick} className="menu-item flex items-center py-3 hover:bg-blue-100 rounded-lg">
                            <FaUser className="mr-3 text-blue-500" />
                            <span>Profile</span>
                        </button>
                    </li>
                    <li>
                        <Link to="/logout" className="menu-item flex items-center py-3 hover:bg-blue-100 rounded-lg">
                            <MdLogout className="mr-3 text-blue-500" />
                            <span>Log Out</span>
                        </Link>
                    </li>
                </ul>
            </aside>

            {/* Main Content Section */}
            <div className="main-content flex-grow p-6">
                <div className="top-bar flex justify-between items-center mb-6">
                    <div className="search-bar flex items-center">
                        <FaSearch className="text-gray-500 mr-2" />
                        <input type="search" placeholder="Search..." className="p-2 border rounded-lg" />
                    </div>
                    <div className="actions flex items-center">
                        <IoNotifications className="text-2xl mr-4 text-gray-600" />
                        <div className="relative" ref={dropdownRef}>
                            <img
                                src={logo}
                                alt='User avatar'
                                onClick={toggleDropdown}
                                className="cursor-pointer rounded-full w-10 h-10"
                            />
                            {dropdownVisible && (
                                <div className="absolute right-0 mt-4 w-48 bg-white rounded-md shadow-lg z-10">
                                    <ul>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleProfileClick}>Profile</li>
                                        <Link to="/settings">
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                                        </Link>
                                        <Link to="/logout">
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Log Out</li>
                                        </Link>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Table or Content */}
                <div className="content-container">
                    {showProfile ? <Profile /> : <Dashboard />}
                </div>
            </div>
        </div>
    );
}

export default New_Dashboard;
