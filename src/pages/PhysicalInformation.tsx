import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../state/UserContext';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorageUtils';

const PhysicalInformation: React.FC = () => {
  const { userData, setUserData } = useUserContext();
  const navigate = useNavigate();

  // Pre-fill global state with data from localStorage if not already set
  useEffect(() => {
    setUserData((prev) => ({
      ...prev,
      height: prev.height || getFromLocalStorage('height'),
      weight: prev.weight || getFromLocalStorage('weight'),
      age: prev.age || getFromLocalStorage('age'),
      gender: prev.gender || getFromLocalStorage('gender'),
      activityLevel: prev.activityLevel || getFromLocalStorage('activityLevel'),
      healthConditions: prev.healthConditions || getFromLocalStorage('healthConditions') || [],
    }));
  }, [setUserData]);

  const activityLevels = [
    { id: 'sedentary', label: 'Sedentary', description: 'Little to no Exercise' },
    { id: 'lightly-active', label: 'Lightly Active', description: '1-3 Days a week Exercise' },
    { id: 'moderately-active', label: 'Moderately Active', description: '3-5 Days a week Exercise' },
    { id: 'very-active', label: 'Very Active', description: '5-7 Days a week Exercise' },
  ];

  const healthConditions = [
    'High Blood Pressure',
    'Back Pain/Injury',
    'Joint Issues',
    'Heart Condition',
    'Asthma',
    'Diabetes',
    'None of the above',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    saveToLocalStorage(name, value);
  };

  const handleGenderSelect = (gender: string) => {
    setUserData((prev) => ({ ...prev, gender }));
    saveToLocalStorage('gender', gender);
  };

  const handleActivitySelect = (level: string) => {
    setUserData((prev) => ({ ...prev, activityLevel: level }));
    saveToLocalStorage('activityLevel', level);
  };

  const handleHealthToggle = (condition: string) => {
    const updatedHealthConditions = userData.healthConditions.includes(condition)
      ? userData.healthConditions.filter((item) => item !== condition)
      : [...userData.healthConditions, condition];

    setUserData((prev) => ({ ...prev, healthConditions: updatedHealthConditions }));
    saveToLocalStorage('healthConditions', updatedHealthConditions);
  };

  const handleContinue = () => {
    console.log('Physical Information Submitted:', userData);
    if (
      userData.height &&
      userData.weight &&
      userData.age &&
      userData.gender &&
      userData.activityLevel
    ) {
      navigate('/schedule-your-success');
    } else {
      alert('Please complete all required fields before continuing.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', paddingTop: '10px', fontFamily: 'Arial, sans-serif', paddingLeft: '700px' }}>
      <div style={{ backgroundColor: '#B00020', borderBottom: '30px solid #B00020' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px', color: 'white' }}>Physical Information</h2>
        <p style={{ textAlign: 'center', color: 'lightgrey', marginBottom: '30px' }}>
          Help us customize your fitness plan
        </p>
      </div>

      <div style={{ backgroundColor: 'white' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <input
            type="text"
            name="height"
            placeholder="Height (in cm)"
            value={userData.height || ''}
            onChange={handleInputChange}
            style={{ ...inputStyle, width: '90%', marginLeft: '20px', textAlign: 'center', marginTop: '10px' }}
          />
          <input
            type="text"
            name="weight"
            placeholder="Weight (in lbs)"
            value={userData.weight || ''}
            onChange={handleInputChange}
            style={{ ...inputStyle, width: '90%', textAlign: 'center', marginTop: '10px' }}
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={userData.age || ''}
            onChange={handleInputChange}
            style={{ ...inputStyle, width: '90%', marginLeft: '20px', textAlign: 'center' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              type="button"
              onClick={() => handleGenderSelect('Male')}
              style={{
                ...buttonStyle,
                backgroundColor: userData.gender === 'Male' ? '#B00020' : '#f5f5f5',
                color: userData.gender === 'Male' ? '#fff' : '#000',
              }}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => handleGenderSelect('Female')}
              style={{
                ...buttonStyle,
                backgroundColor: userData.gender === 'Female' ? '#B00020' : '#f5f5f5',
                color: userData.gender === 'Female' ? '#fff' : '#000',
              }}
            >
              Female
            </button>
          </div>
        </div>

        <h3 style={{ marginBottom: '20px', color: 'black', textAlign: 'left', marginLeft: '10px' }}>Daily Activity Level</h3>
        {activityLevels.map((level) => (
          <div
            key={level.id}
            onClick={() => handleActivitySelect(level.id)}
            style={{
              padding: '15px',
              marginBottom: '10px',
              border: `2px solid ${userData.activityLevel === level.id ? '#B00020' : '#ddd'}`,
              textAlign: 'center',
              borderRadius: '10px',
              cursor: 'pointer',
              backgroundColor: userData.activityLevel === level.id ? '#fdecea' : '#fff',
            }}
          >
            <h4 style={{ margin: '0 0 5px 0', color: userData.activityLevel === level.id ? '#B00020' : '#000' }}>
              {level.label}
            </h4>
            <p style={{ margin: 0, color: '#666' }}>{level.description}</p>
          </div>
        ))}

        <h3 style={{ margin: '30px 0 20px', color: 'black', textAlign: 'left', marginLeft: '10px' }}>Health Considerations</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          {healthConditions.map((condition) => (
            <div
              key={condition}
              onClick={() => handleHealthToggle(condition)}
              style={{
                padding: '10px 15px',
                border: `2px solid ${userData.healthConditions.includes(condition) ? '#B00020' : '#ddd'}`,
                borderRadius: '10px',
                cursor: 'pointer',
                backgroundColor: userData.healthConditions.includes(condition) ? '#fdecea' : '#fff',
                color: userData.healthConditions.includes(condition) ? '#B00020' : '#000',
                textAlign: 'center',
              }}
            >
              {condition}
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          style={{
            display: 'block',
            width: '60%',
            padding: '15px',
            backgroundColor: userData.height && userData.weight && userData.age && userData.gender && userData.activityLevel ? '#B00020' : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: userData.height && userData.weight && userData.age && userData.gender && userData.activityLevel ? 'pointer' : 'not-allowed',
            marginTop: '20px',
            marginLeft: '140px',
            fontSize: '1rem',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// Styles
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  fontSize: '1rem',
};

const buttonStyle: React.CSSProperties = {
  flex: 1,
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '10px',
  fontSize: '1rem',
  cursor: 'pointer',
  textAlign: 'center',
};

export default PhysicalInformation;

