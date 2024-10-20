import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/nav_bar';
import Dashboard from './components/dashboard';
import Search from './components/Seacrh'; // Import the Search component
import CollegeDetails from './components/college_details';
import Bookmark from './components/bookmark';
import Predict from './components/predict';

function App() {
  console.log('App is rendering');
  const [bookmarkedColleges, setBookmarkedColleges] = useState([]);

  const handleBookmark = (college) => {
    setBookmarkedColleges([...bookmarkedColleges, college]);
  };

  const handleDeleteBookmark = (collegeName) => {
    setBookmarkedColleges(bookmarkedColleges.filter(college => college.college_name !== collegeName));
  };

  return (
    <div className="App">
      {/* Always render Navbar */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<Search />} /> {/* New route for Search */}
        <Route path="/college-info/:collegeName" element={<CollegeDetails />} />
        <Route path="/bookmarks" element={
          <Bookmark 
            bookmarkedColleges={bookmarkedColleges} 
            onDelete={handleDeleteBookmark} 
          />
        } />
        <Route path="/predict" element={<Predict onBookmark={handleBookmark} />} />
      </Routes>
    </div>
  );
}

export default App;
