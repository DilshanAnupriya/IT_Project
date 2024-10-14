import React from 'react';
import '../../Pages/Css/Acconutcss/UserProfile.css'; // You can create a CSS file for styling

const UserProfile = () => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <img 
          src="https://via.placeholder.com/150" 
          alt="Profile Picture" 
          className="profile-image" 
        />
        <h2 className="profile-name">Naveen Gunasekara</h2>
        <p className="profile-title">Financial Manager</p>
        <p className="profile-company">Elderly Care Service System</p>

        <div className="profile-details">
          <h3>Education</h3>
          <p>MSc Financial Accounting, SLIIT</p>

          <h3>Occupation</h3>
          <p>Financial Manager, Elderly Care Service System</p>
        </div>

        <button className="edit-profile-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
