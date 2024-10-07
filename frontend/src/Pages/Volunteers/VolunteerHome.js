
import React from 'react'
import "../Css/Volunteers/VolunteerHome.css"
import ph6 from "../../Assets/Volunteers/ph6.jpg"
import Nav from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"
import ph11 from "../../Assets/Volunteers/ph11.jpg"
import ig1 from "../../Assets/Volunteers/ig1.jpg"
import ig2 from "../../Assets/Volunteers/ig2.jpg"
import ig4 from "../../Assets/Volunteers/ig4.jpg"
import c1 from "../../Assets/Volunteers/c1.jpeg"
import c2 from "../../Assets/Volunteers/c2.jpg"
import c3 from "../../Assets/Volunteers/c3.jpg"
import c4 from "../../Assets/Volunteers/c4.jpg"
import c5 from "../../Assets/Volunteers/c5.jpeg"
import c6 from "../../Assets/Volunteers/c6.jpg"
import c8 from "../../Assets/Volunteers/c8.jpg"
import c9 from "../../Assets/Volunteers/c9.jpeg"
import c12 from "../../Assets/Volunteers/c12.jpg"
import c13 from "../../Assets/Volunteers/c13.jpg"
import c14 from "../../Assets/Volunteers/c14.jpg"
import c15 from "../../Assets/Volunteers/c15.jpg"
import c28 from "../../Assets/Volunteers/28.jpg"
import c27 from "../../Assets/Volunteers/c27.jpg"
import c26 from "../../Assets/Volunteers/c26.jpg"
import c16 from "../../Assets/Volunteers/c16.jpg"
import c30 from "../../Assets/Volunteers/c30.jpeg"
import { Link } from 'react-router-dom'




function VolunteerHome() {


    return (

        <div className='content-1'>
            <Nav />

            <div className='content-2'>
                <img src={ph6} alt='logo' />
                <div className='headline'>
                    <h1>Volunteering</h1>
                    <p>The example above used pixels to set the <br />height of the image</p>
                    <button>Donate</button>
                </div>

                <div className='content-3'>
                    <h1><span>Our</span> Mission </h1>
                    <h3>"To provide compassionate support and companionship to elderly individuals,
                        empowering them to live with dignity and independence, while fostering a sense
                        of community and social connection. We strive to create a supportive environment
                        that promotes physical, emotional, and mental well-being, and honors the unique experiences,
                        skills, and contributions of our elderly community members.""To provide compassionate support and companionship to elderly individuals,
                        empowering them to live with dignity and independence, while fostering a sense
                        of community and social connection. We strive to create a supportive environment
                        that promotes physical, emotional, and mental well-being, and honors the unique experiences,
                        skills, and contributions of our elderly community members."</h3>

                    <button>View More</button>
                </div>

                <div className='content-4'>
                    <h1> </h1>
                </div>
                <div className='content-5'>
                    <div className='reg'>
                        <img src={c30} alt='' />
                        <div className='sub9'>
                            <h1>Be part of a  <span>Volunteer </span><br />community!</h1>
                            <Link to="/vol-reg"><button>Register Now</button></Link>
                        </div>
                    </div>
                </div>
                <div className='content-6'>
                    <div class="header">
                        <h1><span>Platform</span> Gallery</h1>

                    </div>
                    <div class="row">
                        <div class="column">
                            <img src={ig1} alt='' />
                            <img src={ig4} alt='' />
                            <img src={ig2} alt='' />
                            <img src={ig4} alt='' />
                        </div>
                        <div class="column">
                            <img src={c2} alt='' />
                            <img src={c3} alt='' />
                            <img src={c6} alt='' />
                            <img src={c1} alt='' />
                            <img src={c4} alt='' />
                        </div>
                        <div class="column">
                            <img src={c8} alt='' />
                            <img src={c5} alt='' />
                            <img src={c12} alt='' />
                            <img src={c9} alt='' />
                        </div>
                        <div class="column">
                            <img src={c16} alt='' />
                            <img src={c13} alt='' />
                            <img src={c15} alt='' />
                            <img src={c14} alt='' />
                        </div>
                    </div>
                </div>
                <div className='content-7'>
                    <div className='topic'>

                    </div>
                    <div className='flex'>

                        <div class="container8">

                            <h1 class="heading9"><span>Core</span> Features</h1>

                            <div class="box-container9">

                                <div class="box9">
                                    <img src={c28} alt="" />
                                    <h3>Task </h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
                                    <Link to="/UTaskD" class="btn">View</Link>
                                </div>

                                <div class="box9">
                                    <img src={c26} alt="" />
                                    <h3>Certificate</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
                                    <Link to="/UCD" class="btn">View </Link>
                                </div>

                                <div class="box9">
                                    <img src={c27} alt="" />
                                    <h3>Schedule</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
                                    <Link to="#" class="btn">View </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default VolunteerHome