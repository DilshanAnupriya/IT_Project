import React from 'react'
import "../../Pages/Css/ComponentsCss/Footer/Footer.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaFacebook } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
function Footer() {
    return (
        <div>
            <div className="Fcontainer">
                <div className="footer">
                    <div className="footer-content">
                        <div className="footer-main">
                            <h2>Care Zone</h2>
                            <p>sworld best elder care.we provide best service to our elders and well expirence</p>
                            <div className="social-link">
                                <Link to="#"><FontAwesomeIcon icon="fa-brands fa-facebook" /><FaFacebook /></Link>
                                <Link to="#"><i className="fa-brands fa-twitter"></i><GrInstagram /></Link>
                                <Link to="#"><i className="fa-brands fa-tiktok"></i><FaLinkedin /></Link>
                                <Link to="#"><i className="fa-brands fa-facebook-f"></i><FaTwitter /></Link>
                            </div>
                        </div>
                        <div className="links">
                            <p>information</p>
                            <Link to="#" className="link">our company</Link>
                            <Link to="#" className="link">about us</Link>
                            <Link to="#" className="link">blog</Link>
                        </div>
                        <div className="links">
                            <p>helpful links</p>
                            <Link to="#" className="link">services</Link>
                            <Link to="#" className="link">support</Link>
                            <Link to="#" className="link">terms & condition</Link>
                        </div>
                        <div className="links">
                            <p>navigation</p>
                            <Link to="#" className="link">home</Link>
                            <Link to="#" className="link">about</Link>
                            <Link to="#" className="link">contact</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
