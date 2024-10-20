import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './bookmark.css'; // Ensure to import your CSS file

function Bookmark({ bookmarkedColleges, onDelete }) {
  const navigate = useNavigate();
  const bookmarkRef = useRef(null);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  const handleShowInfo = (college) => {
    navigate(`/college-info/${encodeURIComponent(college.college_name)}`, { state: { college } });
  };

  const handleScroll = () => {
    const container = bookmarkRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
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
        overflowY: isScrollEnabled ? 'auto' : 'hidden',
        maxHeight: '120vh',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
      }}
    >
      <h2>Bookmarked Colleges</h2>
      {bookmarkedColleges.length > 0 ? (
        <table className="college-table">
          <thead>
            <tr>
              <th>College Name</th>
              <th>Branch</th>
              <th>Seat Type</th>
              <th>Percentile Range</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookmarkedColleges.map((college, index) => (
              <tr key={index}>
                <td>{college.college_name}</td>
                <td>{college.branch}</td>
                <td>{college.seat_type}</td>
                <td>{college.min} - {college.max}</td>
                <td>
                  <button onClick={() => handleShowInfo(college)}>Show Info</button>
                  <button onClick={() => onDelete(college.college_name)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookmarked colleges yet.</p>
      )}
    </div>
  );
}

export default Bookmark;
