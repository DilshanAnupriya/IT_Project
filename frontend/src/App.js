import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from "./Pages/Home/Home";
import New_Dash from "./Components/new_Dashboard/New_Dashboard"

//Volunteer
import Volunteer from "./Pages/Volunteers/VolunteerHome"; //Home
import Vol from "./Pages/Volunteers//VolunteerRegistration"; //Client-side registration
import VolunteerDisplay from "./Pages/Volunteers/Volunteer/VolunteerDisplay"  //display details of volunteers
import Vol_update from "./Pages/Volunteers/Volunteer/VolunteerPdUpdate" //Dashboard Update Volunteer details
import Vol_dash_reg from "./Pages/Volunteers/Volunteer/Volunteer_dash_reg"; //Dashboard registration
import TaskDisplay from "./Pages/Volunteers/task/TaskDisplay"; //Dashboard task Display
import TaskCreate from "./Pages/Volunteers/task/TaskCreate";//create task page dashboard
import TaskUpdate from "./Pages/Volunteers/task/TaskUpdate";//update task page dashboard
import ScheduleDisplay from "./Pages/Volunteers/Schedule/ScheduleD";//display schedule page dashboard
import ScheduleUpdate from "./Pages/Volunteers/Schedule/ScheduleU";//update task page dashboard
import CertificateD from "./Pages/Volunteers/Certificate/CertificateD";//update task page dashboard
import CertificateC from "./Pages/Volunteers/Certificate/CertificateC";//update task page dashboard
import CertificateU from "./Pages/Volunteers/Certificate/CertificateU";//update task page dashboard
import UTD from "./Pages/Volunteers/User-Task/UserTask";//update task page dashboard
import USC from "./Pages/Volunteers/User-Task/USchedule"

import EmpDashForm from "./Pages/Employee/EmpDash";
import empAvalForm from "./Pages/Employee/EmpAvalForm"
import EmpReqFormDis from "./Pages/Employee/EmpReqFormDis"
import EmpForm from "./Pages/Employee/EmpForm";









function App() {
  return (
    <div>

      <React.Fragment>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mainHome' element={<Home />} />
          <Route path='/NewDash' element={<New_Dash />} />

          <Route path='/vol-reg' element={<Vol />} />
          <Route path='/volunteer' element={<Volunteer />} />
          <Route path='/volunteer_pd_update' element={<Vol_update />} />
          <Route path='/volunteer_pd_update/:id' element={<Vol_update />} />
          <Route path='/vol_dash_register' element={<Vol_dash_reg />} />
          <Route path='/Display' element={<VolunteerDisplay />} />
          <Route path='/TaskDisplay' element={<TaskDisplay />} />
          <Route path='/TaskCreate' element={<TaskCreate />} />
          <Route path='/TaskUpdate/:id' element={<TaskUpdate />} />
          <Route path='/ScheduleDisplay' element={<ScheduleDisplay />} />
          <Route path='/ScheduleUpdate/:id' element={<ScheduleUpdate />} />
          <Route path='/CertificateDisplay' element={<CertificateD />} />
          <Route path='/CertificateCreate' element={<CertificateC />} />
          <Route path='/CertificateU/:id' element={<CertificateU />} />
          <Route path='/UTaskD' element={<UTD />} />
          <Route path='/USC' element={<USC />} />

          <Route path='/empForm' element={<EmpForm />} />
          <Route path='/empAvalForm' element={<empAvalForm />} />
          <Route path='/EmpReqFormDis' element={<EmpReqFormDis />} />
          <Route path='/EmpDashForm' element={<EmpDashForm />} />

          <Route path='/app' element={<EmpDashForm />} />





        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
