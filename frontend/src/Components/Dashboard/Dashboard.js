import React from 'react'
import "../../Pages/Css/ComponentsCss/Dashboard/Dashboard.css"
import logo from "../../Assets/logo.png"
import { Link } from 'react-router-dom'
function Dashboard() {




    return (
        <div>
            <div className="container11">
                <div className="navigation2">
                    <ul>
                        <li>
                            <Link to="/mainHome">
                                <span className="logo">
                                    <img src={logo} alt='logo' />
                                </span>
                                <span className="title5">Care Zone</span>
                            </Link>
                        </li>



                        <li>
                            <Link to="/volunteer_pd">
                                <span className="icon">
                                    <i className="fa fa-user fa-2x" aria-hidden="true"></i>
                                </span>
                                <span className="title">Profile</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/volunteer_schedule">
                                <span className="icon">
                                    <i className="fa fa-desktop fa-2x" aria-hidden="true"></i>
                                </span>
                                <span className="title">Schedule</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <span className="icon">
                                    <i className="fa fa-desktop fa-2x" aria-hidden="true"></i>
                                </span>
                                <span className="title">Settings</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <span className="icon">
                                    <i className="fa fa-desktop fa-2x" aria-hidden="true"></i>
                                </span>
                                <span className="title">Log Out</span>
                            </Link>
                        </li>


                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dashboard