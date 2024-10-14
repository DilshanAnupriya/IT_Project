import React from 'react';
import styles from '../pabathi_admin/header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  return (
    <header className={styles.header}>
      <div className={styles.welcomeMessage}>
        <h1>Hello, Pabathi</h1>
        <p>Today is Monday, August 12, 2024</p>
      </div>

      <div className={styles.searchBarContainer}>
        <input type="text" placeholder="Search" className={styles.searchBar} />
      </div>

      <div className={styles.icons}>
        <i className={`fas fa-bell ${styles.icon}`}></i>
        <i className={`fas fa-envelope ${styles.icon}`}></i>
        <div className={styles.profile} onClick={handleProfileClick}>
          <img src="https://picsum.photos/200/300" alt="Profile" className={styles.profileImage} />
          <div className={styles.profileInfo}>
            <h3>Alwis L P M</h3>
            <p>Elder Care Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
