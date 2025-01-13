import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/signup';
import UserGoal from './pages/UserGoal';
import FitnessLevel from './pages/FitnessLevel';
import PhysicalInformation from './pages/PhysicalInformation';
import ScheduleYourSuccess from './pages/ScheduleYourSuccess';
import EquipmentPreferences from './pages/EquipmentPreferences';
import PlanReady from './pages/PlanReady';
import Dashboard from './pages/Dashboard';
import AIAssistantChat from './pages/AiAssistantChat'


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/user-goal" element={<UserGoal />} />
        <Route path="/fitness-level" element={<FitnessLevel />} />
        <Route path="/physical-information" element={<PhysicalInformation />} />
        <Route path="/schedule-your-success" element={<ScheduleYourSuccess />} />
        <Route path="/equipment-preferences" element={<EquipmentPreferences />} />
        <Route path="/plan-ready" element={<PlanReady />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-assistant-chat" element={<AIAssistantChat />} />
      </Routes>
    </Router>
  );
};

export default App;
