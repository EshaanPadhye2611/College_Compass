import React, { useState } from 'react';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import './register.css';
import logo from './logo.svg'; 

function Register() {
  const [formData, setFormData] = useState({
   
    email: '',
    password: '',
    
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Prepare data for server
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== 'password') { // Do not send password to server
          formDataToSend.append(key, formData[key]);
        }
      });
      formDataToSend.append('uid', user.uid); // Include Firebase user ID

      // Send additional user data to server
      await axios.post('/api/register', formDataToSend);
      alert('Registration successful!');
      // Redirect to login or home page after successful registration
    } catch (error) {
      alert('Error during registration: ' + error.message);
    }
  };

  return (
    <div className="register-container">
      <img src={logo} alt="Logo" className="logo" />
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-columns">
          <div className="column">
            <input type="text" name="name" placeholder="Name" onChange={handleChange} className="input-field" required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input-field" required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input-field" required />
            <input type="number" name="percentile" placeholder="Percentile" onChange={handleChange} className="input-field" required />
          </div>
          <div className="column">
            <input type="text" name="caste" placeholder="Caste" onChange={handleChange} className="input-field" required />
            <input type="text" name="hometown" placeholder="Hometown" onChange={handleChange} className="input-field" required />
            <input type="text" name="preferredBranch" placeholder="Preferred Branch" onChange={handleChange} className="input-field" required />
            <input type="file" name="image" onChange={handleFileChange} className="input-field" />
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
