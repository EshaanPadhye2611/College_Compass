// src/components/nav_bar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../firebaseConfig'; // Ensure this is the correct path to your Firebase config
import { signOut } from 'firebase/auth'; // Import signOut function
import './nav_bar.css'; // Ensure you have your existing CSS file

function Navbar() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      localStorage.removeItem('userId'); // Clear user ID from local storage
      console.log('User signed out');
      navigate('/'); // Redirect to the home or dashboard page
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-title">
          <FontAwesomeIcon icon={faCompass} className="navbar-icon" />
          College Compass
        </Link>
      </div>
      <div className="navbar-links">
        
        <Link to="/bookmarks">Bookmarks</Link>
        <Link to="/predict">Predict</Link>
        
      </div>
    </nav>
  );
}

export default Navbar;
