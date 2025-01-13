import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../state/UserContext';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorageUtils';

const ScheduleYourSuccess: React.FC = () => {
  const { userData, setUserData } = useUserContext();
  const navigate = useNavigate();

  const frequencies = [
    { id: '2-3', label: '2-3 Times per week', description: 'Great for beginners with busy schedules' },
    { id: '3-4', label: '3-4 Times per week', description: 'Balanced frequency for consistent progress' },
    { id: '4-5', label: '4-5 Times per week', description: 'Ideal for intermediate fitness goals' },
    { id: '5+', label: '5+ Times per week', description: 'Advanced training frequency' },
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const timesOfDay = [
    { id: 'early-morning', label: 'Early morning', description: '3AM - 6AM' },
    { id: 'morning', label: 'Morning', description: '6AM - 9AM' },
    { id: 'afternoon', label: 'Afternoon', description: '12PM - 3PM' },
    { id: 'evening', label: 'Evening', description: '6PM - 9PM' },
    { id: 'night', label: 'Night', description: '9PM - 12AM' },
  ];

  const durations = [
    { id: '30', label: '30 Minutes', description: 'Quick effective workouts' },
    { id: '45', label: '45 Minutes', description: 'Balanced workout length' },
    { id: '60', label: '60 Minutes', description: 'Comprehensive sessions' },
    { id: '60+', label: '60+ Minutes', description: 'Extended training sessions' },
  ];

  // Sync global state with localStorage on component mount
  useEffect(() => {
    setUserData((prev) => ({
      ...prev,
      frequency: prev.frequency || getFromLocalStorage('frequency'),
      days: prev.days || getFromLocalStorage('days') || [],
      timeOfDay: prev.timeOfDay || getFromLocalStorage('timeOfDay'),
      duration: prev.duration || getFromLocalStorage('duration'),
    }));
  }, [setUserData]);

  const handleFrequencySelect = (frequency: string) => {
    setUserData((prev) => ({ ...prev, frequency }));
    saveToLocalStorage('frequency', frequency);
  };

  const handleDayToggle = (day: string) => {
    const updatedDays = userData.days?.includes(day)
      ? userData.days.filter((d) => d !== day)
      : [...(userData.days || []), day];

    setUserData((prev) => ({ ...prev, days: updatedDays }));
    saveToLocalStorage('days', updatedDays);
  };

  const handleTimeOfDaySelect = (time: string) => {
    setUserData((prev) => ({ ...prev, timeOfDay: time }));
    saveToLocalStorage('timeOfDay', time);
  };

  const handleDurationSelect = (duration: string) => {
    setUserData((prev) => ({ ...prev, duration }));
    saveToLocalStorage('duration', duration);
  };

  const handleContinue = () => {
    console.log('Schedule Submitted:', userData);
    if (
      userData.frequency &&
      userData.days?.length &&
      userData.timeOfDay &&
      userData.duration
    ) {
      navigate('/equipment-preferences');
    } else {
      alert('Please complete all required fields before continuing.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', paddingTop: '20px', fontFamily: 'Raleway, sans-serif', paddingLeft: '700px' }}>
      {/* Page Title */}
      <div style={{ backgroundColor: '#B00020', borderBottom: '30px solid #B00020' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '10px', color: 'white' }}>Schedule Your Success</h2>
        <p style={{ textAlign: 'center', color: 'lightgrey', fontSize: '1rem', marginBottom: '30px' }}>
          Let’s find the perfect time for your workouts
        </p>
      </div>
      <div style={{ backgroundColor: 'white', borderTop: '30px solid white' }}>
        {/* Workout Frequency */}
        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'black', marginLeft: '15px' }}>How often would you like to workout?</h3>
        {frequencies.map((freq) => (
          <div
            key={freq.id}
            onClick={() => handleFrequencySelect(freq.id)}
            style={{
              padding: '15px',
              marginBottom: '10px',
              border: `2px solid ${userData.frequency === freq.id ? '#B00020' : '#ddd'}`,
              borderRadius: '10px',
              cursor: 'pointer',
              backgroundColor: userData.frequency === freq.id ? '#fdecea' : '#fff',
            }}
          >
            <h4 style={{ margin: '0 0 5px 0', color: userData.frequency === freq.id ? '#B00020' : '#000' }}>
              {freq.label}
            </h4>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{freq.description}</p>
          </div>
        ))}

        {/* Days Selection */}
        <h3 style={{ fontSize: '1.2rem', margin: '30px 0 15px', color: 'black', marginLeft: '15px' }}>Which days work best for you?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', marginBottom: '30px' }}>
          {days.map((day) => (
            <div
              key={day}
              onClick={() => handleDayToggle(day)}
              style={{
                padding: '10px',
                textAlign: 'center',
                border: `2px solid ${userData.days?.includes(day) ? '#B00020' : '#ddd'}`,
                borderRadius: '5px',
                cursor: 'pointer',
                backgroundColor: userData.days?.includes(day) ? '#fdecea' : '#fff',
                color: userData.days?.includes(day) ? '#B00020' : '#000',
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Time of Day Selection */}
        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'black', marginLeft: '15px' }}>What time of day works best for you?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '30px' }}>
          {timesOfDay.map((time) => (
            <div
              key={time.id}
              onClick={() => handleTimeOfDaySelect(time.id)}
              style={{
                padding: '15px',
                textAlign: 'center',
                border: `2px solid ${userData.timeOfDay === time.id ? '#B00020' : '#ddd'}`,
                borderRadius: '10px',
                cursor: 'pointer',
                backgroundColor: userData.timeOfDay === time.id ? '#fdecea' : '#fff',
              }}
            >
              <h4 style={{ margin: '0 0 5px 0', color: userData.timeOfDay === time.id ? '#B00020' : '#000' }}>
                {time.label}
              </h4>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{time.description}</p>
            </div>
          ))}
        </div>

        {/* Workout Duration */}
        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'black', marginLeft: '15px' }}>How long can you workout?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '30px' }}>
          {durations.map((duration) => (
            <div
              key={duration.id}
              onClick={() => handleDurationSelect(duration.id)}
              style={{
                padding: '15px',
                textAlign: 'center',
                border: `2px solid ${userData.duration === duration.id ? '#B00020' : '#ddd'}`,
                borderRadius: '10px',
                cursor: 'pointer',
                backgroundColor: userData.duration === duration.id ? '#fdecea' : '#fff',
              }}
            >
              <h4 style={{ margin: '0 0 5px 0', color: userData.duration === duration.id ? '#B00020' : '#000' }}>
                {duration.label}
              </h4>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{duration.description}</p>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!userData.frequency || !userData.days?.length || !userData.timeOfDay || !userData.duration}
          style={{
            display: 'block',
            width: '60%',
            padding: '15px',
            backgroundColor: userData.frequency && userData.days?.length && userData.timeOfDay && userData.duration ? '#B00020' : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: userData.frequency && userData.days?.length && userData.timeOfDay && userData.duration ? 'pointer' : 'not-allowed',
            marginTop: '20px',
            fontSize: '1rem',
            marginLeft: '140px',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ScheduleYourSuccess;
