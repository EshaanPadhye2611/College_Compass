import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './bookmark.css'; // Ensure to import your CSS file

function Bookmark({ bookmarkedColleges, onDelete }) {
  const navigate = useNavigate();
  const bookmarkRef = useRef(null);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  const handleShowInfo = (college) => {
    // Pass the entire college object instead of just the name
    navigate(`/college-info/${encodeURIComponent(college.college_name)}`, { state: { college } });
  };

  // Function to handle scroll
  const handleScroll = () => {
    const container = bookmarkRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;

      // Enable scroll only if the user is near the bottom
      if (scrollTop + clientHeight >= scrollHeight - 50) { // 50px from the bottom
        setIsScrollEnabled(true);
      } else {
        setIsScrollEnabled(false);
      }
    }
  };

  useEffect(() => {
    const container = bookmarkRef.current;

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div
      className="bookmark-container"
      ref={bookmarkRef}
      style={{
        overflowY: isScrollEnabled ? 'auto' : 'hidden', // Control scrolling
        maxHeight: '80vh', // Set a maximum height for the container
        padding: '20px', // Add some padding
        border: '1px solid #ccc', // Optional: Add a border for clarity
        borderRadius: '8px', // Rounded corners
        backgroundColor: '#ffffff', // Optional: White background for contrast
      }}
    >
      <h2>Bookmarked Colleges</h2>
      {bookmarkedColleges.length > 0 ? (
        <div className="college-list">
          {bookmarkedColleges.map((college, index) => (
            <div key={index} className="college-item">
              <h3>{college.college_name}</h3>
              <p>Branch: {college.branch}</p>
              <p>Seat Type: {college.seat_type}</p>
              <p>Percentile Range: {college.min} - {college.max}</p>
              <button onClick={() => handleShowInfo(college)}>Show Info</button>
              <button onClick={() => onDelete(college.college_name)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookmarked colleges yet.</p>
      )}
    </div>
  );
}

export default Bookmark;
