import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Review from './pages/client/Review'
import Complaints from './pages/client/Complaints'
import AdminViewReviewPage from './pages/admin/reviews'
import AdminViewComplaintPage from './pages/admin/complaints'
import ReviewAndComplaintChart from './pages/admin/ReportDocument'

function App() {

  localStorage.setItem('userid', '5a9427648b0beebeb6957bda')

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Review />} />
        <Route path='/admin-review' element={<AdminViewReviewPage />} />
        <Route path='/admin-complaint' element={<AdminViewComplaintPage />} />
        <Route path='/complaints' element={<Complaints />} />
        <Route path='/report' element={<ReviewAndComplaintChart />} />
      </Routes>
    </Router>
  )
}

export default App
