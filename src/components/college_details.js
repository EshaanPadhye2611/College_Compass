import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import { useParams } from 'react-router-dom';
import stringSimilarity from 'string-similarity';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './college_details.css';

const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const defaultCenter = {
  lat: 37.7749, // Default to San Francisco
  lng: -122.4194,
};

function CollegeDetails() {
  const { collegeName } = useParams();
  const [collegeInfo, setCollegeInfo] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        Papa.parse('/info.csv', {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const formattedCollegeName = decodeURIComponent(collegeName.trim());
            const collegeNames = results.data.map(college => college['College Name'].trim());
            const bestMatch = stringSimilarity.findBestMatch(formattedCollegeName, collegeNames);
            
            if (bestMatch.bestMatch.rating > 0.5) {
              const matchedCollege = results.data[bestMatch.bestMatchIndex];
              setCollegeInfo(matchedCollege);
              
              const lat = parseFloat(matchedCollege['Latitude']);
              const lng = parseFloat(matchedCollege['Longitude']);
              
              if (!isNaN(lat) && !isNaN(lng)) {
                setMapCenter({ lat, lng });
              } else {
                console.warn('Invalid coordinates:', lat, lng);
              }
            } else {
              setCollegeInfo(null);
            }
            setLoading(false);
          },
          error: (error) => {
            console.error('Error reading the CSV file:', error);
            setError('Error reading the CSV file. Please ensure the file is correctly formatted.');
            setLoading(false);
          }
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data.');
        setLoading(false);
      }
    };

    fetchData();
  }, [collegeName]);

  useEffect(() => {
    const scrollToDetails = () => {
      if (detailsRef.current) {
        detailsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const timeoutId = setTimeout(scrollToDetails, 100);
    return () => clearTimeout(timeoutId);
  }, [collegeInfo]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!collegeInfo) {
    return <p>College not found.</p>;
  }

  const link = collegeInfo['Link']?.trim();
  const websiteLink = collegeInfo['Website ']?.trim();
  const imageUrl = collegeInfo['Image']?.trim(); // Get the image URL from the CSV

  return (
    <div className="college-details-container" ref={detailsRef}>
      <div className="college-details-content">
        <div className="college-info">
          <h2>{collegeInfo['College Name']}</h2>
          <p><strong>Genders Accepted:</strong> {collegeInfo['Genders Accepted']}</p>
          <p><strong>Campus Size:</strong> {collegeInfo['Campus Size']}</p>
          <p><strong>Total Student Enrollments:</strong> {collegeInfo['Total Student Enrollments']}</p>
          <p><strong>Total Faculty:</strong> {collegeInfo['Total Faculty']}</p>
          <p><strong>Established Year:</strong> {collegeInfo['Established Year']}</p>
          <p><strong>Rating:</strong> {collegeInfo['Rating']}</p>
          <p><strong>University:</strong> {collegeInfo['University']}</p>
          <p><strong>Courses:</strong> {collegeInfo['Courses']}</p>
          <p><strong>Facilities:</strong> {collegeInfo['Facilities']}</p>
          <p><strong>City:</strong> {collegeInfo['City']}</p>
          <p><strong>State:</strong> {collegeInfo['State']}</p>
          <p><strong>Country:</strong> {collegeInfo['Country']}</p>
          <p><strong>College Type:</strong> {collegeInfo['College Type']}</p>
          <p><strong>Average Fees:</strong> {collegeInfo['Average Fees']}</p>
          <p><strong>Placement:</strong> {collegeInfo['Placement']}</p>
          <p><strong>Location:</strong> {collegeInfo['Location']}</p>

          {link && (
            <p><strong>Link:</strong> <a href={link} target="_blank" rel="noopener noreferrer">{link}</a></p>
          )}

          {websiteLink && (
            <p><strong>College Website:</strong> <a href={websiteLink} target="_blank" rel="noopener noreferrer">{websiteLink}</a></p>
          )}
        </div>

        {imageUrl && (
          <div className="college-image">
            <img src={imageUrl} alt={`${collegeInfo['College Name']} image`} />
          </div>
        )}
      </div>

      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={15}
        >
          <Marker position={mapCenter} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default CollegeDetails;
