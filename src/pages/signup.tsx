import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../state/UserContext'; // Import UserContext
import { saveToLocalStorage } from '../utils/localStorageUtils'; // Import utility for local storage

const SignUp: React.FC = () => {
  const { setUserData } = useUserContext(); // Access global state management
  const navigate = useNavigate(); // Initialize navigation

  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    dateOfBirth: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.gender ||
      !formData.dateOfBirth
    ) {
      alert('Please complete all fields before proceeding.');
      return;
    }

    // Update global state with sign-up data
    const updatedUserData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
    };
    setUserData((prev) => ({ ...prev, ...updatedUserData }));

    // Save to local storage for persistence
    saveToLocalStorage('userData', updatedUserData);

    // Navigate to the User Goal page after sign-up
    navigate('/user-goal');
  };

  return (
    <div style={containerStyle}>
      <div style={{ backgroundColor: '#B00020', borderBottom: '10px solid #B00020' }}>
        <h2 style={{ color: 'white', fontSize: '200%' }}>Hashfit</h2>
        <p style={{ fontFamily: 'Roboto', fontSize: '120%', color: 'white' }}>Go Ahead and set up Your account!</p>
        <p style={{ fontSize: '0.7rem', color: 'lightgrey' }}>Sign in-up to enjoy the best Hashfit</p>
      </div>
      <div style={{ backgroundColor: 'white', borderTop: '30px solid white' }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            style={{ ...inputStyle, marginTop: '15px' }}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={{ ...inputStyle, color: 'grey', width: '90%' }}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            style={{ ...inputStyle, color: 'grey' }}
            required
          />
          <button type="submit" style={buttonStyle}>
            Sign Up
          </button>
        </form>

        <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '10px' }}>
          By continuing, you agree to our{' '}
          <a href="#" style={{ color: '#B00020' }}>
            Terms of Use
          </a>{' '}
          &{' '}
          <a href="#" style={{ color: '#B00020' }}>
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

// Styles
const containerStyle: React.CSSProperties = {
  maxWidth: '600px',
  margin: 'auto',
  paddingLeft: '700px',
  paddingTop: '20px',
  textAlign: 'center',
  marginTop: '5px',
  width: '400px',
  height: '500px',
};

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '85%',
  padding: '10px',
  margin: '10px 0',
  border: '1px solid grey',
  borderRadius: '5px',
  backgroundColor: 'white',
  color: 'black',
  marginLeft: '10px',
};

const buttonStyle: React.CSSProperties = {
  display: 'block',
  width: '50%',
  padding: '10px',
  backgroundColor: '#B00020',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  marginTop: '40px',
  marginLeft: '100px',
};

export default SignUp;
