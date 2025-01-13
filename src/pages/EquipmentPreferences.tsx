import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../state/UserContext';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorageUtils';

const EquipmentPreferences: React.FC = () => {
  const { userData, setUserData } = useUserContext();
  const navigate = useNavigate();

  const workoutLocations = [
    { id: 'home', label: 'Home Workouts', description: 'Exercise in the comfort of your home' },
    { id: 'gym', label: 'Gym Access', description: 'Full gym equipment available' },
    { id: 'hybrid', label: 'Hybrid Approach', description: 'Mix of home and gym workouts' },
  ];

  const equipmentOptions = [
    'No Equipment',
    'Resistance Bands',
    'Pull-up Bar',
    'Foam Roller',
    'Dumbbells',
    'Workout Bench',
    'KettleBells',
    'Yoga Mat',
  ];

  const workoutStyles = [
    'High-Intensity Intervals',
    'Strength Training',
    'Circuit Training',
    'Supersets',
    'Traditional Sets',
    'Time Based Workouts',
    'Progressive Overload',
    'Drop Sets',
  ];

  // Sync global state with localStorage on component mount
  useEffect(() => {
    setUserData((prev) => ({
      ...prev,
      workoutLocation: prev.workoutLocation || getFromLocalStorage('workoutLocation'),
      equipment: prev.equipment || getFromLocalStorage('equipment') || [],
      workoutStyles: prev.workoutStyles || getFromLocalStorage('workoutStyles') || [],
      aiGuidance: prev.aiGuidance || getFromLocalStorage('aiGuidance'),
    }));
  }, [setUserData]);

  const handleLocationSelect = (location: string) => {
    setUserData((prev) => ({ ...prev, workoutLocation: location }));
    saveToLocalStorage('workoutLocation', location);
  };

  const handleEquipmentToggle = (equipment: string) => {
    const updatedEquipment = userData.equipment?.includes(equipment)
      ? userData.equipment.filter((item) => item !== equipment)
      : [...(userData.equipment || []), equipment];

    setUserData((prev) => ({ ...prev, equipment: updatedEquipment }));
    saveToLocalStorage('equipment', updatedEquipment);
  };

  const handleStyleToggle = (style: string) => {
    const updatedStyles = userData.workoutStyles?.includes(style)
      ? userData.workoutStyles.filter((item) => item !== style)
      : [...(userData.workoutStyles || []), style];

    setUserData((prev) => ({ ...prev, workoutStyles: updatedStyles }));
    saveToLocalStorage('workoutStyles', updatedStyles);
  };

  const handleAiGuidanceToggle = () => {
    const updatedAiGuidance = !userData.aiGuidance;
    setUserData((prev) => ({ ...prev, aiGuidance: updatedAiGuidance }));
    saveToLocalStorage('aiGuidance', updatedAiGuidance);
  };

  const handleCompleteSetup = () => {
    console.log('Equipment Preferences Submitted:', userData);
    if (
      userData.workoutLocation &&
      userData.equipment?.length > 0 &&
      userData.workoutStyles?.length > 0
    ) {
      navigate('/plan-ready');
    } else {
      alert('Please complete all fields before finishing.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', paddingTop: '20px', fontFamily: 'Raleway, sans-serif', paddingLeft: '700px' }}>
      {/* Page Title */}
      <div style={{ backgroundColor: '#B00020', borderBottom: '30px solid #B00020' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '10px', color: 'white' }}>Customize Your Experience</h2>
        <p style={{ textAlign: 'center', fontSize: '1rem', marginBottom: '30px', color: 'lightgrey' }}>
          Let’s tailor your workouts to your preferences
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderTop: '20px solid white' }}>
        {/* Workout Location */}
        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'black', marginLeft: '15px' }}>Where will you work out?</h3>
        {workoutLocations.map((location) => (
          <div
            key={location.id}
            onClick={() => handleLocationSelect(location.id)}
            style={{
              padding: '15px',
              marginBottom: '10px',
              border: `2px solid ${userData.workoutLocation === location.id ? '#B00020' : '#ddd'}`,
              borderRadius: '10px',
              cursor: 'pointer',
              backgroundColor: userData.workoutLocation === location.id ? '#fdecea' : '#fff',
            }}
          >
            <h4 style={{ margin: '0 0 5px 0', color: userData.workoutLocation === location.id ? '#B00020' : '#000' }}>
              {location.label}
            </h4>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{location.description}</p>
          </div>
        ))}

        {/* Available Equipment */}
        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'black', marginLeft: '15px' }}>Available Equipment</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '30px' }}>
          {equipmentOptions.map((equipment) => (
            <div
              key={equipment}
              onClick={() => handleEquipmentToggle(equipment)}
              style={{
                padding: '10px 15px',
                border: `2px solid ${userData.equipment?.includes(equipment) ? '#B00020' : '#ddd'}`,
                borderRadius: '10px',
                cursor: 'pointer',
                backgroundColor: userData.equipment?.includes(equipment) ? '#fdecea' : '#fff',
                textAlign: 'center',
              }}
            >
              {equipment}
            </div>
          ))}
        </div>

        {/* Workout Style Preferences */}
        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'black', marginLeft: '15px' }}>Workout Style Preferences</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '30px' }}>
          {workoutStyles.map((style) => (
            <div
              key={style}
              onClick={() => handleStyleToggle(style)}
              style={{
                padding: '10px 15px',
                border: `2px solid ${userData.workoutStyles?.includes(style) ? '#B00020' : '#ddd'}`,
                borderRadius: '10px',
                cursor: 'pointer',
                backgroundColor: userData.workoutStyles?.includes(style) ? '#fdecea' : '#fff',
                textAlign: 'center',
              }}
            >
              {style}
            </div>
          ))}
        </div>

        {/* AI Guidance */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <label style={{ marginRight: '10px', fontSize: '1rem', color: 'black', marginLeft: '20px' }}>AI Form Guidance</label>
          <input
            type="checkbox"
            checked={userData.aiGuidance || false}
            onChange={handleAiGuidanceToggle}
            style={{ transform: 'scale(1.5)' }}
          />
        </div>

        {/* Complete Setup Button */}
        <button
          onClick={handleCompleteSetup}
          disabled={
            !userData.workoutLocation ||
            !(userData.equipment?.length > 0) ||
            !(userData.workoutStyles?.length > 0)
          }
          style={{
            display: 'block',
            width: '100%',
            padding: '15px',
            backgroundColor: userData.workoutLocation && userData.equipment?.length && userData.workoutStyles?.length ? '#B00020' : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: userData.workoutLocation && userData.equipment?.length && userData.workoutStyles?.length ? 'pointer' : 'not-allowed',
            marginTop: '20px',
            fontSize: '1rem',
          }}
        >
          Complete Setup →
        </button>
      </div>
    </div>
  );
};

export default EquipmentPreferences;
