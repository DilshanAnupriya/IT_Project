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



import EmpDashForm from "./Pages/Employee/EmpDash";
import empAvalForm from "./Pages/Employee/EmpAvalForm"
import EmpReqFormDis from "./Pages/Employee/EmpReqFormDis"
import EmpForm from "./Pages/Employee/EmpForm";

//medical 
import MedDashboard from "./Pages/Medical/MedDashboard";
import Meduserreq from './Pages/Medical/Meduserreq';
import MedTaskForm from './Pages/Medical/MedTaskForm';
import PatientUpdate from './Pages/Medical/PatientUpdate';
import NutritionPage from './Pages/Medical/NutritionPage';

import PatientList from './Pages/Medical/PatientList';
import AddPatientForm from './Pages/Medical/AddPatientForm';
import NutritionList from './Pages/Medical/NutritionList';







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


          <Route path='/medDash' element={<MedDashboard />} />
          <Route path='/meduserreq' element={<Meduserreq />} />
          <Route path='/medTaskForm' element={<MedTaskForm />} />
          <Route path='/patientList' element={<PatientList />} />
          <Route path='/addPatient' element={<AddPatientForm />} />
          <Route path="/edit-patient/:id" element={<PatientUpdate />} />
          <Route path='/nutritionList' element={<NutritionList />} />
          <Route path='/nutrition/:id' element={<NutritionPage />} />

          <Route path='/empForm' element={<EmpForm />} />
          <Route path='/empAvalForm' element={<empAvalForm />} />
          <Route path='/EmpReqFormDis' element={<EmpReqFormDis />} />
          <Route path='/EmpDashForm' element={<EmpDashForm />} />





        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
