import React, { useState, useEffect } from 'react';
import './Search.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [branchFilter, setBranchFilter] = useState('');
  const [seatTypeFilter, setSeatTypeFilter] = useState('');

  // Fetch the colleges data from the CSV file
  useEffect(() => {
    const fetchColleges = async () => {
      const response = await fetch('/colleges.csv');
      const text = await response.text();
      const rows = text.split('\n').slice(1); // Skip the header row
      const collegesArray = rows.map(row => {
        const columns = row.split(',').map(column => column.trim().replace(/"/g, ''));
        
        // Join parts up to the second comma for college_name
        const collegeNameParts = columns.slice(0, 2); 
        const college_name = collegeNameParts.join(', ');

        // Extract area and city if available
        const area = columns[1] || 'Unknown Area';
        const city = columns[2] || 'Unknown City';

        return {
          college_name,  // Complete college name including parts with commas
          area,  // Area
          city,  // City
          score_type: columns[3], // Score Type
          seat_type: columns[4], // Seat Type
          branch: columns[5], // Branch
          sum: columns[6], // Sum
          count: columns[7], // Count
          max_percentile: columns[8], // Max Percentile
          min_percentile: columns[9], // Min Percentile
          mean: columns[10], // Mean
          max_min: columns[11], // Max - Min
          max_mean: columns[12], // Max - Mean
        };
      });
      setColleges(collegesArray);
    };

    fetchColleges();
  }, []);

  // Extract unique options for filters
  const uniqueBranches = [...new Set(colleges.map(college => college.branch))];
  const uniqueSeatTypes = [...new Set(colleges.map(college => college.seat_type))];

  // Handle search functionality
  const handleSearch = () => {
    const results = colleges.filter(college => {
      const matchesSearchTerm = college.college_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBranch = branchFilter ? college.branch === branchFilter : true;
      const matchesSeatType = seatTypeFilter ? college.seat_type === seatTypeFilter : true;

      return matchesSearchTerm && matchesBranch && matchesSeatType;
    });
    setFilteredColleges(results);
  };

  return (
    <div className="search-container">
      <h1>Search for Colleges</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter college name"
      />

      <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)}>
        <option value="">All Branches</option>
        {uniqueBranches.map((branch, index) => (
          <option key={index} value={branch}>{branch}</option>
        ))}
      </select>

      <select value={seatTypeFilter} onChange={(e) => setSeatTypeFilter(e.target.value)}>
        <option value="">All Seat Types</option>
        {uniqueSeatTypes.map((seatType, index) => (
          <option key={index} value={seatType}>{seatType}</option>
        ))}
      </select>

      <button onClick={handleSearch}>Search</button>

      <div className="results">
        {filteredColleges.length > 0 ? (
          <table className="college-table">
            <thead>
              <tr>
                <th>College Name</th>
                <th>Area</th>
                <th>City</th>
                <th>Score Type</th>
                <th>Seat Type</th>
                <th>Branch</th>
                <th>Sum</th>
                <th>Count</th>
                <th>Max Percentile</th>
                <th>Min Percentile</th>
                <th>Mean</th>
                <th>Max - Min</th>
                <th>Max - Mean</th>
              </tr>
            </thead>
            <tbody>
              {filteredColleges.map((college, index) => (
                <tr key={index}>
                  <td>{college.college_name}</td>
                  <td>{college.area}</td>
                  <td>{college.city}</td>
                  <td>{college.score_type}</td>
                  <td>{college.seat_type}</td>
                  <td>{college.branch}</td>
                  <td>{college.sum}</td>
                  <td>{college.count}</td>
                  <td>{college.max_percentile}</td>
                  <td>{college.min_percentile}</td>
                  <td>{college.mean}</td>
                  <td>{college.max_min}</td>
                  <td>{college.max_mean}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No colleges found.</p>
        )}
      </div>
    </div>
  );
}

export default Search;
