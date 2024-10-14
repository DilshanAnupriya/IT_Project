import React, { useEffect, useState } from 'react';
import { fetchProfileData } from '../../../Pages/Pabathi/services/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const data = await fetchProfileData();
      setProfile(data);
    };
    getProfile();
  }, []);

  return (
    <div className="profile">
      {profile ? (
        <div className="profile-card">
          <img src={profile.profilePicture} alt={profile.name} className="profile-img" />
          <h2>{profile.name}</h2>
          <p>{profile.role}</p>
          <p>{profile.email}</p>
          <p>{profile.phone}</p>
          <button className="logout-btn">Log Out</button>
          <button className="back-btn">Back</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
