import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from "./Pages/Home/Home";
import Vol from "./Pages/Volunteers/VolunteerRegistration";
import Vol_dash_reg from "./Pages/Volunteers/Volunteer_dash_reg";
import Volunteer from "./Pages/Volunteers/VolunteerHome";
import Vol_pd from "./Pages/Volunteers/VolunteerProfileDash"
import Vol_update from "./Pages/Volunteers/VolunteerPdUpdate"
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
          <Route path='/volunteer_pd_update/:id' element={<Vol_update />} />
          <Route path='/vol_dash_register' element={<Vol_dash_reg />} />

        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
