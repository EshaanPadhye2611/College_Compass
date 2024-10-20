import React from 'react';
import './dashboard.css';
import Navbar from './nav_bar'; 
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import symbol from './symbol.svg'; // Import the SVG symbol

function Dashboard() {
  console.log('Dashboard is rendering');
  return (
    <div className="dashboard-container">
      <div className="content-container">
        <h1 className="animated-welcome">Welcome to College Compass</h1>
        <p className="sub-message">Start navigating your career choice</p> {/* Sub-message here */}
        
        {/* Button to navigate to Search.js */}
        <Link to="/search">
          <button className="navigate-button">
            <img src={symbol} alt="Navigate Icon" className="button-icon" /> {/* SVG symbol */}
            Navigate Here
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
