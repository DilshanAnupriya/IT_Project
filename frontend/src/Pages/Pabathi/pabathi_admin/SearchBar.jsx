import { FaHome, FaUser, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoToggle } from "react-icons/io5";
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      {/* Top Section: Home and Dashboard icons */}
      <div className={styles.iconSection}>
        <div className={styles.iconContainer}>
          <FaHome className={styles.iconWhite} size={24} />
        </div>
        <MdDashboard className={styles.iconDefault} size={24} />
      </div>

      {/* Middle Section: User, Chart, and Toggle icons */}
      <div className={styles.iconSection}>
        <FaUser className={styles.iconBottom} size={24} />
        <FaChartBar className={styles.iconBottom} size={24} />
        <IoToggle className={styles.iconBottom} size={24} />
      </div>

      {/* Bottom Section: Settings and Logout icons */}
      <div className={`${styles.iconSection} ${styles.bottomSection}`}>
        <FaCog className={styles.iconBottom} size={24} />
        <FaSignOutAlt className={styles.iconBottom} size={24} />
      </div>
    </div>
  );
};

export default Sidebar;
