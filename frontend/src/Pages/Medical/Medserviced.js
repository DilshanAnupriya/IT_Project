import React from 'react';
import Nav from "../../Components/Navbar/Navbar";
import "../Css/Medical/medservicescss.css";
import Footer from "../../Components/Footer/Footer";
import m1 from "../../Assets/Medical/1.jpg";
import m2 from "../../Assets/Medical/2.jpg";
import m3 from "../../Assets/Medical/3.jpg";
import m4 from "../../Assets/Medical/4.jpg";
import m5 from "../../Assets/Medical/5.jpg";
import m6 from "../../Assets/Medical/6.jpg";
import m7 from "../../Assets/Medical/9.jpg";
import m8 from "../../Assets/Medical/8.jpg";
import m11 from "../../Assets/Medical/ic1.jpg";
import m12 from "../../Assets/Medical/ic2.jpg";
import m13 from "../../Assets/Medical/ic3.jpg";
import bbbg from "../../Assets/Medical/bbbg.jpg"; // Import the background image
import { Link } from 'react-router-dom';

function Mediservice() {
  return (
    <div className='our-medical-services'>
      <Nav />
      <div className="container5" style={{ backgroundImage: `url(${bbbg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="section-title">
          <h2>Our Medical Services</h2>
      
        </div>

        <div className="services-grid">
          <div className="service-item white-background">
            <div className="icon">
              <img src={m11} alt="Fulled with medical Resources" />
            </div>
            <Link to=""><h3>Fulled with medical Resources</h3></Link>
          </div>

          <div className="service-item white-background">
            <div className="icon">
              <img src={m12} alt="Get Informed" />
            </div>
            <Link to="/meduserreq"><h3>Special Treatment Requests</h3></Link>
          </div>

          <div className="service-item white-background">
            <div className="icon">
              <img src={m13} alt="Special Treatments" />
            </div>
            <Link to=""><h3>Report Generating</h3></Link>
          </div>
        </div>
        <div className="section-title p">
        <p>Our goal is to serve you with the best medical services</p> </div>
      </div>

      <div className="meet-our-team">
        <div className="container44">
          <div className="section-title">
            <h2>Meet Our Medical Team</h2>
          </div>
          <div className="team-grid">
            <div className="team-member">
              <img src={m8} alt="Dr. Chintha" />
              <h3>Dr. Chintha</h3>
              <p>Dr. Chintha is a skilled geriatric psychiatrist at Care Home, specializing in the mental health and well-being of elderly residents. With a deep understanding of age-related cognitive and emotional challenges, she provides compassionate care that promotes mental resilience and emotional stability.</p>
            </div>
            <div className="team-member">
              <img src={m1} alt="Dr. Shiroma" />
              <h3>Dr. Shiroma</h3>
              <p>Dr. Shiroma is a compassionate palliative care specialist at Care Home, focusing on providing comfort and support to elderly residents with serious illnesses. Her gentle and empathetic approach ensures that residents receive the highest standard of care during challenging times.</p>
            </div>
            <div className="team-member">
              <img src={m2} alt="Dr. Achintha" />
              <h3>Dr. Achintha</h3>
              <p>Dr. Achintha is a renowned physical therapist at Care Home, specializing in mobility and rehabilitation for elderly residents. With her expertise in physical therapy, she helps residents maintain their independence and improve their physical well-being.</p>
            </div>
            <div className="team-member">
              <img src={m3} alt="Dr. Nimath" />
              <h3>Dr. Nimath</h3>
              <p>Dr. Nimath is a dedicated consultant at Care Home, renowned for providing exceptional care and guidance to elderly residents. With extensive qualifications in geriatrics and a warm, compassionate approach, Dr. Nimath ensures that each resident receives personalized attention and the highest quality of medical care.</p>
            </div>
            <div className="team-member">
              <img src={m4} alt="Dr. David" />
              <h3>Dr. David</h3>
              <p>Dr. David is a respected neurologist at Care Home, specializing in age-related neurological conditions such as Alzheimer's and Parkinson's disease. With his extensive expertise, he offers comprehensive care and management strategies for residents facing neurological challenges.</p>
            </div>
            <div className="team-member">
              <img src={m5} alt="Dr. Anil" />
              <h3>Dr. Anil</h3>
              <p>Dr. Anil is a highly experienced geriatrician at Care Home, dedicated to the overall health and longevity of elderly residents. His extensive knowledge in managing chronic conditions and age-related illnesses allows him to develop tailored treatment plans that improve residents' quality of life.</p>
            </div>
            <div className="team-member">
              <img src={m6} alt="Dr. Dhinayaa" />
              <h3>Dr. Dhinayaa</h3>
              <p>Dhinayaa is a dedicated nutritionist at Care Home, specializing in the dietary needs of elderly residents. With a deep understanding of age-related nutritional requirements, she creates personalized meal plans that promote overall health and well-being.</p>
            </div>
            <div className="team-member">
              <img src={m7} alt="Dr. Natasha" />
              <h3>Dr. Natasha</h3>
              <p>Natasha is a skilled nutritionist at Care Home, focused on enhancing the nutritional care of elderly residents. Her expertise in developing tailored diets addresses the unique dietary needs of seniors, ensuring they receive the proper nutrients to thrive.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="newf" >
      <Footer />
      </div>
    </div>
  );
}

export default Mediservice;