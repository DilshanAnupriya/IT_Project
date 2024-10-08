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


import EmpDashForm from "./Pages/Employee/EmpDash";
import empAvalForm from "./Pages/Employee/EmpAvalForm"
import EmpReqFormDis from "./Pages/Employee/EmpReqFormDis"
import EmpForm from "./Pages/Employee/EmpForm";


//mobility support
import Add_Shedule from './Pages/mobility_support/Therapy/Add-Shedule';
import All_Shedule from './Pages/mobility_support/Therapy/All_Shedule';
import TherapySession from './Pages/mobility_support/Therapy/TherapySession';
import MHome from "./Pages/mobility_support/Therapy/Home";
import EditShedule from './Pages/mobility_support/Therapy/EditShedule';
import ViewOne from './Pages/mobility_support/Therapy/ViewOne';
import Update from './Pages/mobility_support/Therapy/Update';
import Delete from './Pages/mobility_support/Therapy/Delete';

import MobilityReqest from './Pages/mobility_support/MobilityRequests/MobilityReqest';
import AddRequest from './Pages/mobility_support/MobilityRequests/AddReqest';
import EditRequest from './Pages/mobility_support/MobilityRequests/EditRequest';
import RemoveRequest from './Pages/mobility_support/MobilityRequests/RemoveReqest';
import ViewOneRequest from './Pages/mobility_support/MobilityRequests/ViewOneReqest';
import AllRequest from './Pages/mobility_support/MobilityRequests/AllReqest';

import MobilityEquipments from './Pages/mobility_support/MobilityEquipments/mobilityequipments';

import AddEquipments from './Pages/mobility_support/MobilityEquipments/AddEquipments';
import AllEquipments from './Pages/mobility_support/MobilityEquipments/AllEquipments';
import EditEquipments from './Pages/mobility_support/MobilityEquipments/EditEquipments';
import Removee from './Pages/mobility_support/MobilityEquipments/DeleteEquiipments';

import LogOut from './Pages/mobility_support/logout';
import Profile from './Pages/mobility_support/profile';
import Settings from './Pages/mobility_support/settings';

import Elder from './Pages/mobility_support/Elder';
import Overview from './Pages/Overview ';
import ManageProfile from './Pages/mobility_support/ManageProfile';
import Sidebar from './Pages/Header';


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

          <Route path='/empForm' element={<EmpForm />} />
          <Route path='/empAvalForm' element={<empAvalForm />} />
          <Route path='/EmpReqFormDis' element={<EmpReqFormDis />} />
          <Route path='/EmpDashForm' element={<EmpDashForm />} />

          {/*mobility_support*/}
          <Route path = "/radd" exact element = {<AddRequest />} />
         <Route path = "/rremove/:id" exact element = {<RemoveRequest />} />
         <Route path = "/redit/:id" exact element = {<EditRequest />} />
         <Route path = "/rviewone/:id" exact element = {<ViewOneRequest />} />
         <Route path = "/rall" exact element = {<AllRequest />} />
        <Route path = "/request" exact element = {<MobilityReqest />} />
        <Route path='/remequip/:id' exact element = {<Removee/>} />
        <Route path = "/allequipments" exact element = {<AllEquipments />} />
        <Route path = "/addequipmnts" exact element = {<AddEquipments />} />
        <Route path = "/equipments" exact element = {<MobilityEquipments />}/>
        <Route path = "/deletee/:id" exact element = {<Delete />} />
        <Route path = "/Update" exact element = {<Update />} />
        <Route path = "/mobility" exact element = {<MHome/>} />
        <Route path = "/ViewOne/:id" exact element = {<ViewOne />} />
        <Route path = "/EditShedule/:id" exact element = {<EditShedule />} />
        <Route path="/alls" exact element = {<All_Shedule/>}  />
        <Route path="/Therapy" exact element = {<TherapySession/>} />
       <Route path="/add" exact element ={<Add_Shedule />} />
        <Route path="/settings" exact element ={<Settings />} />
        <Route path="/logout" exact element ={<LogOut />} />
        <Route path="/profile" exact element ={<Profile />} />
        <Route path="/eedit/:id" exact element ={<EditEquipments />} />
        <Route path="/Overview/" exact element ={<Overview/>} />
        <Route path="/elder" exact element ={<Elder/>} />
       <Route path ="/mngeprof/:id" exact element ={<ManageProfile/>} />
       <Route path = "/header" exact element = {<Sidebar/>} />




        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
