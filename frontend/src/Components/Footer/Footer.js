import React from 'react'
import "../../Pages/Css/ComponentsCss/Footer/Footer.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Footer() {
    return (
        <div>
            <div className="container">
                <div className="footer">
                    <div className="footer-content">
                        <div className="footer-main">
                            <h2>Name</h2>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque ducimus quo et dignissimos veniam laborum!</p>
                            <div className="social-link">
                                <Link to="#"><FontAwesomeIcon icon="fa-brands fa-facebook" /></Link>
                                <Link to="#"><i className="fa-brands fa-twitter"></i></Link>
                                <Link to="#"><i className="fa-brands fa-tiktok"></i></Link>
                                <Link to="#"><i className="fa-brands fa-facebook-f"></i></Link>
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
