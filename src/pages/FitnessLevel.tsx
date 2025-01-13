import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../state/UserContext';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorageUtils'; // Import utilities

const FitnessLevel: React.FC = () => {
  const { userData, setUserData } = useUserContext();
  const navigate = useNavigate();

  // Initialize local states with values from global state or localStorage
  const [selectedLevel, setSelectedLevel] = useState<string | null>(
    userData.fitnessLevel || getFromLocalStorage('fitnessLevel') || null
  );
  const [selectedActivities, setSelectedActivities] = useState<string[]>(
    userData.activities || getFromLocalStorage('activities') || []
  );

  const fitnessLevels = [
    {
      id: 'beginner',
      label: 'Beginner',
      description: [
        'New to fitness or returning after a long break',
        'Little to no exercise experience',
        'Focus on learning proper form',
        'Building basic strength and endurance',
      ],
    },
    {
      id: 'intermediate',
      label: 'Intermediate',
      description: [
        'Regular exercise for 6+ months',
        'Familiar with basic exercise',
        'Can complete 30-60 minute workouts',
        'Ready for progressive overload',
      ],
    },
    {
      id: 'advanced',
      label: 'Advanced',
      description: [
        'Consistent training for 1+ years',
        'Strong exercise foundation',
        'Experienced with various workout styles',
        'Looking for new challenges',
      ],
    },
  ];

  const activities = ['Weight Training', 'Cardio/Running', 'Sports', 'Yoga/Flexibility'];

  // Update global state and localStorage whenever selected level changes
  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    setUserData((prev) => ({ ...prev, fitnessLevel: level }));
    saveToLocalStorage('fitnessLevel', level);
  };

  // Update global state and localStorage whenever selected activities change
  const handleActivityToggle = (activity: string) => {
    const updatedActivities = selectedActivities.includes(activity)
      ? selectedActivities.filter((item) => item !== activity)
      : [...selectedActivities, activity];

    setSelectedActivities(updatedActivities);
    setUserData((prev) => ({ ...prev, activities: updatedActivities }));
    saveToLocalStorage('activities', updatedActivities);
  };

  const handleContinue = () => {
    if (selectedLevel) {
      navigate('/physical-information');
    } else {
      alert('Please select a fitness level before continuing.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', paddingTop: '20px', fontFamily: 'Arial, sans-serif', paddingLeft: '700px' }}>
      {/* Page Title */}
      <div style={{ backgroundColor: '#B00020', borderBottom: '30px solid #B00020' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Your Fitness Experience</h2>
        <p style={{ textAlign: 'center', color: 'lightgrey', marginBottom: '30px' }}>
          Help us understand your fitness background
        </p>
      </div>

      {/* Fitness Level Options */}
      <div style={{ backgroundColor: 'white' }}>
        <div>
          {fitnessLevels.map((level) => (
            <div
              key={level.id}
              onClick={() => handleLevelSelect(level.id)}
              style={{
                padding: '20px',
                marginBottom: '15px',
                border: `2px solid ${selectedLevel === level.id ? '#B00020' : '#ddd'}`,
                borderRadius: '10px',
                cursor: 'pointer',
                backgroundColor: selectedLevel === level.id ? '#fdecea' : '#fff',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div style={{ marginRight: '20px', fontSize: '1.5rem' }}>👤</div>
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#B00020' }}>{level.label}</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#666', fontSize: '0.9rem' }}>
                  {level.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Familiar Activities */}
        <h3 style={{ textAlign: 'center', marginTop: '30px', color: 'black', marginLeft: '15px' }}>What activities are you familiar with?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          {activities.map((activity) => (
            <div
              key={activity}
              onClick={() => handleActivityToggle(activity)}
              style={{
                padding: '15px',
                textAlign: 'center',
                border: `2px solid ${selectedActivities.includes(activity) ? '#B00020' : '#ddd'}`,
                borderRadius: '10px',
                cursor: 'pointer',
                backgroundColor: selectedActivities.includes(activity) ? '#fdecea' : '#fff',
                color: selectedActivities.includes(activity) ? '#B00020' : '#000',
              }}
            >
              {activity}
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '0.9rem' }}>
          Your selection helps us create a personalized program that matches your experience level.
        </p>
        <button
          onClick={handleContinue}
          disabled={!selectedLevel}
          style={{
            display: 'block',
            width: '60%',
            padding: '15px',
            backgroundColor: selectedLevel ? '#B00020' : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: selectedLevel ? 'pointer' : 'not-allowed',
            marginTop: '20px',
            marginLeft: '120px',
            fontSize: '1rem',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default FitnessLevel;
