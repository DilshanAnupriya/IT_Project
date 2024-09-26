import React from "react";
import { Link } from "react-router-dom";
import "../../Pages/Css/ComponentsCss/Navbar/Navbar.css";
import Logo from "../../Assets/logo.png";

function Navbar() {


  return (
    <div>
      <nav >
        <div className="pic">
          <img src={Logo} className="img" alt="logo" />
          <Link to="/" className="logo">Care Zone</Link>
        </div>

        <div className="navigation">
          <ul className="menu">
            <i className="fa-solid fa-xmark close-btn"></i>
            <li className="menu-item"><Link to="/mainhome">Home</Link></li>
            <li className="menu-item">
              <Link className="sub-btn" to="/">Features <i className="fas fa-angle-down"></i></Link>
              <ul className="sub-menu">
                <li className="sub-item"><Link to="/">Mobility Support</Link></li>
                <li className="sub-item"><Link to="/">Appointment</Link></li>
                <li className="sub-item"><Link to="/">Care plans</Link></li>
                <li className="sub-item"><Link to="/">Donation</Link></li>

              </ul>
            </li>
            <li className="menu-item">
              <Link className="sub-btn" to="/">Services <i className="fas fa-angle-down"></i></Link>
              <ul className="sub-menu subtow">
                <li className="sub-item more">
                  <Link to="/">Sub Item 01</Link>
                  <ul className="more-menu">
                    <li className="more-item"><Link to="/volunteer_pd">More Item 01</Link></li>
                    <li className="more-item"><Link to="/">More Item 02</Link></li>
                    <li className="more-item"><Link to="/">More Item 02</Link></li>
                    <li className="more-item"><Link to="/">More Item 02</Link></li>
                  </ul>
                </li>
                <li className="sub-item more">
                  <Link to="/">Sub Item 02</Link>
                  <ul className="more-menu">
                    <li className="more-item"><Link to="/">More Item 01</Link></li>
                    <li className="more-item"><Link to="/">More Item 02</Link></li>
                    <li className="more-item"><Link to="/">More Item 02</Link></li>
                    <li className="more-item"><Link to="/">More Item 02</Link></li>
                  </ul>
                </li>
                <li className="sub-item more">
                  <Link to="/">Sub Item 03</Link>
                  <ul className="more-menu">
                    <li className="more-item"><Link to="/">More Item 01</Link></li>
                    <li className="more-item"><Link to="/">More Item 02</Link></li>
                    <li className="more-item"><Link to="/">More Item 02</Link></li>
                    <li className="more-item"><Link to="/">More Item 02</Link></li>
                  </ul>
                </li>
                <li className="sub-item more"> <Link to="/volunteer">Volunteering</Link> </li>
                <li className="sub-item more">
                  <Link className="more-btn" to="/" >More Items </Link>
                  <ul className="more-menu">
                    <li className="more-item"><Link to="">More Item 01</Link></li>
                    <li className="more-item"><Link to="/">More Item 02</Link></li>
                    <li className="more-item"><Link to="/">More Item 02</Link></li>
                    <li className="more-item"><Link to="/">More Item 02</Link></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="menu-item"><Link to="/newDash">Contact</Link></li>
            <li className="menu-item"><button>Login</button></li>
          </ul>
        </div>
        <i className="fa-solid fa-bars menu-btn"></i>
      </nav>
    </div>

  )
}

export default Navbar;
