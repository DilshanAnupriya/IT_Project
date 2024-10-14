import React from 'react';
import { FaHome, FaUser, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md"; // Assuming the second icon represents a grid layout or widgets
import { IoToggle } from "react-icons/io5"; // Icon representing the toggle button
import styles from './sidebar.module.css';

/**
 * Sidebar component that displays a vertical menu with icons for navigation.
 * It includes sections for user actions (home, dashboard, user, settings, etc.)
 * and provides hover effects for a responsive and interactive experience.
 *
 * @component
 * @example
 * return (
 *   <Sidebar />
 * )
 *
 * @returns {JSX.Element} The rendered Sidebar component.
 */
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      
      {/* Top Section: Home and Dashboard icons */}
      <div className={styles.topSection}>
        {/* Home Icon inside a blue circle */}
        <div className={styles.homeIcon}>
          <FaHome className={styles.iconWhite} size={24} />
        </div>
        {/* Dashboard/Grid Icon */}
        <MdDashboard className={`${styles.iconBlue} ${styles.iconHover}`} size={24} />
      </div>

      {/* Middle Section: User, Chart, and Toggle icons */}
      <div className={styles.middleSection}>
        {/* User Icon */}
        <FaUser className={`${styles.iconBlack} ${styles.iconHover}`} size={24} />
        {/* Chart/Stats Icon */}
        <FaChartBar className={`${styles.iconBlack} ${styles.iconHover}`} size={24} />
        {/* Toggle Icon */}
        <IoToggle className={`${styles.iconBlack} ${styles.iconHover}`} size={24} />
      </div>

      {/* Bottom Section: Settings and Logout icons */}
      <div className={styles.bottomSection}>
        {/* Settings Icon */}
        <FaCog className={`${styles.iconBlack} ${styles.iconHover}`} size={24} />
        {/* Logout Icon */}
        <FaSignOutAlt className={`${styles.iconBlack} ${styles.iconHover}`} size={24} />
      </div>
    </div>
  );
};

export default Sidebar;
