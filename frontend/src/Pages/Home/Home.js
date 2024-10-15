import React from 'react'
import Nav from "../../Components/Navbar/Navbar"
import Footer from '../../Components/Footer/Footer'
import Dash from "../../Components/Dashboard1/Dashboard"
import "../Home/Home.css"
import pic from "../../Assets/dd11.jpg"
import pic1 from "../../Assets/d4.jpg"
import { Link } from 'react-router-dom'
import ss from "../../Assets/ss2.jpg"
import s2 from "../../Assets/cp1.jpeg"
import s3 from "../../Assets/e1.webp"
import s4 from "../../Assets/m1.jpg"
import s5 from "../../Assets/ms1.jpg"
import s6 from "../../Assets/r1.jpeg"
import s7 from "../../Assets/v1.png"

function Home() {

    return (

        <div>








            <Nav />




            <div className='d1'>
                <img src={pic} alt='' />
                <div className='s1'>
                    <h1>Welcome to <br /><span>Care Zone</span></h1>
                    <p>sworld best elder care.we provide best service to our elders and well expirence</p>

                    <button>Sign Up</button>
                </div>
                <div className='srch1122'>

                    <form class="max-w-md mx-auto">
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>

                </div>
                <div className='d2'>
                    <img src={pic1} alt='' />
                    <div className='dis'>
                        <p className='about1000'>About Us</p>

                        <h1>Over <span>25 years </span>of  Experience in this Business</h1>

                        <p className='p1'>world best elder care .we provide best service to our elders and
                            well expirence care givers world best elder care .we provide best service to our
                            elders and well expirence care givers</p>

                        <p className='p2'>world best elder care .we provide best service to our elders and well
                            expirence care givers world best elder care .we provide best service to our elders
                            and well expirence care givers<br /><br />world best elder care .we provide
                            service to our elders and well expirence care givers
                            world best elder care .we provide best service to our elders and well expirence care givers</p>

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

                <div className='content-7'>
                    <div className='topic'>

                    </div>
                    <div className='flex'>

                        <div class="container9">

                            <h1 class="heading90"> Our Services</h1>

                            <div class="box-container9">

                                <div class="box90">
                                    <img src={s2} alt="" />
                                    <h3>Care Plans </h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
                                    <Link to="#" class="btn">View</Link>
                                </div>

                                <div class="box90">
                                    <img src={s5} alt="" />
                                    <h3>Mobility Support</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
                                    <Link to="#" class="btn">View </Link>
                                </div>

                                <div class="box90">
                                    <img src={s4} alt="" />
                                    <h3>Medical Care</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
                                    <Link to="/medservices" class="btn">View </Link>
                                </div>
                            </div>
                            <div class="box-container9">

                                <div class="box90">
                                    <img src={s7} alt="" />
                                    <h3>Volunteering </h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
                                    <Link to="/volunteer" class="btn">View</Link>
                                </div>

                                <div class="box90">
                                    <img src={ss} alt="" />
                                    <h3>Elder Care Services</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
                                    <Link to="#" class="btn">View </Link>
                                </div>

                                <div class="box90">
                                    <img src={s3} alt="" />
                                    <h3>Employee</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
                                    <Link to="/empForm" class="btn">View </Link>
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