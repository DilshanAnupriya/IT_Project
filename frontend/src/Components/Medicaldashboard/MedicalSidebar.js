import React, { useState, useEffect } from 'react';
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaTasks, FaUser, FaSearch } from "react-icons/fa";
import { RiCalendarScheduleFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { Link } from 'react-router-dom';
import "../../Pages/Css/ComponentsCss/MedicalDashboard/MedDash.css";
import logo from "../../Assets/logo.png";

function New_Dashboard() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [marginLeft, setMarginLeft] = useState(350);
    const [sidebarVisible, setSidebarVisible] = useState(true);

    useEffect(() => {
        setMarginLeft(sidebarVisible ? 350 : 50);
    }, [sidebarVisible]);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div className="m-0 z-10 font-sans text-base antialiased font-normal dark:bg-slate-900 leading-default bg-gray-50 text-slate-500">
            <div className="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>
            <div className="d">
                <div className="d2" style={{ marginLeft: `${marginLeft}px` }}>
                    <h1>Hello, Sachintha</h1>
                    <h5>Today is #date</h5>
                </div>
            </div>
            <div className='d3'>
                <div className='d5'>
                    <FaSearch />
                </div>
                <input type='search' placeholder='Search..' />
                <div className='menu001' onClick={toggleSidebar}>
                    <TiThMenu />
                </div>
                <div className='notify'>
                    <Link to="/"> <IoNotifications /></Link>
                </div>
                <div className="relative">
                    <img
                        src={logo}
                        alt=''
                        onClick={toggleDropdown}
                        className="cursor-pointer"
                    />
                    {dropdownVisible && (
                        <div className="absolute right-0 mt-4 w-48 bg-white rounded-md shadow-lg z-10">
                            <ul>
                                <Link to="/"> <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li></Link>
                                <Link to="/"> <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li></Link>
                                <Link to="/"> <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Log Out</li></Link>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <aside className={`fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'} bg-[#6B75FE] border-0 shadow-xl dark:shadow-none dark:bg-slate-850 max-w-64 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0`}>
                <div className="h-19">
                    <i className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times dark:text-white text-slate-400 xl:hidden" sidenav-close></i>
                    <Link to="/" className="block px-8 py-6 m-0 text-sm whitespace-nowrap dark:text-black text-slate-700" target="_blank">
                        <img src={logo} className="hidden h-full max-w-full transition-all duration-200 dark:inline ease-nav-brand max-h-8" alt="main_logo" />
                        <span className="head ml-6 font-semibold transition-all duration-200 ease-nav-brand">Care Zone</span>
                    </Link>
                </div>

                <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />

                <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
                    <ul className="titles flex flex-col pl-0 mb-0">
                        <li className="mt-0.5 w-full">
                            <Link to="/medDash" className="py-2.7 bg-blue-500/13 dark:text-black dark:opacity-80 text-sm my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 hover:text-[#6B75FE]">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                    <MdDashboard className="relative top-0 text-sm leading-normal text-blue-500" />
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
                                    <div className='icons'>
                                        Dashboard
                                    </div>
                                </span>
                            </Link>
                        </li>

                        <li className="mt-0.5 w-full">
                            <Link to="/patientList" className="dark:text-black dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 hover:text-[#6B75FE]">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                    <FaTasks className="relative top-0 text-sm leading-normal text-orange-500" />
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
                                    <div className='icons'>
                                        Patient profile
                                    </div>
                                </span>
                            </Link>
                        </li>

                        <li className="mt-0.5 w-full">
                            <Link to="/nutritionList" className="dark:text-black dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors hover:text-[#6B75FE]">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center fill-current stroke-0 text-center xl:p-2.5">
                                    <RiCalendarScheduleFill className="relative top-0 text-sm leading-normal text-emerald-500" />
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
                                    <div className='icons'>
                                        Nutrition
                                    </div>
                                </span>
                            </Link>
                        </li>

                        <li className="mt-0.5 w-full">
                            <Link to="/meduserreqDisplay" className="dark:text-black dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors hover:text-[#6B75FE]">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                    <RiMoneyDollarCircleFill className="relative top-0 text-sm leading-normal text-cyan-500" />
                                </div>
                                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
                                    <div className='icons'>
                                        Report requests
                                    </div>
                                </span>
                            </Link>
                        </li>

                        <li className="w-full mt-4">
                            <h6 className="pl-6 ml-2 text-xs font-bold leading-tight uppercase dark:text-black opacity-60">Account pages</h6>
                        </li>

                      

                        <li className="mt-0.5 w-full">
                            <Link to="/" className="dark:text-black dark:opacity-80 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors hover:text-[#6B75FE]">
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                    <MdLogout className="relative top-0 text-sm leading-normal text-cyan-500" />
                                </div>
                                <span className="ml-1 pointer-events-none ease">
                                    <div className='icons'>
                                        Log Out
                                    </div>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export default New_Dashboard;