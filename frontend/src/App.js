import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from "./Pages/Home/Home";
import Vol from "./Pages/Volunteers/VolunteerRegistration";
import Volunteer from "./Pages/Volunteers/VolunteerHome";
import EmpForm from "./Pages/Employee/EmpForm";
function App() {
  return (
    <div>

      <React.Fragment>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mainHome' element={<Home />} />
          <Route path='/vol-reg' element={<Vol />} />
          <Route path='/volunteer' element={<Volunteer />} />
          <Route path= '/empForm' element={<EmpForm />}/>

        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
