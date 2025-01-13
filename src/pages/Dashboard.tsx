import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useUserContext } from '../state/UserContext'; // Import global context
import { getFromLocalStorage } from '../utils/localStorageUtils'; // Local storage utility

// Mock data for the chart
const data = [
  { name: 'Mon', calories: 400, duration: 30 },
  { name: 'Tue', calories: 300, duration: 20 },
  { name: 'Wed', calories: 450, duration: 25 },
  { name: 'Thu', calories: 350, duration: 35 },
  { name: 'Fri', calories: 500, duration: 40 },
  { name: 'Sat', calories: 600, duration: 50 },
  { name: 'Sun', calories: 400, duration: 30 },
];

const Dashboard: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State for the dropdown menu
  const { userData, setUserData } = useUserContext(); // Access global context
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from local storage on component mount
    const savedUserData = getFromLocalStorage('userData');
    if (savedUserData) {
      setUserData((prev) => ({ ...prev, ...savedUserData }));
    }
  }, [setUserData]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavigateToChat = () => navigate('/ai-assistant-chat');

  return (
    <div style={{ width: '50%', margin: 'auto', paddingTop: '20px', fontFamily: 'Raleway, sans-serif' }}>
      <div style={{ backgroundColor: 'white' }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', color: 'black' }}>Dashboard</h1>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: '1.5rem',
                color: 'black',
              }}
              onClick={toggleMenu}
            >
              ☰
            </div>
            {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '30px',
                  left: 0,
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '5px',
                  zIndex: 100,
                }}
              >
                <button
                  style={{
                    display: 'block',
                    padding: '10px 20px',
                    border: 'none',
                    backgroundColor: 'white',
                    textAlign: 'left',
                    cursor: 'pointer',
                    width: '100%',
                    color: 'black',
                  }}
                  onClick={handleNavigateToChat}
                >
                  AI Assistant Chat
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Welcome Message */}
        <p style={{ color: 'black', paddingLeft: '16px' }}>Welcome back, {userData.firstName || 'User'}!</p>

        {/* Chart */}
        <div style={{ height: '300px', marginBottom: '30px', marginRight: '20px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="calories" stroke="#B00020" />
              <Line type="monotone" dataKey="duration" stroke="#0000FF" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Metrics */}
        <div style={{ marginBottom: '30px', color: 'black', textAlign: 'left', paddingLeft: '20px' }}>
          <div
            style={{
              marginBottom: '45px',
              marginRight: '20px',
              paddingLeft: '10px',
              border: 'solid lightgrey 2px',
              borderRadius: '5px',
            }}
          >
            <h4>Recent Achievement</h4>
            <p style={{ marginTop: '-15px', paddingLeft: '7px' }}>Week Warrior</p>
            <p style={{ marginTop: '-15px', paddingLeft: '7px' }}>Completed all planned workouts</p>
          </div>
          <div
            style={{
              border: 'solid lightgrey 2px',
              borderRadius: '5px',
              marginRight: '20px',
              paddingLeft: '10px',
            }}
          >
            <h4>Current Streak</h4>
            <p style={{ marginTop: '-15px', paddingLeft: '7px' }}>
              <b>7</b> Consecutive days
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button
            style={{
              padding: '15px',
              backgroundColor: '#B00020',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            + Log Workout
          </button>
          <button
            style={{
              padding: '15px',
              backgroundColor: '#B00020',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            + Track Meal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
