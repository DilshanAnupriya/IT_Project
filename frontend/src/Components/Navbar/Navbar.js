import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Pages/Css/ComponentsCss/Navbar/Navbar.css";
import Logo from "../../Assets/logo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={Logo} alt="Care Zone Logo" className="logo" />
          <span>Care Zone</span>
        </div>
        <div className={`hamburger ${isMenuOpen ? "is-active" : ""}`} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={`navbar-links ${isMenuOpen ? "show" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li>
            <Link to="/volunteer">Features</Link>
            <ul className="dropdown">
              <li><Link to="/volunteer/option1">Option 1</Link></li>
              <li><Link to="/volunteer/option2">Option 2</Link></li>
              <li><Link to="/volunteer/option2">Option 2</Link></li>
              <li><Link to="/volunteer/option2">Option 2</Link></li>
            </ul>
          </li>
          <li>
            <Link >Services</Link>
            <ul className="dropdown">
              <li><Link to="/contact/email">Email</Link></li>
              <li><Link to="/contact/phone">Volunteer</Link> </li>
              <li><Link to="/contact/phone">Phone</Link></li>
              <li><Link to="/contact/phone">Phone</Link></li>
            </ul>
          </li>
          <li><Link to="/about">Contact Us</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
        <div className="login-button">
          <button>Login</button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
