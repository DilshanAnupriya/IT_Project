import React, { useEffect } from 'react';
import "../../Pages/Update_ineligible/Updateineligible"; // Assuming CSS file is correctly referenced
import logo from "../../Assets/logo.png";
import { Link } from 'react-router-dom';
import Nav from "../../Components/Navbar/Navbar";
import Footer from '../../Components/Footer/Footer';

const UpdateIneligible = () => {
    


    return (
        <div className="email-form">
            <Nav />
            <h2>Send Email to Ineligible Employees</h2><br />
            
            <form id="emailForm">
                <label htmlFor="employeeEmail">Employee Email:</label>
                <input type="email" id="employeeEmail" name="employeeEmail" placeholder="Enter employee's email" required />

                <label htmlFor="subject">Subject:</label>
                <input type="text" id="subject" name="subject" placeholder="Email subject" value="Update your status" required />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" rows="6" placeholder="Enter your message" required>
Dear Employee,

We have noticed that your profile is currently listed as ineligible for salary allocation. Kindly update your information or reach out to HR for further assistance.

Best Regards,
HR Department
                </textarea>

                <button type="submit">Send Email</button>
            </form>
            <Footer /> {/* Ensure Footer is properly closed */}
        </div>
    );
}


export default UpdateIneligible
