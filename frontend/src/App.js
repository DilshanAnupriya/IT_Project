import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from "./Pages/Home/Home";
import Vol from "./Pages/Volunteers/VolunteerRegistration";
import Volunteer from "./Pages/Volunteers/VolunteerHome";




import EmpDashForm from "./Pages/Employee/EmpDash";
function App() {
  return (
    <div>

      <React.Fragment>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mainHome' element={<Home />} />
          <Route path='/vol-reg' element={<Vol />} />
          <Route path='/volunteer' element={<Volunteer />} />

          <Route path='/EmpDashForm' element={<EmpDashForm />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
