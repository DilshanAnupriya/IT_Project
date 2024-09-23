import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from "./Pages/Home/Home";
import Vol from "./Pages/Volunteers/VolunteerRegistration";
import Volunteer from "./Pages/Volunteers/VolunteerHome";
import Vol_pd from "./Pages/Volunteers/VolunteerProfileDash"
import Vol_update from "./Pages/Volunteers/VolunteerPdUpdate"





import Med_services from "./Pages/MedOfficerdetails/medservices";

function App() {
  return (
    <div>

      <React.Fragment>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mainHome' element={<Home />} />
          <Route path='/vol-reg' element={<Vol />} />
          <Route path='/volunteer' element={<Volunteer />} />
          <Route path='/volunteer_pd' element={<Vol_pd />} />
          <Route path='/volunteer_pd_update' element={<Vol_update />} />
          <Route path='/medservice' element={<Med_services />} />

        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
