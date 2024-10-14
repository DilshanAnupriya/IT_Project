import React, { useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Register required elements and scales
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Charts = () => {
  const chartRef = useRef(null);

  // Bar chart data for applications per month
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Number of Applications',
        data: [50, 70, 45, 90, 65, 80], // Example data: applications per month
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Doughnut chart data for approved and pending applications
  const doughnutData = {
    labels: ['Approved Applications', 'Pending Applications'],
    datasets: [
      {
        label: 'Applications Status',
        data: [200, 50], // Example data: approved vs pending applications
        backgroundColor: ['#4BC0C0', '#FFCE56'], // Colors for approved and pending
        hoverBackgroundColor: ['#4BC0C0', '#FFCE56'],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Applications per Month',
      },
    },
  };

  const doughnutOptions = {
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Approved vs Pending Applications',
      },
    },
  };

  // Print logic to download charts as a PDF
  const handlePrint = async () => {
    const input = document.getElementById('charts-container');
    const header = document.getElementById('header-container');
    const signature = document.getElementById('signature-container');

    const canvasHeader = await html2canvas(header);
    const canvasCharts = await html2canvas(input);
    const canvasSignature = await html2canvas(signature);

    const imgDataHeader = canvasHeader.toDataURL('image/png');
    const imgDataCharts = canvasCharts.toDataURL('image/png');
    const imgDataSignature = canvasSignature.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190; // Adjust for A4 page width
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvasCharts.height * imgWidth) / canvasCharts.width;

    pdf.addImage(imgDataHeader, 'PNG', 10, 10, imgWidth, (canvasHeader.height * imgWidth) / canvasHeader.width);
    pdf.addImage(imgDataCharts, 'PNG', 10, 30, imgWidth, imgHeight);
    pdf.addImage(imgDataSignature, 'PNG', 10, 30 + imgHeight + 10, imgWidth, (canvasSignature.height * imgWidth) / canvasSignature.width);
    
    pdf.save('charts.pdf');
  };

  useEffect(() => {
    const chartInstance = chartRef.current;

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div>
      {/* Header with Logo */}
      <div id="header-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <img src="/logo.jpeg" alt="logo" width={150} style={{ borderRadius: '10px' }} />
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Elder Care Home</p>
      </div>
      
      <button onClick={handlePrint} style={{ marginBottom: '20px', padding: '10px 20px', background: '#4BC0C0', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
        Download as PDF
      </button>

      <div id="charts-container" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
        {/* Bar Chart */}
        <div style={{ width: '48%' }}>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Doughnut Chart */}
        <div style={{ width: '48%' }}>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>

      {/* Signature */}
      <div id="signature-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <img src="sign.jpeg" alt="signature" width={150} />
      </div>
    </div>
  );
};

export default Charts;
