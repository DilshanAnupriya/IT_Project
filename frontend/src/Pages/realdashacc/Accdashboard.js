import React from 'react';
import rd from "../../Pages/realdashacc/Accdashboard"
import logo from "../../Assets/logo.png"
import { Link } from 'react-router-dom'
import Nav from "../../Components/Navbar/Navbar"
import Footer from '../../Components/Footer/Footer'


function Dashboard() {
    return (
        
                <div className="container">
                    <Nav/>
                    <aside className="sidebar">
                        <div className="user-info">
                            <h2>Hello, Naveen</h2>
                            <p>Today is #day, #Month #no, 2024</p>
                        </div>
                        <ul className="menu">
                            <li><img src="home_icon.png" alt="Home Icon" /></li>
                            <li><img src="reports_icon.png" alt="Reports Icon" /></li>
                            <li><img src="alerts_icon.png" alt="Alerts Icon" /></li>
                            <li><img src="settings_icon.png" alt="Settings Icon" /></li>
                        </ul>
                    </aside>

                    <div className="main-content">
                        <header className="header">
                            <input type="text" placeholder="Search" />
                            <div className="profile">
                                <span>Naveen Gunasekara</span>
                                <img src="profile_pic.png" alt="Profile Picture" />
                            </div>
                        </header>

                        <div className="content">
                            <section className="financial-reports">
                                <h3>Financial Reports</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Report Type</th>
                                            <th>Last Update Date and Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>All Expenses & Payments</td>
                                            <td>25.05.2024 13:46</td>
                                        </tr>
                                        <tr>
                                            <td>Salary Allocations</td>
                                            <td>14.05.2024 13:30</td>
                                        </tr>
                                        <tr>
                                            <td>Funds</td>
                                            <td>05.06.2024 15:30</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>

                            <section className="bank-updates">
                                <h3>Bank Accounts Updates</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Bank</th>
                                            <th>Acc. No.</th>
                                            <th>Branch</th>
                                            <th>Current Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>BOC</td>
                                            <td>173645011</td>
                                            <td>Homagama</td>
                                            <td>100,000.00</td>
                                        </tr>
                                        <tr>
                                            <td>Sampath</td>
                                            <td>200764522</td>
                                            <td>Kollupitiya</td>
                                            <td>75,000.00</td>
                                        </tr>
                                        <tr>
                                            <td>HNB</td>
                                            <td>2001423892</td>
                                            <td>Pettah</td>
                                            <td>65,000.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="bank-chart">
                                    <img src="bank_chart.png" alt="Bank Chart" />
                                </div>
                                <div className="account-actions">
                                    <button>Add New Account</button>
                                    <button>Delete Account</button>
                                </div>
                            </section>

                            <section className="alerts">
                                <h3>Financial Alerts</h3>
                                <ul>
                                    <li>Admin: I'll fix your error soon...</li>
                                    <li>vol001: I have some problems...</li>
                                    <li>emp012: I already bought my full amount...</li>
                                </ul>
                            </section>

                            <section className="payments">
                                <h3>Upcoming Payments</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>18.06.24</td>
                                            <td>Electricity</td>
                                            <td>Amount</td>
                                            <td>Amount</td>
                                        </tr>
                                        <tr>
                                            <td>13.08.24</td>
                                            <td>Water</td>
                                            <td>Amount</td>
                                            <td>Amount</td>
                                        </tr>
                                        <tr>
                                            <td>31.09.24</td>
                                            <td>Internet</td>
                                            <td>Amount</td>
                                            <td>Amount</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>

                            <section className="it-support">
                                <h3>IT Support</h3>
                                <textarea placeholder="Type your problem here..." />
                                <button>Send</button>
                            </section>
                        </div>
                    </div>
                    <Footer/>
                </div>
            
        
    );
}

export default Dashboard
