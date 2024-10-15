import React, { useState, useEffect, useRef } from 'react';
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaTasks, FaUser, FaSearch } from "react-icons/fa";
import { RiCalendarScheduleFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { Link } from 'react-router-dom';
import logo from "../../Assets/logo.png";

import Dashboard from '../Dashboard/Dashboard';
import Profile from '../../Components/Naveen/Profile/Profile';
import Clubs from '../../Components/Naveen/Clubs/Clubs';
import Funds from '../../Components/Naveen/Funds/Funds';
import Expenditure from '../Naveen/Expenditures/Expenditures';
import FinancialReport from '../Naveen/FinancialReport/FinancialReport';
import { FaPeopleGroup } from 'react-icons/fa6';
import "../../Components/NDash/ND.css"


const NDashboard = () => {


    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [currentView, setCurrentView] = useState('dashboard'); // State to control which component to display
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

    const handleDashboardClick = () => setCurrentView('dashboard');
    const handleProfileClick = () => setCurrentView('profile');
    const handleClubsClick = () => setCurrentView('clubs');
    const handleFundsClick = () => setCurrentView('funds');
    const handleExpenditureClick = () => setCurrentView('expenditure');
    const handleFinancialClick = () => setCurrentView('financial');

    const renderContent = () => {
        switch (currentView) {
            case 'clubs': return <Clubs />;
            case 'profile': return <Profile />;
            case 'funds': return <Funds />;
            case 'expenditure': return <Expenditure />;
            case 'financial': return <FinancialReport />;
            case 'dashboard':
            default: return <Dashboard />;
        }
    };

    return (
        <div className='nd'>
            <button onClick={toggleSidebar} className="p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100">
                <TiThMenu className="text-lg" />
            </button>

            <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarVisible ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`} aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center mb-5">
                        <img src={logo} alt="Logo" className="h-6 mr-3 sm:h-7" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Care Zone</span>
                    </div>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link onClick={handleDashboardClick} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                                <MdDashboard className="w-5 h-5 text-gray-500" />
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleProfileClick} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                                <FaUser className="w-5 h-5 text-gray-500" />
                                <span className="ml-3">Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleClubsClick} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                                <FaTasks className="w-5 h-5 text-gray-500" />
                                <span className="ml-3">Clubs</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleFundsClick} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                                <RiMoneyDollarCircleFill className="w-5 h-5 text-gray-500" />
                                <span className="ml-3">Funds</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleExpenditureClick} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                                <FaPeopleGroup className="w-5 h-5 text-gray-500" />
                                <span className="ml-3">Expenditure</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleFinancialClick} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                                <RiCalendarScheduleFill className="w-5 h-5 text-gray-500" />
                                <span className="ml-3">Financial Report</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                                <MdLogout className="w-5 h-5 text-gray-500" />
                                <span className="ml-3">Log Out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            <main className={`${sidebarVisible ? "ml-64" : "ml-0"} p-4`}>
                {renderContent()}
            </main>
        </div>
    );
}

export default Dashboard;