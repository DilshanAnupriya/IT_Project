import React, { useState } from 'react';
import "../../Pages/Css/SalaryAllocation/salaryallocation.css";
import logo from "../../Assets/logo.png";
import Nav from "../../Components/Navbar/Navbar";
import Footer from '../../Components/Footer/Footer';

const SalaryAllocation = () => {
    const [employees, setEmployees] = useState([
        { id: 'emp001', salary: 40000 },
        { id: 'emp002', salary: 40000 },
        { id: 'emp003', salary: 40000 },
        { id: 'emp004', salary: 40000 },
        { id: 'emp005', salary: 40000 }
    ]);
    
    const [ineligibleEmployees, setIneligibleEmployees] = useState(['vol001', 'Doc001', 'emp006', 'vol004']);
    const [salaryHistory, setSalaryHistory] = useState([
        { year: 2021, month: 'April', cost: 700000 },
        { year: 2021, month: 'May', cost: 650000 },
        { year: 2021, month: 'June', cost: 720000 }
    ]);
    
    const [newEmployeeId, setNewEmployeeId] = useState('');
    const [newEmployeeSalary, setNewEmployeeSalary] = useState('');

    const handleAllocate = () => {
        if (newEmployeeId && newEmployeeSalary) {
            setEmployees([...employees, { id: newEmployeeId, salary: parseFloat(newEmployeeSalary) }]);
            setNewEmployeeId('');
            setNewEmployeeSalary('');
        }
    };

    const handleDelete = (id) => {
        setIneligibleEmployees(ineligibleEmployees.filter(emp => emp !== id));
    };

    return (
        <div className="container70">
            <Nav />
            <h1>Salary Allocation</h1>

            <div className="report-section">
                {/* Salary Eligible list */}
                <div className="salary-eligible">
                    <h3>Salary Eligible List</h3>
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp => (
                                <tr key={emp.id}>
                                    <td>{emp.id}</td>
                                    <td>{emp.salary.toLocaleString()}</td>
                                    <td>
                                        <button onClick={() => handleDelete(emp.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td>
                                    <input 
                                        type="text" 
                                        placeholder="New Employee ID" 
                                        value={newEmployeeId} 
                                        onChange={(e) => setNewEmployeeId(e.target.value)} 
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="number" 
                                        placeholder="Salary" 
                                        value={newEmployeeSalary} 
                                        onChange={(e) => setNewEmployeeSalary(e.target.value)} 
                                    />
                                </td>
                                <td>
                                    <button onClick={handleAllocate}>Allocate</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Salary Cost table */}
                <div className="salary-history">
                    <h3>Salary Cost History</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Month</th>
                                <th>Salary Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salaryHistory.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.year}</td>
                                    <td>{record.month}</td>
                                    <td>{record.cost.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="buttons">
                        <button>View All</button>
                    </div>
                </div>
            </div>

            {/* Ineligible List */}
            <div className="ineligible-list">
                <h3>Ineligible List</h3>
                <table>
                    <tbody>
                        {ineligibleEmployees.map((emp, index) => (
                            <tr key={index}>
                                <td>{emp}</td>
                                <td><button onClick={() => alert(`Updating ${emp} via email`)}>Update via Email</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="buttons">
                    <button onClick={() => setIneligibleEmployees([])}>Delete Resigned Employees</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SalaryAllocation;
