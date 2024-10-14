import React from 'react';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import styles from './sidebar.module.css'; // Import the CSS module

const SideBar = () => {
  return (
    <aside className={styles.sidebar}>
      <img src="/logo.png" className={styles.logo} alt="Logo" />
      <div className={styles.iconContainer}>
        <FaCog className={styles.icon} />
        <FaSignOutAlt className={styles.icon} />
      </div>
    </aside>
  );
};

export default SideBar;
