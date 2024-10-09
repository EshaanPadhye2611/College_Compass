import React from 'react';
import logo from './logo.svg'; // Import the logo image
import './dashboard.css';
import Navbar from './nav_bar'; 

function Dashboard() {
  console.log('Dashboard is rendering');
  return (
    <div className="dashboard-container">
      <div className="content-container">
        <img src={logo} alt="College Compass Logo" className="logo" /> {/* Logo here */}
        <h1>Welcome to College Compass</h1>
      </div>
    </div>
  );
}

export default Dashboard;
