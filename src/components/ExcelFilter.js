import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './ExcelFilter.css'; // Add your CSS styles here

function ExcelFilter() {
  const [colleges, setColleges] = useState([]);
  const [branch, setBranch] = useState('');
  const [filteredColleges, setFilteredColleges] = useState([]);

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setColleges(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  // Filter colleges based on branch and Mumbai
  React.useEffect(() => {
    const filterData = colleges.filter(college => 
      college.city === 'Mumbai' && 
      (branch === '' || college.branch === branch)
    );
    setFilteredColleges(filterData);
  }, [branch, colleges]);

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  return (
    <div className="excel-filter-container">
      <h2>Find Engineering Colleges in Mumbai</h2>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
      <div className="filter-form">
        <label htmlFor="branch">Select Branch:</label>
        <select id="branch" value={branch} onChange={handleBranchChange}>
          <option value="">All Branches</option>
          {/* Add options dynamically or manually */}
          <option value="Computer Engineering">Computer Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          {/* Add more branches as needed */}
        </select>
      </div>
      <div className="college-list">
        {filteredColleges.length > 0 ? (
          filteredColleges.map(college => (
            <div key={college.id} className="college-item">
              <h3>{college.name}</h3>
              <p>Address: {college.address}</p>
              <p>Branch: {college.branch}</p>
            </div>
          ))
        ) : (
          <p>No colleges found for the selected branch.</p>
        )}
      </div>
    </div>
  );
}

export default ExcelFilter;
