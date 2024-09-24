import React, { useState } from 'react';
import Nav from "../../Components/Navbar/Navbar";
import Footer from '../../Components/Footer/Footer';
import "../../Pages/Css/Realdashacc/Accdashboard.css"; 

function Dashboard() {
    const [accounts, setAccounts] = useState([
        { bank: 'BOC', accNo: '173645011', branch: 'Homagama', amount: '100,000.00' },
        { bank: 'Sampath', accNo: '200764522', branch: 'Kollupitiya', amount: '75,000.00' },
        { bank: 'HNB', accNo: '2001423892', branch: 'Pettah', amount: '65,000.00' }
    ]);
    
    const [newAccount, setNewAccount] = useState({ bank: '', accNo: '', branch: '', amount: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAccount({ ...newAccount, [name]: value });
    };

    const handleAddAccount = () => {
        const { bank, accNo, branch, amount } = newAccount;

        if (!bank || !accNo || !branch || !amount) {
            setError('All fields are required');
            return;
        }

        setAccounts([...accounts, newAccount]);
        setNewAccount({ bank: '', accNo: '', branch: '', amount: '' });
        setError('');
    };

    const handleDeleteAccount = (accNo) => {
        setAccounts(accounts.filter(account => account.accNo !== accNo));
    };

    return (
        <div className="container">
            <Nav />
            <aside className="sidebar">
                <div className="user-info">
                    <h2>Hello, Naveen</h2>
                    <p>Today is {new Date().toLocaleDateString()}</p>
                </div>
                <div className="button-up">
                    <button>Home</button>
                    <button>Reports</button>
                    <button>Alerts</button>
                    <button>Settings</button>
                </div>
            </aside>

            <div className="main-content">
                <header className="header">
                    <input type="text" placeholder="Search" />
                    <div className="profile">
                        <span>Naveen Gunasekara</span>
                        <img src="profile_pic.png" alt="Profile" />
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
                                <tr><td>All Expenses & Payments</td><td>25.05.2024 13:46</td></tr>
                                <tr><td>Salary Allocations</td><td>14.05.2024 13:30</td></tr>
                                <tr><td>Funds</td><td>05.06.2024 15:30</td></tr>
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
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.map((account) => (
                                    <tr key={account.accNo}>
                                        <td>{account.bank}</td>
                                        <td>{account.accNo}</td>
                                        <td>{account.branch}</td>
                                        <td>{account.amount}</td>
                                        <td><button onClick={() => handleDeleteAccount(account.accNo)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="account-form">
                            <h4>Add New Account</h4>
                            {error && <p className="error">{error}</p>}
                            <input type="text" name="bank" placeholder="Bank" value={newAccount.bank} onChange={handleChange} />
                            <input type="text" name="accNo" placeholder="Account No." value={newAccount.accNo} onChange={handleChange} />
                            <input type="text" name="branch" placeholder="Branch" value={newAccount.branch} onChange={handleChange} />
                            <input type="text" name="amount" placeholder="Current Amount" value={newAccount.amount} onChange={handleChange} />
                            <button onClick={handleAddAccount}>Add Account</button>
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
                                <tr><td>18.06.24</td><td>Electricity</td><td>Amount</td><td>Amount</td></tr>
                                <tr><td>13.08.24</td><td>Water</td><td>Amount</td><td>Amount</td></tr>
                                <tr><td>31.09.24</td><td>Internet</td><td>Amount</td><td>Amount</td></tr>
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
            <Footer />
        </div>
    );
}

export default Dashboard
