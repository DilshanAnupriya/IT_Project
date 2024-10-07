import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';

import ClientReview from './Pages/client/ClientReview';
import ClientComplaints from './Pages/client/ClientComplaints';
import AdminViewReviewPage from './Pages/admin/AdminReviews'
import ComplainAdminView from './Pages/admin/ComplainAdminView';
import ReviewComplaintAdminChart from './Pages/admin/ReviewComplaintAdminChart';

function App() {

  localStorage.setItem('userid', '5a9427648b0beebeb6957bda')
  return (
    <div>

      <React.Fragment>
        <Routes>
          <Route path='/' element={<ClientReview />} />
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
