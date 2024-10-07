import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../Assets/logo.png";

const Dashboard = () => {
    return (
        <div className="navigation w-1/5 bg-[#9ba4bf] text-black h-screen shadow-lg">
            <ul className="p-4 space-y-6">
                <li className="flex items-center mb-10">
                    <img src={logo} alt="logo" className="w-14 h-14" />
                    <span className="ml-3 text-2xl font-semibold">Care Zone</span>
                </li>
                <li>
                    <Link to="/viewappoinment" className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-all duration-200">
                        <i className="fa fa-home fa-lg" aria-hidden="true"></i>
                        <span className="text-lg">Appoinment</span>
                    </Link>
                </li>
                <li>
                    <Link to="/userview" className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-all duration-200">
                        <i className="fa fa-user fa-lg" aria-hidden="true"></i>
                        <span className="text-lg">Users</span>
                    </Link>
                </li>
                <li>
                    <Link to="/viewcareplan" className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-all duration-200">
                        <i className="fa fa-desktop fa-lg" aria-hidden="true"></i>
                        <span className="text-lg">Care Plan</span>
                    </Link>
                </li>
                <li>
                    <Link to="/settings" className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-all duration-200">
                        <i className="fa fa-cog fa-lg" aria-hidden="true"></i>
                        <span className="text-lg">Settings</span>
                    </Link>
                </li>
                <li>
                    <Link to="/logout" className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-all duration-200">
                        <i className="fa fa-sign-out-alt fa-lg" aria-hidden="true"></i>
                        <span className="text-lg">Log Out</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Dashboard;
