import React, { useEffect, useState } from 'react';
import "../../Pages/Css/updateineligible/updateineligible.css";// Ensure CSS file is correctly referenced
import logo from "../../Assets/logo.png";
import { Link } from 'react-router-dom';
import Nav from "../../Components/Navbar/Navbar";
import Footer from '../../Components/Footer/Footer';

const UpdateIneligible = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        employeeEmail: '',
        subject: 'Update your status',
        message: `Dear Employee,

We have noticed that your profile is currently listed as ineligible for salary allocation. Kindly update your information or reach out to HR for further assistance.

Best Regards,
HR Department`,
    });

    useEffect(() => {
        // Fetch existing employees (Read operation)
        const fetchEmployees = async () => {
            // Example API call
            const response = await fetch('/api/employees'); // Adjust the endpoint as necessary
            const data = await response.json();
            setEmployees(data);
        };
        fetchEmployees();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation (basic example)
        if (!formData.employeeEmail) {
            alert("Email is required");
            return;
        }

        // Create operation (Send email)
        await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        alert("Email sent successfully!");

        // Clear the form
        setFormData({
            employeeEmail: '',
            subject: 'Update your status',
            message: `Dear Employee,

We have noticed that your profile is currently listed as ineligible for salary allocation. Kindly update your information or reach out to HR for further assistance.

Best Regards,
HR Department`,
        });
    };

    return (
        <div className="email-form">
            <Nav />
            <h2>Send Email to Ineligible Employees</h2><br />

            <form id="emailForm" onSubmit={handleSubmit}>
                <label htmlFor="employeeEmail">Employee Email:</label>
                <input
                    type="email"
                    id="employeeEmail"
                    name="employeeEmail"
                    placeholder="Enter employee's email"
                    value={formData.employeeEmail}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="subject">Subject:</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Email subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Send Email</button>
            </form>

            <Footer />
        </div>
    );
}

export default UpdateIneligible;
