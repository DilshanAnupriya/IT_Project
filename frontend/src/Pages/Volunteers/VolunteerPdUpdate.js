import React, { useRef, useState } from 'react';
import Footer from "../../Components/Footer/Footer"
import Nav from "../../Components/Navbar/Navbar"
import "../Css/Volunteers/VolunteerPdUpdate.css"
function VolunteerPdUpdate() {



 //navigation between next pre
 const form1 = useRef(null);
 const form2 = useRef(null);
 const nextBtn = useRef(null);
 const preBtn = useRef(null);
 const [isForm1Filled, setIsForm1Filled] = useState(false);

 const handleNext = () => {
     const form1Inputs = form1.current.querySelectorAll('input, select, textarea');
     let isForm1Valid = true;

     form1Inputs.forEach(input => {
         if (input.required && input.value === '') {
             isForm1Valid = false;
         }
     });

     if (isForm1Valid) {
         setIsForm1Filled(true);
         form1.current.style.opacity = 0;
         form1.current.style.pointerEvents = 'none';
         form2.current.style.opacity = 1;
         form2.current.style.pointerEvents = 'auto';
     } else {
         alert('Please fill out all required fields in the  form.');
     }
 };

 const handlePrevious = () => {
     setIsForm1Filled(false);
     form1.current.style.opacity = 1;
     form1.current.style.pointerEvents = 'auto';
     form2.current.style.opacity = 0;
     form2.current.style.pointerEvents = 'none';
 };

 React.useEffect(() => {
     nextBtn.current.addEventListener('click', handleNext);
     preBtn.current.addEventListener('click', handlePrevious);
 }, []);




  return (
    <div className='all'>
    <Nav />
    <div className='container20' id='section2'>
        <header>Registration</header>

        <form action='#' >
            <div ref={form1} className='form first'>
                <div className='details personal'>
                    <span className='title'>Personal Details</span>

                    <div className='fields'>
                        <div className='input-field'>
                            <label>First Name</label>
                            <input type='text'  placeholder='Enter Your Name'  name='first_name' required />

                        </div>

                        <div className='input-field'>
                            <label>Last Name</label>
                            <input type='text'  placeholder='Enter Your Name' name='last_name'  required />
                        </div>

                        <div className='input-field'>
                            <label>Date of Birth</label>
                            <input type='Date'  placeholder='Enter birth date' name='date_of_birth'  required />
                        </div>

                        <div className='input-field'>
                            <label>Gender</label>
                            <select id="gen" name="gender" >
                                <option value="Male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className='input-field'>
                            <label>Email</label>
                            <input type='text'  placeholder='Enter Your email' name='email'  required />
                        </div>

                        <div className='input-field'>
                            <label>Join Date</label>
                            <input type='Date'  placeholder='Enter date' name='date'  required />
                        </div>

                        <div className='input-field'>
                            <label>Mobile Number</label>
                            <input type='number'  placeholder='Enter Your number' name='mobile'  required />
                        </div>

                        <div className='input-field'>
                            <label>Emergency Mobile Number</label>
                            <input type='number'  placeholder='Enter mobile number' name='emobile'  required />
                        </div>
                        <div className='input-field'>
                            <label>Address</label>
                            <input type='text'  placeholder='Enter Your address' name='address'  required />
                        </div>

                    </div>
                </div>


                <button ref={nextBtn} className='nextBtn'>Next</button>

            </div>

            <div ref={form2} className='form second'>
                <div className='details Volunteer'>
                    <span className='title'>Volunteering  Details</span>

                    <div className='fields'>
                        <div className='input-field'>
                            <label>Duration</label>
                            <input type='text'  placeholder='1-Month'  name='duration' required />
                        </div>

                        <div className='input-field'>
                            <label>Preferred Type of Work</label>
                            <select id="work" name="type_of_work"  >
                                <option value=" Companionship"> Companionship</option>
                                <option value="Assistance with Daily Living">Assistance with Daily Living</option>
                                <option value="Event and Activity Organization">Event and Activity Organization</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Specialized Support">Specialized Support</option>
                                <option value="Pet Therapy">Pet Therapy</option>
                                <option value="Spiritual Care">Spiritual Care</option>
                                <option value="Hospice Volunteering">Hospice Volunteering</option>
                                <option value="Intergenerational Programs">Intergenerational Programs</option>
                            </select>
                        </div>

                        <div className='input-field'>
                            <label>Experience</label>
                            <select id="ex" name="experience"  >
                                <option value="Yes">Yes, I have</option>
                                <option value="No">Not, I don't have</option>
                            </select>
                        </div>

                        <div className='input-field'>
                            <label>Available Days</label>
                            <select id="dy" name="days"  >
                                <option value="WD">Week-Days</option>
                                <option value="WE">Week-Ends</option>
                            </select>
                        </div>

                        <div className='input-field'>
                            <label>Available Times</label>
                            <select id="time" name="time"  >
                                <option value="Morning">Morning ( 8:00 AM - 12:00 PM)</option>
                                <option value="Afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                                <option value="Evening">Evening ( 4:00 PM - 8:00 PM)</option>
                                <option value="Night">Night ( 8:00 PM - 12:00 AM or overnight shifts for 24-hour care facilities)</option>
                            </select>
                        </div>
                        <div className='input-field'>
                            <label>Skills</label>
                            <select id="skills" name="skills"  >
                                <option value=" Technical Skills"> Technical Skills</option>
                                <option value="Specialized Skills">Specialized Skills</option>
                                <option value="Soft Skills">ESoft Skills</option>
                                <option value="nursing">nursing</option>
                                <option value="other">other</option>

                            </select>
                        </div>

                        <div className='input-field'>
                            <label>Why Do You Want To Volunteer?</label>
                            <textarea name='description'   placeholder='Enter your description' ></textarea>
                        </div>
                    </div>
                </div>
                <div className='buttons'>
                    <button ref={preBtn} className='preBtn'>Previous</button>
                    <button className='subBtn'>Submit</button>
                </div>

            </div>

        </form>
    </div>

  <div className='ft'>
    <Footer />
    </div>

</div>
  )
}

export default VolunteerPdUpdate