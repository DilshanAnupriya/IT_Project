import React from 'react';
import "../../Pages/Css/SalaryAllocation/salaryallocation.css"
import logo from "../../Assets/logo.png"
import { Link } from 'react-router-dom'
import Nav from "../../Components/Navbar/Navbar"
import Footer from '../../Components/Footer/Footer'

const SalaryAllocation = () => {
    return (
        <div className="container70">
            <Nav/>
            
            <h1>Salary Allocation</h1>

            <div className="report-section">
                {/* Salary Eligible list */}
                <div className="salary-eligible">
                    <h3>Salary Eligible list</h3>
                    <form>
                        <select>
                            <option value="Employees">Employees</option>
                            <option value="Volunteers">Volunteers</option>
                            <option value="Doctors">Doctors</option>
                            <option value="Other staff">Other staff</option>
                        </select>
                        <select>
                            <option value="5%">5%+</option>
                            <option value="10%">10%+</option>
                            <option value="15%">15%+</option>
                            <option value="20%">20%</option>
                        </select>
                        
                    </form>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Salary Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>emp001</td><td>40,000.00</td></tr>
                            <tr><td>emp002</td><td>40,000.00</td></tr>
                            <tr><td>emp003</td><td>40,000.00</td></tr>
                            <tr><td>emp004</td><td>40,000.00</td></tr>
                            <tr><td>emp005</td><td>40,000.00</td></tr>
                        </tbody>
                    </table>
                    <div className="buttons">
                        <button>Allocate money</button>
                    </div>
                </div>

                {/* Salary Cost table */}
                <div className="salary-history">
                    <table>
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Month</th>
                                <th>Salary Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>2021</td><td>April</td><td>700,000.00</td></tr>
                            <tr><td>2021</td><td>May</td><td>650,000.00</td></tr>
                            <tr><td>2021</td><td>June</td><td>720,000.00</td></tr>
                        </tbody>
                    </table>
                    <div className="buttons">
                        <button>View All</button>
                    </div>
                </div>
            </div>

            {/* Ineligible List */}
            <div className="ineligible-list">
                <h3>Ineligible list</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>vol001</td>
                            <td><button>Update via email</button></td>
                        </tr>
                        <tr>
                            <td>Doc001</td>
                            <td><button>Update via email</button></td>
                        </tr>
                        <tr>
                            <td>emp006</td>
                            <td><button>Update via email</button></td>
                        </tr>
                        <tr>
                            <td>vol004</td>
                            <td><button>Update via email</button></td>
                        </tr>
                    </tbody>
                </table>
                <div className="buttons">
                    <button>Delete resigned Employees</button>
                </div>
            </div>
            <div className='nv'>
                <Footer/>
            </div>
        </div>
    );
};



export default SalaryAllocation;
