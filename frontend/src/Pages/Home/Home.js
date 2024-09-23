import React from 'react'
import Nav from "../../Components/Navbar/Navbar"
import Footer from '../../Components/Footer/Footer'
import Dash from "../../Components/Dashboard/Dashboard"
import "../Home/Home.css"
import pic from "../../Assets/dd11.jpg"
import pic1 from "../../Assets/d4.jpg"
import { Link } from 'react-router-dom'
import ss from "../../Assets/ss2.jpg"
function Home() {



    return (
        <div >
            <Nav />


            <div className='d1'>
                <img src={pic} alt='' />
                <div className='s1'>
                    <h1>Welcome to <br /><span>Care Zone</span></h1>
                    <p>sworld best elder care.we provide best service to our elders and well expirence</p>

                    <button>Sign Up</button>
                </div>

                <div className='d2'>
                    <img src={pic1} alt='' />
                    <div className='dis'>
                        <p>About Us</p>
                        <h1>Over <span>25 years </span>of  Experience in this Business</h1>
                        <p className='p1'>world best elder care .we provide best service to our elders and well expirence care givers world best elder care .we provide best service to our elders and well expirence care givers</p>
                        <p className='p2'>world best elder care .we provide best service to our elders and well expirence care givers world best elder care .we provide best service to our elders and well expirence care givers</p>
                        <div className='dflex'>
                            <div className='s2'>
                                <h1>50+</h1>
                                <h2>Care Givers</h2>
                            </div>
                            <div className='s2'>
                                <h1>50+</h1>
                                <h2>Elders</h2>
                            </div>
                        </div>
                        <button>See More</button>
                    </div>
                </div>

                <div className='d3'>
                    <div className='flex'>

                        <div class="container90">

                            <h1 class="heading90"><span>Our</span> Services</h1>

                            <div class="box-container90">

                                <div class="box90">
                                    <img src="" alt="" />
                                    <h3>Medical </h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
                                    <Link to="#" class="btn">View</Link>
                                </div>

                                <div class="box90">
                                    <img src="" alt="" />
                                    <h3>Volunteering</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
                                    <Link to="#" class="btn">View </Link>
                                </div>

                                <div class="box90">
                                    <img src="" alt="" />
                                    <h3>Employee</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
                                    <Link to="#" class="btn">View </Link>
                                </div>

                                <div class="box90">
                                    <img src="" alt="" />
                                    <h3>Mobility Support</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
                                    <Link to="#" class="btn">View</Link>
                                </div>

                                <div class="box90">
                                    <img src="" alt="" />
                                    <h3>Reviews</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
                                    <Link to="#" class="btn">View </Link>
                                </div>

                                <div class="box90">
                                    <img src="" alt="" />
                                    <h3>Care Plans</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
                                    <Link to="#" class="btn">View </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='care'>
                    <img src={ss} alt=''></img>
                    <div className='care1'>
                        <h1>Make Your <br /><span>Care Plan Now</span></h1>
                        <p>world best elder care .we provide best service to our elders and well expirence care givers world best elder world best elder care .we provide best service to our

                            elders and well expirence care givers world best elder world best elder care .we provide best service to our elders and well expirence care givers world best elder

                            elders and well expirence care givers world best elder world best elder care .we provide best service to our elders and well expirence care givers world best elder .

                        </p>
                        <button>See More</button>
                    </div>
                </div>
            </div>
            <div className='ft0'>
                <Footer />
            </div>






        </div>

    )
}
export default Home