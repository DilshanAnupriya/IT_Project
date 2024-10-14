import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing hamburger icon and close icon

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className={styles.nav}>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2 className={styles.title}>Elder Care Home</h2>
        <div className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
      <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
        <Link to="/" className={styles.link} onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/services" className={styles.link} onClick={() => setIsMenuOpen(false)}>Services</Link>
        <Link to="/about" className={styles.link} onClick={() => setIsMenuOpen(false)}>About</Link>
        <Link to="/contact" className={styles.link} onClick={() => setIsMenuOpen(false)}>Contact</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        ) : (
          <Link to="/login" className={styles.loginBtn} onClick={() => setIsMenuOpen(false)}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
