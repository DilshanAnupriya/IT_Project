import React, { useEffect, useState } from 'react';
import "../Css/Realdashacc/Accdashboard.css"; // Include updated CSS
import Dash from "../../Components/Dashboard/Dashboard";
import axios from "axios";
import { Link } from 'react-router-dom';

const URL = "http://localhost:3000/account/";

const fetchHandler = async () => {
    const data = await axios.get(URL).then((res) => res.data);
    return data;
};

function AccDashboard() {
    const [accounts, setAccounts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch account details
    useEffect(() => {
        fetchHandler().then((data) => {
            setAccounts(data.accounts);
        });
    }, []);

    // Delete account by ID
    const deleteAccount = async (id) => {
        const deleteConfirmation = window.confirm(`Are you sure you want to delete the account with ID ${id}? This action cannot be undone.`);
        if (deleteConfirmation) {
            try {
                await axios.delete(`http://localhost:3000/account/delete/${id}`);
                setAccounts(accounts.filter((account) => account._id !== id)); // Update after deletion
            } catch (error) {
                setErrorMessage('Failed to delete account. Please try again.');
            }
        }
    };

    return (
        <div>
            <div className='dashboard30'>
                <Dash />
            </div>
            <div className="container57">
                <div className="main-section">
                    <section>
                        <h1>Accounts</h1>
                        {/* Display error message */}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <table className="account-table">
                            <thead>
                                <tr>
                                    <th>Bank</th>
                                    <th>Acc. No.</th>
                                    <th>Branch</th>
                                    <th>Current Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.map((account) => (
                                    <tr key={account._id}>
                                        <td>{account.bank}</td>
                                        <td>{account.accNo}</td>
                                        <td>{account.branch}</td>
                                        <td>{account.amount}</td>
                                        <td className="action-buttons">
                                            <Link to={`/AccForm/${account._id}`}><button className="edit-btn">✏</button></Link>
                                            <button className="delete-btn" onClick={() => deleteAccount(account._id)}>🗑</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
                <Link to="/AccForm"> <button className="add-btn">Add Account</button></Link>
            </div>
        </div>
    );
}

export default AccDashboard;
