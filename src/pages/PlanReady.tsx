import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../state/UserContext';
import { getFromLocalStorage } from '../utils/localStorageUtils';

const PlanReady: React.FC = () => {
  const { userData, setUserData } = useUserContext();
  const navigate = useNavigate();

  // Pre-fill data from localStorage if not already in global state
  useEffect(() => {
    setUserData((prev) => ({
      ...prev,
      goal: prev.goal || getFromLocalStorage('goal'),
      fitnessLevel: prev.fitnessLevel || getFromLocalStorage('fitnessLevel'),
      frequency: prev.frequency || getFromLocalStorage('frequency'),
      days: prev.days || getFromLocalStorage('days') || [],
    }));
  }, [setUserData]);

  const handleNavigateToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', paddingTop: '20px', fontFamily: 'Raleway, sans-serif', paddingLeft: '700px' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ backgroundColor: '#B00020', padding: '20px', borderRadius: '5px' }}>
            <h2 style={{ color: 'white', marginBottom: '10px' }}>Your Plan is Ready!</h2>
            <p style={{ color: 'white', fontSize: '1rem' }}>
              We have created a personalized fitness program based on your goals and preferences.
            </p>
          </div>
        </div>

        {/* Program Overview */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', textAlign: 'center' }}>Your Program Overview</h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0', color: '#B00020' }}>Primary Goal</h4>
              <p style={{ margin: '5px 0', color: 'lightgrey' }}>{userData.goal || 'Not specified'}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0', color: '#B00020' }}>Fitness Level</h4>
              <p style={{ margin: '5px 0', color: 'lightgrey' }}>{userData.fitnessLevel || 'Not specified'}</p>
            </div>
          </div>

          {/* Weekly Schedule */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '10px', color: 'black' }}>Weekly Schedule</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                <div
                  key={index}
                  style={{
                    padding: '10px',
                    textAlign: 'center',
                    backgroundColor: index === 3 || index === 6 ? '#B00020' : '#ddd',
                    color: index === 3 || index === 6 ? 'white' : 'black',
                    borderRadius: '5px',
                  }}
                >
                  {day}
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: '10px', color: 'black' }}>
              {userData.frequency || '4'} workouts per week
            </p>
          </div>

          {/* What to Expect */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '10px' }}>What to Expect</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', color: 'black' }}>
              <div style={infoBoxStyle}>AI-Powered Guidance</div>
              <div style={infoBoxStyle}>Progressive Overload</div>
              <div style={infoBoxStyle}>Balanced Recovery</div>
            </div>
          </div>

          {/* First Workout */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '10px', color: 'black' }}>Your First Workout</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              <div style={workoutBoxStyle}>
                <h5 style={{ marginBottom: '5px', color: 'black' }}>Upper Body Strength</h5>
                <p style={{ fontSize: '0.9rem', color: 'black' }}>45 minutes</p>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: 'black' }}>
                  <li>Bench Press</li>
                  <li>Pull-ups</li>
                  <li>Shoulder Press</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <button
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#B00020',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
            onClick={handleNavigateToDashboard}
          >
            Start Your Journey →
          </button>
        </div>

        {/* Footer */}
        <p style={{ marginTop: '20px', textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
          Your AI Coach is Ready. Get a tailored plan and workouts as you proceed with your fitness goals.
        </p>
      </div>
    </div>
  );
};

const infoBoxStyle: React.CSSProperties = {
  padding: '10px',
  backgroundColor: '#f9f9f9',
  border: '1px solid #ddd',
  borderRadius: '5px',
  textAlign: 'center',
};

const workoutBoxStyle: React.CSSProperties = {
  padding: '15px',
  backgroundColor: '#f9f9f9',
  border: '1px solid #ddd',
  borderRadius: '5px',
};

export default PlanReady;
