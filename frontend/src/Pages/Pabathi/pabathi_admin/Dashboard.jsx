import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="stats">
        <div className="stat-box">Pending Applications</div>
        <div className="stat-box">Residents</div>
        <div className="stat-box">Guardians</div>
      </div>

      <div className="activity-chart">
        <h3>Recent Activity</h3>
        <div className="chart">
          {/* You can integrate a chart library like Chart.js here */}
          <img src="/path/to/chart" alt="chart" />
        </div>
      </div>

      <button className="back-btn">Back</button>
    </div>
  );
};

export default Dashboard;
