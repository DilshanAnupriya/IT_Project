import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../../Components/Sidebar.js";
import NavBar from "../../Components/Navbar.js";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const ReviewComplaintAdminChart = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [reportLoading, setReportLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/complaint/review-and-complaint');
      setData(res.data); // Assuming data contains an array of complaints/reviews
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterDataByType = (type) => {
    return data.filter(item => item.type === type);
  };

  // Prepare data for Bar Chart (Number of complaints vs reviews)
  const barData = {
    labels: ['Reviews', 'Complaints'],
    datasets: [{
      label: 'Count',
      data: [filterDataByType('r').length, filterDataByType('c').length],
      backgroundColor: ['#36A2EB', '#FF6384'],
    }]
  };

  // Prepare data for Pie Chart (Distribution of ratings)
  const ratingsData = data.filter(item => item.rating);
  const ratingCount = [1, 2, 3, 4, 5].map(rating => ratingsData.filter(item => item.rating === rating).length);
  const pieData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [{
      label: 'Rating Distribution',
      data: ratingCount,
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    }]
  };

  // Prepare data for Line Chart (Number of submissions over time)
  const lineData = {
    labels: data.map(item => item.date),
    datasets: [{
      label: 'Submissions Over Time',
      data: data.map(item => item.rating ? 1 : 0), // Use your data field here
      fill: false,
      borderColor: '#36A2EB',
    }]
  };

  const downloadPDF = async () => {
    setReportLoading(true);
    const input = document.getElementById('charts');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);
    pdf.save('report.pdf');
    setReportLoading(false);
    toast.success('PDF downloaded successfully!');
  };

  return (
    <section className="flex bg-[#D5D6D9] min-h-screen">
 
      <Sidebar />
      <div className="flex-1 flex flex-col">

        <NavBar />

        <div className="flex-1 p-8">
          <h1 className="text-2xl font-semibold mb-6">Review and Complaint Charts</h1>

          <div id="charts" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Reviews vs Complaints</h2>
              <Bar data={barData} />
            </div>

            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Ratings Distribution</h2>
              <Pie data={pieData} />
            </div>

            <div className="bg-white p-4 shadow rounded-lg col-span-2">
              <h2 className="text-xl font-semibold mb-4">Submissions Over Time</h2>
              <Line data={lineData} />
            </div>
          </div>

          <button
            onClick={downloadPDF}
            className={`bg-blue-700 text-white py-2 px-4 rounded ${reportLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={reportLoading}
          >
            {reportLoading ? 'Generating PDF...' : 'Get Report'}
          </button>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ReviewComplaintAdminChart;
