import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from "./Pages/Home/Home";
import Vol from "./Pages/Volunteers/VolunteerRegistration";
import Vol_dash_reg from "./Pages/Volunteers/Volunteer_dash_reg";
import Volunteer from "./Pages/Volunteers/VolunteerHome";

import EmpForm from "./Pages/Employee/EmpForm";






import EmpDashForm from "./Pages/Employee/EmpDash";

import Vol_pd from "./Pages/Volunteers/VolunteerProfileDash"
import Vol_update from "./Pages/Volunteers/VolunteerPdUpdate"

import empAvalForm from "./Pages/Employee/EmpAvalForm"


import EmpReqFormDis from "./Pages/Employee/EmpReqFormDis"
import Mform from "./Pages/Medical/Meduserreq"
import Med_Dash from "./Pages/Medical/MedDashboard"
import MedTaskForm from "./Pages/Medical/MedTaskForm"
import Med_update from "./Pages/Medical/MedUpdateTask"


function App() {
  return (
    <div>

      <React.Fragment>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mainHome' element={<Home />} />
          <Route path='/vol-reg' element={<Vol />} />
          <Route path='/volunteer' element={<Volunteer />} />
          <Route path='/Mform' element={<Mform />} />
          <Route path= '/empForm' element={<EmpForm />}/>

          <Route path='/volunteer_pd' element={<Vol_pd />} />

          <Route path='/volunteer_pd_update' element={<Vol_update />} />
          <Route path='/empAvalForm' element={<empAvalForm />} />

          <Route path='/volunteer_pd_update/:id' element={<Vol_update />} />
          <Route path='/vol_dash_register' element={<Vol_dash_reg />} />



          <Route path='/EmpReqFormDis' element={<EmpReqFormDis />} />
          <Route path='/Med_update' element={<Med_update />} />
          <Route path='/EmpDashForm' element={<EmpDashForm />} />
          <Route path='/Med' element={<Med_Dash />} />
          <Route path ='/MedtaskF' element={<MedTaskForm />} />


        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
