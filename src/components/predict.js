import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './predict.css';
import logo from './logo.svg';

function Predict({ onBookmark }) {  // Accept onBookmark as a prop
  const [percentile, setPercentile] = useState('');
  const [branch, setBranch] = useState('');
  const [seatType, setSeatType] = useState('');
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    Papa.parse('/colleges.csv', {
      download: true,
      header: true,
      complete: (results) => {
        setColleges(results.data);
      },
      error: (error) => {
        console.error('Error reading the CSV file:', error);
        alert('Error reading the CSV file. Please ensure the file is correctly formatted.');
      }
    });
  }, []);

  useEffect(() => {
    if (percentile === '' || branch === '' || seatType === '') {
      setFilteredColleges([]);
      setShowResults(false);
      return;
    }

    const filtered = colleges.filter(college => {
      const minPercentile = parseFloat(college.min);
      const maxPercentile = parseFloat(college.max);
      const userPercentile = parseFloat(percentile);

      return (
        userPercentile >= minPercentile &&
        userPercentile <= maxPercentile &&
        college.branch.trim().toLowerCase() === branch.trim().toLowerCase() &&
        college.seat_type.trim().toLowerCase() === seatType.trim().toLowerCase()
      );
    });

    setFilteredColleges(filtered);
    setShowResults(true);
  }, [percentile, branch, seatType, colleges]);

  const handlePercentileChange = (e) => {
    setPercentile(e.target.value);
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleSeatTypeChange = (e) => {
    setSeatType(e.target.value);
  };

  const handleBookmarkClick = (college) => {
    onBookmark(college);  // Call the onBookmark prop with the selected college
  };

  return (
    <div className="predict-container">
      <img src={logo} alt="Logo" className="logo" />
      <h2 className="predict-title">Predict your rank</h2>
      <div className="predict-form">
        <label htmlFor="percentile">Enter Your Percentile:</label>
        <input
          type="number"
          id="percentile"
          value={percentile}
          onChange={handlePercentileChange}
          placeholder="Enter percentile"
        />
        <label htmlFor="branch">Select Your Branch:</label>
        <input
          type="text"
          id="branch"
          value={branch}
          onChange={handleBranchChange}
          placeholder="Enter branch"
        />
        <label htmlFor="seat_type">Select Seat Type:</label>
        <input
          type="text"
          id="seat_type"
          value={seatType}
          onChange={handleSeatTypeChange}
          placeholder="Enter seat type"
        />
        
        {showResults && (
          <div className="college-list">
            {filteredColleges.length > 0 ? (
              filteredColleges.map((college, index) => (
                <div key={index} className="college-item">
                  <h3>{college.college_name}</h3>
                  <p>Branch: {college.branch}</p>
                  <p>Seat Type: {college.seat_type}</p>
                  <p>Percentile Range: {college.min} - {college.max}</p>
                  <button onClick={() => handleBookmarkClick(college)}>Bookmark</button>
                </div>
              ))
            ) : (
              <p>No colleges found for the given percentile, branch, and seat type.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Predict;
