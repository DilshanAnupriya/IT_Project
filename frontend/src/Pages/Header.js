import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoIcon from './../Assets/mobility/logo.png';
import homeIcon from './../Assets/mobility/s1.png';
import profileIcon from './../Assets/mobility/p1.png';
import calendarIcon from './../Assets/mobility/s1.png';
import settingsIcon from './../Assets/mobility/sss.png';
import logoutIcon from './../Assets/mobility/l1.png'; // Add logout icon path here

function Sidebar() {
  const location = useLocation();

  return (
    <div style={styles.sidebar}>
      <div style={styles.logoContainer}>
        <img src={logoIcon} alt="Logo" style={styles.logo} />
      </div>
      <ul style={styles.menu}>
        <li>
          <Link to="/MHome" style={styles.link}>
            <img
              src={homeIcon}
              alt="Home"
              style={location.pathname === "/Home" ? styles.activeIcon : styles.icon}
            />
          </Link>
        </li>
        <li>
          <Link to="/Therapy" style={styles.link}>
            <img
              src={calendarIcon}
              alt="Therapy"
              style={location.pathname === "/Therapy" ? styles.activeIcon : styles.icon}
            />
          </Link>
        </li>
        <li>
          <Link to="/profile" style={styles.link}>
            <img
              src={profileIcon}
              alt="Profile"
              style={location.pathname === "/profile" ? styles.activeIcon : styles.icon}
            />
          </Link>
        </li>
      </ul>
      <div style={styles.spacedItem}>
        <Link to="/settings" style={styles.link}>
          <img
            src={settingsIcon}
            alt="Settings"
            style={location.pathname === "/settings" ? styles.activeIcon : styles.icon}
          />
        </Link>
      </div>
      <div style={styles.bottomItem}>
        <Link to="/logout" style={styles.link}>
          <img
            src={logoutIcon}
            alt="Logout"
            style={location.pathname === "/logout" ? styles.activeIcon : styles.icon}
          />
        </Link>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    height: "100vh",
    width: "50px",
    backgroundColor: "#f4f4f9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
    justifyContent: "space-between", // Keep Logout icon at the bottom
    position: "fixed",
  },
  logoContainer: {
    marginBottom: "20px", // Space below the logo
  },
  logo: {
    width: "40px", // Adjust logo size as needed
    height: "40px", // Adjust logo size as needed
  },
  menu: {
    padding: 0, // Remove default padding from the ul
    listStyleType: "none", // Remove default list styles
    width: "100%", // Ensure full width for alignment
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Center icons vertically
    flex: 1, // Allow the menu to take remaining space
  },
  link: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textDecoration: "none", // Remove default underline
    color: "black", // Default color for icons
  },
  icon: {
    width: "40px",
    height: "40px",
    margin: "20px 0", // Add vertical margin for spacing
    transition: "transform 0.2s ease-in-out",
    filter: "none", // Display icons in original color (black)
  },
  activeIcon: {
    width: "40px",
    height: "40px",
    margin: "20px 0", // Add vertical margin for spacing
    transition: "transform 0.2s ease-in-out",
    filter: "none", // Ensure active icon remains in original color (black)
    color: "#003366", // Change color to blue when active
    opacity: 0.7, // Optional: Add slight transparency to active icon
    textDecoration: "underline", // Add underline effect for active icon
  },
  spacedItem: {
    marginBottom: "20px", // Space between Settings and Logout
  },
  bottomItem: {
    marginBottom: "20px", // Optional: Add margin at the bottom for spacing
  },
};

export default Sidebar;
