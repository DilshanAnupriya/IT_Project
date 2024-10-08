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
import USC from "./Pages/Volunteers/User-Task/USchedule"


import EmpDashForm from "./Pages/Employee/EmpDash";
import empAvalForm from "./Pages/Employee/EmpAvalForm"
import EmpReqFormDis from "./Pages/Employee/EmpReqFormDis"
import EmpForm from "./Pages/Employee/EmpForm";


import ViewA from "./Pages/Appointment/ViewA";
import AddA from "./Pages/Appointment/AddA";
import UpA from "./Pages/Appointment/UpdateA";
import ViewU from "./Pages/User/ViewU";
import AddU from "./Pages/User/AddU";
import UpU from "./Pages/User/UpdateU.js";

import ViewC from "./Pages/Care Plan/ViewC";
import AddC from "./Pages/Care Plan/AddC";
import UpC from "./Pages/Care Plan/UpdateC";



import ClientReview from './Pages/Suwani/client/ClientReview.js';
import ClientComplaints from './Pages/Suwani/client/ClientComplaints.js';
import AdminViewReviewPage from './Pages/Suwani/admin/AdminReviews.js'
import ComplainAdminView from './Pages/Suwani/admin/ComplainAdminView.js';
import ReviewComplaintAdminChart from './Pages/Suwani/admin/ReviewComplaintAdminChart.js';





function App() {
  localStorage.setItem('userid', '5a9427648b0beebeb6957bda')
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
          <Route path='/USC' element={<USC />} />


          <Route path='/empForm' element={<EmpForm />} />
          <Route path='/empAvalForm' element={<empAvalForm />} />
          <Route path='/EmpReqFormDis' element={<EmpReqFormDis />} />
          <Route path='/EmpDashForm' element={<EmpDashForm />} />

          <Route path='/ViewA' element={<ViewA />} />
          <Route path='/AddA' element={<AddA />} />
          <Route path='/UpdateA/:id' element={<UpA />} />
          <Route path='/ViewU' element={<ViewU />} />
          <Route path='/AddU' element={<AddU />} />
          <Route path='/UpU/:id' element={<UpU />} />
          <Route path='/ViewC' element={<ViewC />} />
          <Route path='/AddC' element={<AddC />} />
          <Route path='/UpC/:id' element={<UpC />} />
          <Route path='/UpU/:id' element={<UpU />} />



          <Route path='/client-review' element={<ClientReview />} />
          <Route path='/complaints' element={<ClientComplaints />} />
          <Route path='/admin-review' element={<AdminViewReviewPage />} />
          <Route path='/admin-complaint' element={<ComplainAdminView />} />
          <Route path='/report' element={<ReviewComplaintAdminChart />} />


        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
