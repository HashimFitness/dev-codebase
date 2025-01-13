import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../state/UserContext'; // Import UserContext for global state
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorageUtils'; // Import localStorage utilities

const UserGoal: React.FC = () => {
  const { setUserData, userData } = useUserContext(); // Access global state and its updater
  const navigate = useNavigate();

  // Initialize selectedGoal with data from global state or localStorage
  const [selectedGoal, setSelectedGoal] = useState<string | null>(
    userData.goal || getFromLocalStorage('userGoal') || null
  );

  const goals = [
    { id: 'lose-weight', title: 'Lose Weight', description: 'Burn fat and maintain muscle mass', icon: '🎯' },
    { id: 'build-muscle', title: 'Build Muscle', description: 'Increase strength and muscle size', icon: '🏋️' },
    { id: 'improve-fitness', title: 'Improve Fitness', description: 'Enhance overall health and endurance', icon: '❤️' },
    { id: 'athletic-performance', title: 'Athletic Performance', description: 'Train for specific sports or events', icon: '📈' },
  ];

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  const handleContinue = () => {
    if (selectedGoal) {
      // Update global state
      setUserData((prev) => ({
        ...prev,
        goal: selectedGoal,
      }));

      // Save to localStorage
      saveToLocalStorage('userGoal', selectedGoal);

      // Navigate to the next step
      navigate('/fitness-level');
    } else {
      alert('Please select a goal before continuing.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', paddingTop: '20px', paddingLeft: '700px' }}>
      <div style={{ backgroundColor: 'white' }}>
        {/* Progress Bar */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Step 1 of 5</span>
          </div>
          <div style={{ height: '8px', backgroundColor: '#eee', borderRadius: '4px' }}>
            <div style={{ width: '20%', height: '100%', backgroundColor: '#B00020', borderRadius: '4px' }}></div>
          </div>
        </div>

        {/* Main Title */}
        <h1 style={{ textAlign: 'center', marginBottom: '10px', color: 'black' }}>What’s your main goal?</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
          This helps us create your personalized plan.
        </p>

        {/* Goal Options */}
        <div>
          {goals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => handleGoalSelect(goal.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px',
                marginBottom: '10px',
                border: `1px solid ${selectedGoal === goal.id ? '#B00020' : '#ddd'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: selectedGoal === goal.id ? '#fbe9e7' : '#fff',
                color: selectedGoal === goal.id ? 'black' : 'black',
                fontFamily: 'roboto',
                fontSize: '90%',
                fontWeight: 'bold',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '1.3rem', marginRight: '10px' }}>{goal.icon}</span>
                <div>
                  <h4 style={{ margin: 0 }}>{goal.title}</h4>
                  <p style={{ margin: 0, color: '#666' }}>{goal.description}</p>
                </div>
              </div>
              <input
                type="radio"
                name="goal"
                checked={selectedGoal === goal.id}
                onChange={() => handleGoalSelect(goal.id)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedGoal}
          style={{
            display: 'block',
            width: '60%',
            padding: '10px',
            backgroundColor: selectedGoal ? '#B00020' : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: selectedGoal ? 'pointer' : 'not-allowed',
            marginTop: '20px',
            marginLeft: '110px',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default UserGoal;

